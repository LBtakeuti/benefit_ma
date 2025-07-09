import { NextRequest, NextResponse } from 'next/server'
import { getNews } from '@/app/lib/contentful'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const { items, total } = await getNews({
      category,
      limit,
      skip
    })

    return NextResponse.json({
      news: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Contentful API error:', error)
    
    // Contentfulが設定されていない場合はJSONファイルにフォールバック
    return NextResponse.redirect(new URL('/api/news/static', request.url))
  }
}