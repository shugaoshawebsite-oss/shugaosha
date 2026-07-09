import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Create a safe, unique filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${Date.now()}-${originalName}`
    
    // Save to public/assets/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'uploads')
    
    // Ensure directory exists (mkdir -p equivalent)
    await fs.mkdir(uploadDir, { recursive: true })
    
    const filePath = path.join(uploadDir, filename)
    await fs.writeFile(filePath, buffer)
    
    // Return the relative URL starting from the public root
    const url = `/assets/uploads/${filename}`
    
    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
