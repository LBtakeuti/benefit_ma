export default function PricingPage() {
  const feeTable = [
    { range: "5億円以下の部分", rate: "5%" },
    { range: "5億円超〜10億円以下の部分", rate: "4%" },
    { range: "10億円超〜50億円以下の部分", rate: "3%" },
    { range: "50億円超〜100億円以下の部分", rate: "2%" },
    { range: "100億円超の部分", rate: "1%" }
  ]

  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">料金・報酬</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            完全成功報酬制により、成約まで一切費用はかかりません。
            透明性の高い料金体系で安心してご利用いただけます。
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-accent text-white p-8 mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">完全成功報酬制</h2>
              <p className="text-xl">
                着手金・月額費用・中間金など一切不要<br />
                成約時のみ報酬が発生します
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">初回相談</h3>
                <p className="text-3xl font-bold text-accent mb-2">無料</p>
                <p className="text-gray-600 text-sm">
                  お気軽にご相談ください
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">企業評価・査定</h3>
                <p className="text-3xl font-bold text-accent mb-2">無料</p>
                <p className="text-gray-600 text-sm">
                  適正な企業価値を算定
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">マッチング・交渉</h3>
                <p className="text-3xl font-bold text-accent mb-2">無料</p>
                <p className="text-gray-600 text-sm">
                  最適な相手先をご紹介
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">成功報酬の算定方法（レーマン方式）</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3 text-left font-medium">譲渡金額</th>
                      <th className="px-6 py-3 text-right font-medium">料率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeTable.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-6 py-4">{item.range}</td>
                        <td className="px-6 py-4 text-right font-medium">{item.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                ※ 最低報酬額は1,000万円となります。<br />
                ※ 譲渡金額は、株式価値＋有利子負債の合計額です。
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">料金計算例</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">譲渡金額が3億円の場合</p>
                  <p className="text-gray-700">
                    3億円 × 5% = 1,500万円（税別）
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-2">譲渡金額が10億円の場合</p>
                  <p className="text-gray-700">
                    5億円 × 5% + 5億円 × 4% = 2,500万円 + 2,000万円 = 4,500万円（税別）
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-green-600">含まれるサービス</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>初回相談・ヒアリング</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>企業価値評価・査定</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>買い手候補の探索・選定</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>交渉サポート・条件調整</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>契約書作成支援</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>クロージング支援</span>
                  </li>
                </ul>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-red-600">別途費用が必要なもの</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">×</span>
                    <span>デューデリジェンス費用（買い手負担）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">×</span>
                    <span>弁護士・税理士等の専門家費用</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">×</span>
                    <span>登記費用等の実費</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">×</span>
                    <span>交通費・宿泊費等の実費</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">なぜ完全成功報酬制なのか</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">リスクゼロ</h3>
              <p className="text-gray-600 text-sm">
                成約しなければ費用は一切かかりません。安心してご相談いただけます。
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">共通の目標</h3>
              <p className="text-gray-600 text-sm">
                お客様と同じ目標（成約）に向かって全力でサポートします。
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">透明性</h3>
              <p className="text-gray-600 text-sm">
                明確な料金体系で、隠れた費用は一切ありません。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">料金に関するご質問はお気軽に</h2>
          <p className="text-gray-600 mb-6">
            料金体系や費用に関する詳細なご説明をいたします。
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