import { createClient } from 'contentful'

// Contentfulクライアントの作成
export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
})

// ニュースエントリーの型定義
export interface NewsEntry {
  fields: {
    title: string
    content: string
    category: 'その他' | 'M&A用語集' | '基礎知識'
    thumbnail?: {
      fields: {
        file: {
          url: string
        }
      }
    }
    publishedAt: string
  }
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
}

// ニュースを取得
export async function getNews(options?: {
  category?: string
  limit?: number
  skip?: number
}) {
  const query: any = {
    content_type: 'news',
    order: '-fields.publishedAt',
  }

  if (options?.limit) {
    query.limit = options.limit
  }

  if (options?.skip) {
    query.skip = options.skip
  }

  if (options?.category && options.category !== 'すべて') {
    query['fields.category'] = options.category
  }

  const entries = await contentfulClient.getEntries<NewsEntry>(query)
  
  return {
    items: entries.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title,
      content: item.fields.content,
      category: item.fields.category,
      thumbnail: item.fields.thumbnail?.fields.file.url 
        ? `https:${item.fields.thumbnail.fields.file.url}` 
        : null,
      publishedAt: item.fields.publishedAt,
      author: {
        name: '管理者',
        email: 'admin@example.com'
      }
    })),
    total: entries.total,
  }
}

// 単一のニュースを取得
export async function getNewsById(id: string) {
  const entry = await contentfulClient.getEntry<NewsEntry>(id)
  
  return {
    id: entry.sys.id,
    title: entry.fields.title,
    content: entry.fields.content,
    category: entry.fields.category,
    thumbnail: entry.fields.thumbnail?.fields.file.url 
      ? `https:${entry.fields.thumbnail.fields.file.url}` 
      : null,
    publishedAt: entry.fields.publishedAt,
    author: {
      name: '管理者',
      email: 'admin@example.com'
    }
  }
}