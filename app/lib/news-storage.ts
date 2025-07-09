import fs from 'fs/promises'
import path from 'path'

interface NewsItem {
  id: number
  title: string
  content: string
  category: string
  thumbnail: string | null
  publishedAt: string
  author: {
    name: string
    email: string
  }
}

const NEWS_FILE_PATH = path.join(process.cwd(), 'data', 'news.json')

// ニュース一覧を取得
export async function getNewsFromFile(): Promise<NewsItem[]> {
  try {
    const data = await fs.readFile(NEWS_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // ファイルが存在しない場合は初期データを返す
    return [
      {
        id: 1,
        title: "事業承継セミナー開催のお知らせ",
        content: "中小企業経営者向けの事業承継セミナーを開催いたします。専門家による講演やワークショップを通じて、事業承継の成功ポイントを学びます。",
        category: "その他",
        thumbnail: null,
        publishedAt: "2024-01-15T00:00:00.000Z",
        author: {
          name: "管理者",
          email: "admin@example.com"
        }
      },
      {
        id: 2,
        title: "製造業のM&A成約事例",
        content: "大阪府内の製造業において、事業承継型M&Aが成約しました。従業員の雇用を維持しながら、新たな成長戦略を実現します。",
        category: "基礎知識",
        thumbnail: null,
        publishedAt: "2024-01-10T00:00:00.000Z",
        author: {
          name: "管理者",
          email: "admin@example.com"
        }
      },
      {
        id: 3,
        title: "M&Aにおけるデューデリジェンスとは",
        content: "M&Aを成功させるために重要なデューデリジェンスについて解説します。財務、法務、ビジネスの各観点から詳しく説明します。",
        category: "M&A用語集",
        thumbnail: null,
        publishedAt: "2024-01-05T00:00:00.000Z",
        author: {
          name: "管理者",
          email: "admin@example.com"
        }
      }
    ]
  }
}

// ニュースを保存
export async function saveNewsToFile(news: NewsItem[]): Promise<void> {
  try {
    // ディレクトリが存在しない場合は作成
    const dir = path.dirname(NEWS_FILE_PATH)
    await fs.mkdir(dir, { recursive: true })
    
    // JSONファイルに保存
    await fs.writeFile(NEWS_FILE_PATH, JSON.stringify(news, null, 2))
  } catch (error) {
    console.error('Failed to save news:', error)
    // 本番環境では書き込みができないため、エラーを無視
  }
}

// 新しいニュースを追加
export async function addNews(newsData: Omit<NewsItem, 'id'>): Promise<NewsItem> {
  const allNews = await getNewsFromFile()
  const newId = allNews.length > 0 ? Math.max(...allNews.map(n => n.id)) + 1 : 1
  
  const newNews: NewsItem = {
    id: newId,
    ...newsData
  }
  
  allNews.unshift(newNews) // 新しいニュースを先頭に追加
  await saveNewsToFile(allNews)
  
  return newNews
}

// ニュースを更新
export async function updateNews(id: number, newsData: Partial<NewsItem>): Promise<NewsItem | null> {
  const allNews = await getNewsFromFile()
  const index = allNews.findIndex(n => n.id === id)
  
  if (index === -1) {
    return null
  }
  
  allNews[index] = {
    ...allNews[index],
    ...newsData,
    id // IDは変更しない
  }
  
  await saveNewsToFile(allNews)
  return allNews[index]
}

// ニュースを削除
export async function deleteNews(id: number): Promise<boolean> {
  const allNews = await getNewsFromFile()
  const filteredNews = allNews.filter(n => n.id !== id)
  
  if (filteredNews.length === allNews.length) {
    return false // 削除対象が見つからなかった
  }
  
  await saveNewsToFile(filteredNews)
  return true
}