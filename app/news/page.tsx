'use client'

import { useState, useEffect } from 'react'
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

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('すべて')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = ['すべて', 'その他', 'M&A用語集', '基礎知識']

  useEffect(() => {
    fetchNews()
  }, [selectedCategory, currentPage])

  const fetchNews = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== 'すべて') {
        params.append('category', selectedCategory)
      }
      params.append('page', currentPage.toString())
      params.append('limit', '9')
      
      // Contentful APIを試し、失敗したら静的APIにフォールバック
      let response = await fetch(`/api/news/contentful?${params}`)
      if (!response.ok) {
        response = await fetch(`/api/news/static?${params}`)
      }
      const data = await response.json()
      setNews(data.news)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Failed to fetch news:', error)
      // エラー時は静的データを使用
      try {
        const params = new URLSearchParams()
        if (selectedCategory !== 'すべて') {
          params.append('category', selectedCategory)
        }
        params.append('page', currentPage.toString())
        params.append('limit', '9')
        
        const response = await fetch(`/api/news/static?${params}`)
        const data = await response.json()
        setNews(data.news)
        setTotalPages(data.pagination.totalPages)
      } catch (staticError) {
        console.error('Failed to fetch static news:', staticError)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">M&Aニュース</h1>
          <p className="mt-2 text-gray-600">最新のM&A関連ニュースをお届けします</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-accent text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">読み込み中...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {item.thumbnail && (
                    <div className="relative h-48">
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
                    <h2 className="text-xl font-bold mb-3">{item.title}</h2>
                    <p className="text-gray-600 line-clamp-3">{item.content}</p>
                  </div>
                </article>
              ))}
            </div>

            {news.length === 0 && (
              <p className="text-center text-gray-500 py-12">ニュースがありません</p>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  前へ
                </button>
                <span className="px-4 py-2">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  次へ
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}