import { NextRequest, NextResponse } from 'next/server'
import { getNewsFromFile, addNews } from '@/app/lib/news-storage'
import { verifyToken } from '@/app/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // ファイルベースストレージから全ニュースを取得
    const allNews = await getNewsFromFile()

    // カテゴリでフィルタリング
    const filteredNews = category && category !== 'すべて' 
      ? allNews.filter(item => item.category === category)
      : allNews

    // ページネーション
    const paginatedNews = filteredNews.slice(skip, skip + limit)
    const total = filteredNews.length

    return NextResponse.json({
      news: paginatedNews,
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

    // ファイルベースストレージに追加
    const newNews = await addNews({
      title,
      content,
      category,
      thumbnail,
      publishedAt: publishedAt || new Date().toISOString(),
      author: {
        name: 'BMAC Administrator',
        email: 'admin@example.com'
      }
    })

    return NextResponse.json(newNews, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    )
  }
}