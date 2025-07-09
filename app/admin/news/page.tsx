'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface News {
  id: number
  title: string
  category: string
  publishedAt: string
  author: {
    name: string | null
  }
}

export default function NewsListPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('すべて')

  const categories = ['すべて', 'その他', 'M&A用語集', '基礎知識']

  useEffect(() => {
    fetchNews()
  }, [selectedCategory])

  const fetchNews = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== 'すべて') {
        params.append('category', selectedCategory)
      }
      
      const response = await fetch(`/api/news?${params}`)
      const data = await response.json()
      setNews(data.news)
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteNews = async (id: number) => {
    if (!confirm('本当に削除しますか？')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchNews()
      }
    } catch (error) {
      console.error('Failed to delete news:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">ニュース管理</h1>
          <p className="mt-2 text-sm text-gray-700">
            M&Aニュースの一覧と管理
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/news/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            新規作成
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      タイトル
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      カテゴリ
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      公開日
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      作成者
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">操作</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {news.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {item.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(item.publishedAt), 'yyyy年MM月dd日', { locale: ja })}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {item.author.name || '不明'}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          href={`/admin/news/${item.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          編集
                        </Link>
                        <button
                          onClick={() => deleteNews(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}