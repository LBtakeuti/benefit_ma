'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function CasesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const cases = [
    {
      id: 1,
      title: "精密機械部品製造",
      industry: "製造業",
      location: "大阪府",
      revenue: "5億円",
      description: "精密機械部品の製造・販売",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "和食レストラン",
      industry: "飲食業",
      location: "東京都",
      revenue: "2億円",
      description: "和食レストランチェーン",
      imageUrl: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "システム開発企業",
      industry: "情報通信業",
      location: "愛知県",
      revenue: "3億円",
      description: "業務システム開発",
      imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "総合建設業",
      industry: "建設業",
      location: "福岡県",
      revenue: "8億円",
      description: "土木工事・建築工事",
      imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "医療機器販売",
      industry: "卸売業",
      location: "神奈川県",
      revenue: "4億円",
      description: "医療機器の販売・メンテナンス",
      imageUrl: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "物流・運送業",
      industry: "運輸業",
      location: "埼玉県",
      revenue: "6億円",
      description: "倉庫業・配送業",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      title: "介護サービス",
      industry: "医療・介護",
      location: "兵庫県",
      revenue: "2.5億円",
      description: "デイサービス・訪問介護",
      imageUrl: "https://images.unsplash.com/photo-1559304787-945aa4341065?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      title: "生活雑貨店",
      industry: "小売業",
      location: "京都府",
      revenue: "1.5億円",
      description: "雑貨・生活用品販売",
      imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9,
      title: "商業印刷",
      industry: "製造業",
      location: "千葉県",
      revenue: "3.5億円",
      description: "商業印刷・パッケージ印刷",
      imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 10,
      title: "自動車整備工場",
      industry: "サービス業",
      location: "北海道",
      revenue: "1.8億円",
      description: "自動車整備・車検",
      imageUrl: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 11,
      title: "美容サロン",
      industry: "サービス業",
      location: "福岡県",
      revenue: "1.2億円",
      description: "美容室チェーン",
      imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 12,
      title: "食品製造業",
      industry: "製造業",
      location: "静岡県",
      revenue: "7億円",
      description: "食品加工・製造",
      imageUrl: "https://images.unsplash.com/photo-1606237906220-81e2b1a80e10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]

  const totalPages = Math.ceil(cases.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedCases = cases.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">譲渡案件</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            現在お取り扱い中の譲渡案件をご紹介します。
            詳細については、お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCases.map((caseItem) => (
              <div key={caseItem.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={caseItem.imageUrl}
                    alt={caseItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{caseItem.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>業種: {caseItem.industry}</p>
                    <p>所在地: {caseItem.location}</p>
                    <p>売上高: {caseItem.revenue}</p>
                  </div>
                  <p className="mt-3 text-gray-700">{caseItem.description}</p>
                  <button className="mt-4 text-accent font-medium hover:underline">
                    詳細を見る →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                前へ
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border ${
                    currentPage === i + 1
                      ? 'bg-accent text-white'
                      : ''
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                次へ
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">案件の詳細についてはお問い合わせください</h2>
          <p className="text-gray-600 mb-6">
            秘密厳守で対応いたします。まずはお気軽にご相談ください。
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            お問い合わせする
          </a>
        </div>
      </section>
    </div>
  )
}