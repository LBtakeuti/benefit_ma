import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-2024'

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number }
  } catch {
    return null
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: true,
        tags: true
      }
    })

    if (!news) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ news })
  } catch (error) {
    console.error('Failed to fetch news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const id = parseInt(params.id)
    const data = await request.json()
    const { title, content, categoryId, thumbnail, published, publishedAt, tags } = data

    // Update slug if title changed
    let slug = undefined
    if (title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      slug = `${slug}-${Date.now()}`
    }

    const news = await prisma.news.update({
      where: { id },
      data: {
        title,
        content,
        slug,
        thumbnail,
        published,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        tags: tags ? {
          set: [],
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { 
              name: tag,
              slug: tag.toLowerCase().replace(/\s+/g, '-')
            }
          }))
        } : undefined
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: true,
        tags: true
      }
    })

    return NextResponse.json({ news })
  } catch (error) {
    console.error('Failed to update news:', error)
    return NextResponse.json(
      { error: 'Failed to update news' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const id = parseInt(params.id)
    
    await prisma.news.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete news:', error)
    return NextResponse.json(
      { error: 'Failed to delete news' },
      { status: 500 }
    )
  }
}