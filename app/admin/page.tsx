'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  totalNews: number
  recentNews: Array<{
    id: number
    title: string
    publishedAt: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalNews: 0, recentNews: [] })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/news?limit=5')
      const data = await response.json()
      setStats({
        totalNews: data.pagination.total,
        recentNews: data.news
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
      
      <div className="mt-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              総ニュース数
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.totalNews}
            </dd>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">最近のニュース</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {stats.recentNews.map((news) => (
              <li key={news.id}>
                <Link href={`/admin/news/${news.id}/edit`} className="block hover:bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {news.title}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {new Date(news.publishedAt).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}