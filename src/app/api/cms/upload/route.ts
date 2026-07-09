import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function uploadToCloudinary(buffer: Buffer): Promise<{ secure_url: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'shugaosha_cms',
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result as { secure_url: string })
      }
    )
    uploadStream.end(buffer)
  })
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // If Cloudinary is configured, upload to Cloudinary (for Vercel production CMS)
    if (process.env.CLOUDINARY_API_SECRET && process.env.CLOUDINARY_CLOUD_NAME) {
      const result = await uploadToCloudinary(buffer)
      return NextResponse.json({ success: true, url: result.secure_url })
    }
    
    // Otherwise, fall back to local file system upload
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${Date.now()}-${originalName}`
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'uploads')
    
    await fs.mkdir(uploadDir, { recursive: true })
    const filePath = path.join(uploadDir, filename)
    await fs.writeFile(filePath, buffer)
    
    const url = `/assets/uploads/${filename}`
    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
