'use client'

import { useState } from 'react'

export default function ResultsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const results = [
    {
      id: 1,
      date: "2024年1月",
      sellerIndustry: "製造業",
      buyerIndustry: "製造業",
      location: "大阪府",
      description: "精密部品製造業の事業承継型M&A",
      comment: "後継者不在の解決と技術継承を実現"
    },
    {
      id: 2,
      date: "2023年12月",
      sellerIndustry: "飲食業",
      buyerIndustry: "飲食業",
      location: "東京都",
      description: "和食レストランチェーンの譲渡",
      comment: "シナジー効果による事業拡大"
    },
    {
      id: 3,
      date: "2023年11月",
      sellerIndustry: "IT・ソフトウェア",
      buyerIndustry: "情報通信業",
      location: "愛知県",
      description: "システム開発会社の株式譲渡",
      comment: "技術力強化と人材確保"
    },
    {
      id: 4,
      date: "2023年10月",
      sellerIndustry: "建設業",
      buyerIndustry: "不動産業",
      location: "福岡県",
      description: "地域密着型建設会社のM&A",
      comment: "事業エリアの拡大"
    },
    {
      id: 5,
      date: "2023年9月",
      sellerIndustry: "医療・介護",
      buyerIndustry: "医療法人",
      location: "兵庫県",
      description: "介護施設の事業譲渡",
      comment: "サービス品質の向上"
    },
    {
      id: 6,
      date: "2023年8月",
      sellerIndustry: "卸売業",
      buyerIndustry: "商社",
      location: "神奈川県",
      description: "医療機器卸売業の株式譲渡",
      comment: "販路拡大と効率化"
    },
    {
      id: 7,
      date: "2023年7月",
      sellerIndustry: "運輸業",
      buyerIndustry: "物流業",
      location: "埼玉県",
      description: "物流会社の事業統合",
      comment: "物流網の最適化"
    },
    {
      id: 8,
      date: "2023年6月",
      sellerIndustry: "小売業",
      buyerIndustry: "小売業",
      location: "京都府",
      description: "地域小売店の事業承継",
      comment: "地域顧客基盤の継承"
    },
    {
      id: 9,
      date: "2023年5月",
      sellerIndustry: "製造業",
      buyerIndustry: "製造業",
      location: "千葉県",
      description: "印刷会社の株式譲渡",
      comment: "設備投資と技術革新"
    }
  ]

  const totalPages = Math.ceil(results.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedResults = results.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">成約実績</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            これまでに成約したM&A案件の一部をご紹介します。
            守秘義務により詳細を掲載できない案件も多数ございます。
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedResults.map((result) => (
              <div key={result.id} className="bg-white border-l-4 border-accent p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 font-medium">{result.date}</span>
                  <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">成約</span>
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">{result.description}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>譲渡企業: <span className="font-medium">{result.sellerIndustry}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>譲受企業: <span className="font-medium">{result.buyerIndustry}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span>地域: <span className="font-medium">{result.location}</span></span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic bg-gray-50 p-3 rounded border-l-2 border-gray-300">{result.comment}</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                前へ
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border transition-colors ${
                    currentPage === i + 1
                      ? 'bg-accent text-white border-accent'
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                次へ
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">実績の数字</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-gray-300">累計相談件数</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">85%</p>
              <p className="text-gray-300">成約率</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">55年</p>
              <p className="text-gray-300">業界経験</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">貴社のM&Aも成功へ導きます</h2>
          <p className="text-gray-600 mb-6">
            豊富な実績と経験を活かし、最適なマッチングを実現します。
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            無料相談を申し込む
          </a>
        </div>
      </section>
    </div>
  )
}