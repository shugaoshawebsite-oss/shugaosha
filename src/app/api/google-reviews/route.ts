import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// The Shugaosha Google Place ID (verified via Places API findplacefromtext)
const PLACE_ID = 'ChIJn5vTzKetEmsRMq2LXVYY48U'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export interface GoogleReview {
  author_name: string
  author_url: string
  profile_photo_url: string
  rating: number
  text: string
  time: number
  relative_time_description: string
}

export interface GooglePlaceData {
  rating: number
  user_ratings_total: number
  reviews: GoogleReview[]
  cachedAt: string
}

// ─── GitHub helpers (mirrors the pattern in /api/cms/[type]/route.ts) ─────────

async function readCacheFromGitHub(): Promise<GooglePlaceData | null> {
  const repo = process.env.GITHUB_CONTENT_REPO
  const branch = process.env.GITHUB_CONTENT_BRANCH || 'main'
  const token = process.env.GITHUB_TOKEN

  if (!repo) return null

  const url = `https://raw.githubusercontent.com/${repo}/${branch}/content/googleReviews.json`
  try {
    const headers: Record<string, string> = {}
    if (token) headers['Authorization'] = `token ${token}`
    const res = await fetch(url, { headers, cache: 'no-store' })
    if (res.ok) return await res.json()
  } catch (_) { /* fall through */ }
  return null
}

async function writeCacheToGitHub(data: GooglePlaceData): Promise<void> {
  const repo = process.env.GITHUB_CONTENT_REPO
  const branch = process.env.GITHUB_CONTENT_BRANCH || 'main'
  const token = process.env.GITHUB_TOKEN
  if (!repo || !token) return

  const filePath = `content/googleReviews.json`
  const getUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${branch}`
  let sha = ''

  try {
    const res = await fetch(getUrl, {
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
      cache: 'no-store',
    })
    if (res.ok) {
      const json = await res.json()
      sha = json.sha
    }
  } catch (_) { /* ignore */ }

  const putUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`
  const body = {
    message: 'cms: refresh google reviews cache',
    content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
    branch,
    ...(sha ? { sha } : {}),
  }

  await fetch(putUrl, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

async function readCacheFromLocal(): Promise<GooglePlaceData | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'googleReviews.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as GooglePlaceData
  } catch (_) {
    return null
  }
}

async function writeCacheToLocal(data: GooglePlaceData): Promise<void> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'googleReviews.json')
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write local googleReviews cache:', err)
  }
}

// ─── Fetch fresh data from Google Places API (New) ────────────────────────────

async function fetchFromGooglePlaces(): Promise<GooglePlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    console.error('GOOGLE_PLACES_API_KEY is not set')
    return null
  }

  // Google Places API (New) — Place Details endpoint
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&reviews_sort=newest&key=${apiKey}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      console.error('Google Places API error:', res.status, res.statusText)
      return null
    }

    const json = await res.json()

    if (json.status !== 'OK') {
      console.error('Google Places API status:', json.status, json.error_message)
      return null
    }

    const result = json.result
    return {
      rating: result.rating ?? 5.0,
      user_ratings_total: result.user_ratings_total ?? 0,
      reviews: (result.reviews ?? []) as GoogleReview[],
      cachedAt: new Date().toISOString(),
    }
  } catch (err) {
    console.error('Failed to fetch from Google Places API:', err)
    return null
  }
}

// ─── Cache read/write helpers ─────────────────────────────────────────────────

async function readCache(): Promise<GooglePlaceData | null> {
  if (process.env.GITHUB_CONTENT_REPO) {
    return readCacheFromGitHub()
  }
  return readCacheFromLocal()
}

async function writeCache(data: GooglePlaceData): Promise<void> {
  if (process.env.GITHUB_CONTENT_REPO && process.env.GITHUB_TOKEN) {
    await writeCacheToGitHub(data)
  } else {
    await writeCacheToLocal(data)
  }
}

function isCacheStale(cachedAt: string): boolean {
  const age = Date.now() - new Date(cachedAt).getTime()
  return age > CACHE_TTL_MS
}

// ─── Route handlers ───────────────────────────────────────────────────────────

/**
 * GET /api/google-reviews
 * Returns cached reviews, refreshing from Google Places API if cache is stale (> 24h).
 */
export async function GET() {
  try {
    let cached = await readCache()

    const stale = !cached || !cached.cachedAt || isCacheStale(cached.cachedAt)

    if (stale) {
      const fresh = await fetchFromGooglePlaces()
      if (fresh) {
        // Merge fresh reviews with existing cached reviews to accumulate them without losing past ones
        const existingReviews = cached?.reviews || []
        const mergedMap = new Map<string, GoogleReview>()

        existingReviews.forEach(r => {
          const key = `${r.author_name}-${r.time || r.text.slice(0, 20)}`
          mergedMap.set(key, r)
        })
        fresh.reviews.forEach(r => {
          const key = `${r.author_name}-${r.time || r.text.slice(0, 20)}`
          mergedMap.set(key, r)
        })

        const mergedReviews = Array.from(mergedMap.values())
          .filter(r => r.text && r.text.trim().length > 0)
          .sort((a, b) => (b.time || 0) - (a.time || 0))

        const mergedData: GooglePlaceData = {
          rating: fresh.rating,
          user_ratings_total: fresh.user_ratings_total,
          reviews: mergedReviews,
          cachedAt: fresh.cachedAt,
        }

        await writeCache(mergedData)
        return NextResponse.json(mergedData)
      }
      // Google API failed — return stale cache if available, else empty fallback
      if (cached) return NextResponse.json(cached)
      return NextResponse.json({
        rating: 5.0,
        user_ratings_total: 0,
        reviews: [],
        cachedAt: new Date().toISOString(),
      })
    }

    return NextResponse.json(cached)
  } catch (err) {
    console.error('GET /api/google-reviews error:', err)
    return NextResponse.json({ error: 'Failed to get reviews' }, { status: 500 })
  }
}
