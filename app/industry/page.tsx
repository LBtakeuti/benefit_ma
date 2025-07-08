export default function IndustryPage() {
  const industries = [
    {
      name: "製造業",
      description: "技術力と設備を活かした事業承継",
      color: "bg-blue-500",
      points: [
        "設備投資負担の軽減",
        "技術・ノウハウの継承",
        "取引先との関係維持",
        "従業員の雇用確保"
      ]
    },
    {
      name: "建設業",
      description: "許認可と人材を活かしたM&A",
      color: "bg-yellow-500",
      points: [
        "建設業許可の承継",
        "熟練技術者の確保",
        "受注基盤の拡大",
        "地域ネットワークの活用"
      ]
    },
    {
      name: "IT・ソフトウェア",
      description: "技術力と人材の相乗効果",
      color: "bg-purple-500",
      points: [
        "エンジニアの確保",
        "技術力の向上",
        "顧客基盤の拡大",
        "新規事業への展開"
      ]
    },
    {
      name: "飲食業",
      description: "ブランドと立地を活かした展開",
      color: "bg-red-500",
      points: [
        "優良立地の確保",
        "ブランド力の活用",
        "運営ノウハウの共有",
        "仕入れコストの削減"
      ]
    },
    {
      name: "医療・介護",
      description: "地域医療・介護の継続",
      color: "bg-green-500",
      points: [
        "医療・介護の継続",
        "スタッフの雇用維持",
        "設備・施設の有効活用",
        "サービス品質の向上"
      ]
    },
    {
      name: "小売業",
      description: "店舗網と顧客基盤の拡大",
      color: "bg-pink-500",
      points: [
        "店舗網の拡大",
        "商品ラインナップの充実",
        "物流効率の改善",
        "顧客データの活用"
      ]
    },
    {
      name: "物流・運送業",
      description: "物流網の最適化と効率化",
      color: "bg-indigo-500",
      points: [
        "配送網の拡大",
        "車両・設備の有効活用",
        "ドライバーの確保",
        "倉庫機能の統合"
      ]
    },
    {
      name: "サービス業",
      description: "サービス品質と顧客満足度の向上",
      color: "bg-teal-500",
      points: [
        "サービスメニューの拡充",
        "専門人材の確保",
        "営業エリアの拡大",
        "業務効率の改善"
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">業種別M&A</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            各業種の特性を理解し、最適なM&A戦略をご提案します。
            業界特有の課題解決と成長戦略を支援いたします。
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white border-l-4 border-gray-200 p-6 hover:border-l-accent transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${industry.color}`}></div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent transition-colors">{industry.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{industry.description}</p>
                <ul className="space-y-2">
                  {industry.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-accent mt-1 text-xs">▸</span>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">業種別M&Aのメリット</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">業界特有の課題解決</h3>
              <p className="text-gray-600 text-sm">
                各業界の規制や慣習を理解した上で、最適なソリューションを提供
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">シナジー効果の最大化</h3>
              <p className="text-gray-600 text-sm">
                同業種・異業種問わず、相乗効果を生み出す組み合わせを実現
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">スムーズな事業承継</h3>
              <p className="text-gray-600 text-sm">
                業界の商慣習を踏まえた円滑な引き継ぎをサポート
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">業種別のM&A戦略をご提案します</h2>
          <p className="text-gray-600 mb-6">
            貴社の業界特性を踏まえた最適なM&A戦略をご提案いたします。
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            業種別相談を申し込む
          </a>
        </div>
      </section>
    </div>
  )
}