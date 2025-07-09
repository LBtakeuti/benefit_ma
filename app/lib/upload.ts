import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR)
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true })
  }
}

export async function saveImage(buffer: Buffer, filename: string): Promise<string> {
  await ensureUploadDir()
  
  const uniqueFilename = `${Date.now()}-${filename}`
  const filepath = path.join(UPLOAD_DIR, uniqueFilename)
  
  await sharp(buffer)
    .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(filepath)
  
  return `/uploads/${uniqueFilename}`
}