'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface NewsItem {
  id: number
  title: string
  content: string
  category: string
  thumbnail: string | null
  publishedAt: string
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      // Contentful APIを試し、失敗したら静的APIにフォールバック
      let response = await fetch('/api/news/contentful?limit=3')
      if (!response.ok) {
        response = await fetch('/api/news/static?limit=3')
      }
      const data = await response.json()
      setNews(data.news)
    } catch (error) {
      console.error('Failed to fetch news:', error)
      // エラー時は静的データを使用
      try {
        const response = await fetch('/api/news/static?limit=3')
        const data = await response.json()
        setNews(data.news)
      } catch (staticError) {
        console.error('Failed to fetch static news:', staticError)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">M&Aニュース</h2>
          <div className="text-center">読み込み中...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">M&Aニュース</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="bg-white border border-gray-200 overflow-hidden">
              {item.thumbnail && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-sm text-gray-500">
                    {format(new Date(item.publishedAt), 'yyyy.MM.dd', { locale: ja })}
                  </time>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {item.content}
                </p>
              </div>
            </article>
          ))}
        </div>
        {news.length === 0 && (
          <p className="text-center text-gray-500">ニュースがありません</p>
        )}
        <div className="text-center mt-8">
          <Link
            href="/news"
            className="inline-block border-2 border-accent text-accent px-6 py-2 rounded hover:bg-accent hover:text-white transition-colors"
          >
            ニュース一覧を見る
          </Link>
        </div>
      </div>
    </section>
  )
}