import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const PUBLIC_DIR = join(process.cwd(), 'public')
const RESUME_PATH = join(PUBLIC_DIR, 'resume.pdf')

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.includes('pdf')) {
      return Response.json(
        { error: 'Please upload a PDF file' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return Response.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Ensure public directory exists
    if (!existsSync(PUBLIC_DIR)) {
      await mkdir(PUBLIC_DIR, { recursive: true })
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(RESUME_PATH, buffer)

    return Response.json(
      { success: true, message: 'Resume uploaded successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Resume upload error:', error)
    return Response.json(
      { error: 'Failed to upload resume' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Check if resume exists
    if (!existsSync(RESUME_PATH)) {
      return Response.json(
        { exists: false },
        { status: 200 }
      )
    }

    // Return resume metadata
    const buffer = await readFile(RESUME_PATH)
    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Krishiv_Katariya_Resume.pdf"',
      },
    })
  } catch (error) {
    console.error('Resume download error:', error)
    return Response.json(
      { error: 'Failed to download resume' },
      { status: 500 }
    )
  }
}
