import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Define the valid content types and their corresponding file names
const validTypes = {
  celebrities: 'celebrities.json',
  caseStudies: 'caseStudies.json',
  tours: 'tours.json',
  services: 'services.json',
  reviews: 'reviews.json',
  team: 'team.json',
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
    const filePath = path.join(process.cwd(), 'content', validTypes[typeKey])
    const fileContent = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContent)
    return NextResponse.json(data)
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
    const filePath = path.join(process.cwd(), 'content', validTypes[typeKey])
    
    // Write the file beautifully formatted
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
    
    return NextResponse.json({ success: true, message: `Successfully updated ${type}` })
  } catch (error) {
    console.error(`Error writing ${type}:`, error)
    return NextResponse.json({ error: `Failed to write ${type}` }, { status: 500 })
  }
}
