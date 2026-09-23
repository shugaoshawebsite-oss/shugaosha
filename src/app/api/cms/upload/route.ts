import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'

function getCloudinary() {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL,
    })
    return cloudinary
  }
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    return cloudinary
  }
  return null
}

function uploadToCloudinary(buffer: Buffer): Promise<{ secure_url: string }> {
  const client = getCloudinary()
  if (!client) {
    return Promise.reject(new Error('Cloudinary credentials not configured'))
  }
  return new Promise((resolve, reject) => {
    const uploadStream = client.uploader.upload_stream(
      {
        folder: 'shugaosha_cms',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result as { secure_url: string })
      }
    )
    uploadStream.end(buffer)
  })
}

async function uploadToGitHub(filename: string, buffer: Buffer): Promise<string> {
  const repo = process.env.GITHUB_CONTENT_REPO
  const branch = process.env.GITHUB_CONTENT_BRANCH || 'main'
  const token = process.env.GITHUB_TOKEN
  const repoPath = `public/assets/uploads/${filename}`

  const putUrl = `https://api.github.com/repos/${repo}/contents/${repoPath}`
  const body = {
    message: `cms: upload asset ${filename}`,
    content: buffer.toString('base64'),
    branch,
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
    throw new Error(`GitHub image upload error: ${errorText}`)
  }

  return `/assets/uploads/${filename}`
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${Date.now()}-${originalName}`

    let finalUrl = ''

    // 1. Try Cloudinary upload if configured
    if (getCloudinary()) {
      try {
        const result = await uploadToCloudinary(buffer)
        finalUrl = result.secure_url
      } catch (cloudErr) {
        console.error('Cloudinary upload failed, attempting fallback:', cloudErr)
      }
    }

    // 2. Try GitHub commit if configured (for production Vercel serverless)
    if (!finalUrl && process.env.GITHUB_TOKEN && process.env.GITHUB_CONTENT_REPO) {
      try {
        finalUrl = await uploadToGitHub(filename, buffer)
      } catch (ghErr) {
        console.error('GitHub image upload failed, attempting local fallback:', ghErr)
      }
    }

    // 3. Fallback to local file system storage (development)
    if (!finalUrl) {
      const uploadDir = path.join(process.cwd(), 'public', 'assets', 'uploads')
      await fs.mkdir(uploadDir, { recursive: true })
      const filePath = path.join(uploadDir, filename)
      await fs.writeFile(filePath, buffer)
      finalUrl = `/assets/uploads/${filename}`
    }

    // Revalidate app pages so uploaded image renders everywhere
    revalidatePath('/', 'layout')

    return NextResponse.json({ success: true, url: finalUrl })
  } catch (error: any) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to upload file' },
      { status: 500 }
    )
  }
}
