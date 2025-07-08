export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">会社概要</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            株式会社ベネフィットM&Aコンサルタンツは、55年の歴史を持つ
            M&A・事業承継の専門会社です。
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-6 py-4 font-medium w-1/3">会社名</td>
                    <td className="px-6 py-4">株式会社ベネフィットM&Aコンサルタンツ</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-6 py-4 font-medium">所在地</td>
                    <td className="px-6 py-4">
                      〒541-0044<br />
                      大阪府大阪市中央区伏見町4-4-9<br />
                      淀屋橋東洋ビル3階
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-6 py-4 font-medium">電話番号</td>
                    <td className="px-6 py-4">06-6786-8260</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-6 py-4 font-medium">FAX番号</td>
                    <td className="px-6 py-4">06-6786-8261</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-6 py-4 font-medium">設立</td>
                    <td className="px-6 py-4">昭和44年（1969年）</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-6 py-4 font-medium">代表者</td>
                    <td className="px-6 py-4">代表取締役</td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-6 py-4 font-medium">事業内容</td>
                    <td className="px-6 py-4">
                      M&A仲介事業<br />
                      事業承継コンサルティング<br />
                      企業評価・査定業務<br />
                      経営コンサルティング
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="bg-gray-50 px-6 py-4 font-medium">営業時間</td>
                    <td className="px-6 py-4">
                      9:00〜18:00（土日祝日を除く）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">企業理念</h2>
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6 text-accent">価値を継ぐ、日本を継ぐ。</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              私たちは、企業の価値を次世代へと繋ぐことで、
              日本経済の持続的な発展に貢献します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <h4 className="font-bold mb-3">信頼</h4>
                <p className="text-gray-600">
                  お客様との信頼関係を第一に、
                  誠実で透明性の高いサービスを提供します。
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-3">専門性</h4>
                <p className="text-gray-600">
                  55年の経験と実績に基づく
                  高度な専門知識でサポートします。
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-3">継続</h4>
                <p className="text-gray-600">
                  企業の価値と伝統を守りながら、
                  新たな成長機会を創出します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">沿革</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-right font-medium">1969年</div>
                <div className="flex-grow">会社設立</div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-right font-medium">1980年</div>
                <div className="flex-grow">M&A仲介事業を本格開始</div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-right font-medium">1995年</div>
                <div className="flex-grow">大阪本社を現在地に移転</div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-right font-medium">2000年</div>
                <div className="flex-grow">事業承継コンサルティング部門設立</div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-right font-medium">2010年</div>
                <div className="flex-grow">全国ネットワーク構築完了</div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 text-right font-medium">2024年</div>
                <div className="flex-grow">創業55周年</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">M&Aのご相談はお気軽に</h2>
          <p className="text-xl mb-8">
            55年の信頼と実績で、貴社のM&Aを成功に導きます。
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-accent px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            お問い合わせはこちら
          </a>
        </div>
      </section>
    </div>
  )
}