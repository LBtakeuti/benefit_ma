import { NextRequest, NextResponse } from 'next/server'
import newsData from '@/data/news.json'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    let filteredNews = newsData
    if (category && category !== 'すべて') {
      filteredNews = newsData.filter(news => news.category === category)
    }

    const sortedNews = filteredNews.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    const paginatedNews = sortedNews.slice(skip, skip + limit)

    return NextResponse.json({
      news: paginatedNews.map(news => ({
        ...news,
        author: { name: '管理者', email: 'admin@example.com' }
      })),
      pagination: {
        page,
        limit,
        total: filteredNews.length,
        totalPages: Math.ceil(filteredNews.length / limit)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}