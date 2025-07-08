import Image from 'next/image'

export default function FeaturesPage() {
  const features = [
    {
      number: "01",
      title: "完全成功報酬制",
      description: "成約まで一切費用はかかりません。初回相談も無料です。",
      details: [
        "着手金・月額費用0円",
        "成約時のみ手数料が発生",
        "明確な料金体系",
        "初回相談完全無料"
      ]
    },
    {
      number: "02",
      title: "最適なM&Aアドバイザー選任",
      description: "豊富な経験を持つ専門家が最適なマッチングを実現します。",
      details: [
        "業界に精通したアドバイザー",
        "豊富な成約実績",
        "きめ細やかなサポート",
        "秘密厳守の徹底"
      ]
    },
    {
      number: "03",
      title: "迅速な対応と仲介手続き",
      description: "スピーディーな対応で、最適なタイミングでの成約を実現します。",
      details: [
        "平均3〜6ヶ月での成約",
        "効率的なプロセス",
        "迅速な情報提供",
        "タイムリーな交渉サポート"
      ]
    },
    {
      number: "04",
      title: "日本全国を網羅",
      description: "全国どこでも対応可能。地域を問わず最適な相手先をご紹介します。",
      details: [
        "全国ネットワーク",
        "地域特性を考慮したマッチング",
        "オンライン相談対応",
        "現地訪問も可能"
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">当社の特徴</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            株式会社ベネフィットM&Aコンサルタンツは、お客様の大切な事業を次世代へつなぐため、
            4つの強みを活かしてサポートいたします。
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {features.map((feature, index) => (
              <div key={index} className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-bold text-accent opacity-20">{feature.number}</span>
                    <h2 className="text-3xl font-bold">{feature.title}</h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-accent mt-1">●</span>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="relative h-80 rounded-lg overflow-hidden">
                    <Image
                      src={
                        index === 0 ? "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" :
                        index === 1 ? "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" :
                        index === 2 ? "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" :
                        "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      }
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">まずは無料相談から</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            M&A・事業承継に関するご相談は無料です。
            お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:06-6786-8260"
              className="bg-white text-accent px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              06-6786-8260
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-accent transition-colors font-medium"
            >
              お問い合わせフォーム
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}