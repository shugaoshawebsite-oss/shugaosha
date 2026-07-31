import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

// Define the valid content types and their corresponding file names
const validTypes = {
  celebrities: 'celebrities.json',
  caseStudies: 'caseStudies.json',
  tours: 'tours.json',
  services: 'services.json',
  reviews: 'reviews.json',
  team: 'team.json',
}

async function fetchFromGitHub(fileName: string): Promise<any> {
  const repo = process.env.GITHUB_CONTENT_REPO
  const branch = process.env.GITHUB_CONTENT_BRANCH || 'main'
  const token = process.env.GITHUB_TOKEN
  const path = `content/${fileName}`
  
  const url = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`
  
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3.raw',
    },
    cache: 'no-store',
  })
  
  if (!res.ok) {
    throw new Error(`Failed to fetch from GitHub: ${res.statusText}`)
  }
  
  return res.json()
}

async function writeToGitHub(fileName: string, content: string) {
  const repo = process.env.GITHUB_CONTENT_REPO
  const branch = process.env.GITHUB_CONTENT_BRANCH || 'main'
  const token = process.env.GITHUB_TOKEN
  const path = `content/${fileName}`

  // 1. Get current file SHA (required by GitHub API to update files)
  const getUrl = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`
  let sha = ''
  
  try {
    const res = await fetch(getUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      cache: 'no-store',
    })
    if (res.ok) {
      const data = await res.json()
      sha = data.sha
    }
  } catch (err) {
    console.error('Error fetching file SHA from GitHub:', err)
  }

  // 2. Update/Commit the file
  const putUrl = `https://api.github.com/repos/${repo}/contents/${path}`
  const body = {
    message: `cms: update ${fileName}`,
    content: Buffer.from(content).toString('base64'),
    branch,
    ...(sha ? { sha } : {}),
  }

  const res = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`GitHub API error: ${errorText}`)
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params
  const typeKey = type as keyof typeof validTypes
  
  if (!validTypes[typeKey]) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
  }

  try {
    let data: any
    // If GITHUB_TOKEN is present, fetch raw live data directly from GitHub API
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_CONTENT_REPO) {
      data = await fetchFromGitHub(validTypes[typeKey])
    } else {
      // Otherwise fall back to reading from local file system
      const filePath = path.join(process.cwd(), 'content', validTypes[typeKey])
      const fileContent = await fs.readFile(filePath, 'utf8')
      data = JSON.parse(fileContent)
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error(`Error reading ${type}:`, error)
    return NextResponse.json({ error: `Failed to read ${type}` }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params
  const typeKey = type as keyof typeof validTypes

  if (!validTypes[typeKey]) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
  }

  try {
    const data = await request.json()
    const jsonString = JSON.stringify(data, null, 2)

    // If GITHUB_TOKEN is present, write directly to the GitHub Repo (for Vercel production CMS)
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_CONTENT_REPO) {
      await writeToGitHub(validTypes[typeKey], jsonString)
    } else {
      // Otherwise, write locally for dev environment
      const filePath = path.join(process.cwd(), 'content', validTypes[typeKey])
      await fs.writeFile(filePath, jsonString, 'utf8')
    }

    // Trigger on-demand revalidation across the entire app so Vercel updates the frontend immediately
    revalidatePath('/', 'layout')

    return NextResponse.json({ success: true, message: `Successfully updated ${type}` })
  } catch (error) {
    console.error(`Error writing ${type}:`, error)
    return NextResponse.json({ error: `Failed to write ${type}` }, { status: 500 })
  }
}
