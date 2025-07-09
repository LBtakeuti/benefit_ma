import { NextRequest, NextResponse } from 'next/server'
import { getNewsFromFile, updateNews, deleteNews } from '@/app/lib/news-storage'
import { verifyToken } from '@/app/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const allNews = await getNewsFromFile()
    const news = allNews.find(item => item.id === parseInt(params.id))

    if (!news) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updatedNews = await updateNews(parseInt(params.id), {
      title,
      content,
      category,
      thumbnail,
      publishedAt
    })

    if (!updatedNews) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedNews)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update news' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const success = await deleteNews(parseInt(params.id))

    if (!success) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'News deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete news' },
      { status: 500 }
    )
  }
}