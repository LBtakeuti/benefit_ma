import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { verifyToken } from '@/app/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // 本番環境では静的データまたはContentfulを使用
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.redirect(new URL('/api/news/static', request.url))
    }

    // 開発環境では通常のデータベース操作
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = category && category !== 'すべて' ? { category } : {}

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        include: {
          author: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.news.count({ where })
    ])

    return NextResponse.json({
      news,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const { title, content, category, thumbnail, publishedAt } = await request.json()

    // 本番環境では静的JSONファイルに追加（デモ用）
    if (process.env.NODE_ENV === 'production') {
      const newNews = {
        id: Date.now(),
        title,
        content,
        category,
        thumbnail,
        publishedAt: publishedAt || new Date().toISOString(),
        author: {
          name: 'BMAC Administrator',
          email: 'admin@example.com'
        }
      }
      
      return NextResponse.json(newNews, { status: 201 })
    }

    // 開発環境では通常のデータベース操作
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now()

    const news = await prisma.news.create({
      data: {
        title,
        content,
        category,
        thumbnail,
        slug,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        authorId: decoded.userId
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    )
  }
}