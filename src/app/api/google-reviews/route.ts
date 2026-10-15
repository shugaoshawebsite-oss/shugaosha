import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

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

async function writeCacheToGitHub(data: GooglePlaceData): Promise<{ success: boolean; error?: string }> {
  const repo = process.env.GITHUB_CONTENT_REPO
  const branch = process.env.GITHUB_CONTENT_BRANCH || 'main'
  const token = process.env.GITHUB_TOKEN
  if (!repo || !token) {
    return { success: false, error: 'GITHUB_CONTENT_REPO or GITHUB_TOKEN is not configured' }
  }

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

  try {
    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!putRes.ok) {
      const errText = await putRes.text()
      console.error('Failed to commit reviews to GitHub:', errText)
      return { success: false, error: `GitHub API error: ${errText}` }
    }
    return { success: true }
  } catch (err: any) {
    console.error('Network error writing to GitHub:', err)
    return { success: false, error: err?.message || 'Network error writing to GitHub' }
  }
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

async function fetchFromGooglePlaces(): Promise<{ data: GooglePlaceData | null; error?: string }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    const msg = 'GOOGLE_PLACES_API_KEY environment variable is not set'
    console.error(msg)
    return { data: null, error: msg }
  }

  try {
    const languages = ['en', 'zh-TW', 'zh-HK', 'zh-CN', 'ja']
    const sorts = ['newest', 'most_relevant']
    const reviewMap = new Map<string, GoogleReview>()
    let latestRating = 5.0
    let latestTotal = 0

    for (const lang of languages) {
      for (const sort of sorts) {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&reviews_sort=${sort}&language=${lang}&key=${apiKey}`
        try {
          const res = await fetch(url, { cache: 'no-store' })
          if (!res.ok) continue
          const json = await res.json()
          if (json.status !== 'OK' || !json.result) continue

          const result = json.result
          if (typeof result.rating === 'number') latestRating = result.rating
          if (typeof result.user_ratings_total === 'number') {
            latestTotal = Math.max(latestTotal, result.user_ratings_total)
          }

          if (Array.isArray(result.reviews)) {
            for (const r of result.reviews) {
              const key = (r.author_name || '').toLowerCase().trim()
              if (key && r.text && r.text.trim()) {
                if (!reviewMap.has(key)) {
                  reviewMap.set(key, r as GoogleReview)
                } else {
                  const existing = reviewMap.get(key)!
                  if ((r.time || 0) > (existing.time || 0)) {
                    reviewMap.set(key, r as GoogleReview)
                  }
                }
              }
            }
          }
        } catch (_) {}
      }
    }

    if (latestTotal === 0 && reviewMap.size === 0) {
      return { data: null, error: 'Could not fetch data from Google Places' }
    }

    return {
      data: {
        rating: latestRating,
        user_ratings_total: latestTotal,
        reviews: Array.from(reviewMap.values()).sort((a, b) => (b.time || 0) - (a.time || 0)),
        cachedAt: new Date().toISOString(),
      },
    }
  } catch (err: any) {
    const msg = `Failed to fetch from Google Places API: ${err?.message || err}`
    console.error(msg)
    return { data: null, error: msg }
  }
}

// ─── Cache read/write helpers ─────────────────────────────────────────────────

async function readCache(): Promise<GooglePlaceData | null> {
  if (process.env.GITHUB_CONTENT_REPO) {
    return readCacheFromGitHub()
  }
  return readCacheFromLocal()
}

async function writeCache(data: GooglePlaceData): Promise<{ target: 'github' | 'local'; success: boolean; error?: string }> {
  if (process.env.GITHUB_CONTENT_REPO && process.env.GITHUB_TOKEN) {
    const res = await writeCacheToGitHub(data)
    return { target: 'github', ...res }
  } else {
    try {
      await writeCacheToLocal(data)
      return { target: 'local', success: true }
    } catch (err: any) {
      return { target: 'local', success: false, error: err?.message }
    }
  }
}

function isCacheStale(cachedAt: string): boolean {
  const age = Date.now() - new Date(cachedAt).getTime()
  return age > CACHE_TTL_MS
}

// ─── Route handlers ───────────────────────────────────────────────────────────

/**
 * GET /api/google-reviews
 * Returns cached reviews, or refreshes from Google Places API if stale (> 24h) or forced (?force=true).
 */
export async function GET(request: Request) {
  return handleSync(request)
}

/**
 * POST /api/google-reviews
 * Manually trigger refresh (used by Admin dashboard).
 */
export async function POST(request: Request) {
  return handleSync(request)
}

async function handleSync(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const isCron = Boolean(request.headers.get('x-vercel-cron'))
    const force = isCron || searchParams.get('force') === 'true'

    let cached = await readCache()
    const stale = force || !cached || !cached.cachedAt || isCacheStale(cached.cachedAt)

    if (stale) {
      const { data: fresh, error: googleError } = await fetchFromGooglePlaces()
      if (fresh) {
        // Merge fresh reviews with existing cached reviews to accumulate them without losing past ones
        const existingReviews = cached?.reviews || []
        const mergedMap = new Map<string, GoogleReview>()

        existingReviews.forEach((r) => {
          const key = `${r.author_name}-${r.time || r.text.slice(0, 20)}`
          mergedMap.set(key, r)
        })
        fresh.reviews.forEach((r) => {
          const key = `${r.author_name}-${r.time || r.text.slice(0, 20)}`
          mergedMap.set(key, r)
        })

        const mergedReviews = Array.from(mergedMap.values())
          .filter((r) => r.text && r.text.trim().length > 0)
          .sort((a, b) => (b.time || 0) - (a.time || 0))

        const mergedData: GooglePlaceData = {
          rating: fresh.rating,
          user_ratings_total: fresh.user_ratings_total,
          reviews: mergedReviews,
          cachedAt: fresh.cachedAt,
        }

        const writeResult = await writeCache(mergedData)

        try {
          revalidatePath('/', 'layout')
        } catch (_) {}

        return NextResponse.json({
          success: true,
          action: 'refreshed',
          totalReviews: mergedData.reviews.length,
          userRatingsTotal: mergedData.user_ratings_total,
          user_ratings_total: mergedData.user_ratings_total,
          cachedAt: mergedData.cachedAt,
          storage: writeResult,
          rating: mergedData.rating,
          reviews: mergedData.reviews,
        })
      }

      // If Google API failed
      if (force) {
        return NextResponse.json(
          {
            success: false,
            error: googleError || 'Failed to fetch fresh reviews from Google',
            cached,
          },
          { status: 502 }
        )
      }

      // Google API failed on background check — return stale cache if available, else empty fallback
      if (cached) return NextResponse.json(cached)
      return NextResponse.json({
        rating: 5.0,
        user_ratings_total: 0,
        reviews: [],
        cachedAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      action: 'cached',
      ...cached,
      user_ratings_total: cached?.user_ratings_total ?? 0,
      userRatingsTotal: cached?.user_ratings_total ?? 0,
    })
  } catch (err: any) {
    console.error('GET /api/google-reviews error:', err)
    return NextResponse.json({ error: err?.message || 'Failed to get reviews' }, { status: 500 })
  }
}
