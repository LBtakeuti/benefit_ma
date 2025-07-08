import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">株式会社ベネフィットM&Aコンサルタンツ</h3>
            <p className="text-gray-300 mb-4">
              価値を継ぐ、日本を継ぐ。<br />
              M&A・事業承継のプロフェッショナル集団
            </p>
            <div className="space-y-2 text-gray-300">
              <p>〒541-0044</p>
              <p>大阪府大阪市中央区伏見町4-4-9</p>
              <p>淀屋橋東洋ビル3階</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">サービス</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
                  当社の特徴
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                  料金・報酬
                </Link>
              </li>
              <li>
                <Link href="/cases" className="text-gray-300 hover:text-white transition-colors">
                  譲渡案件
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-gray-300 hover:text-white transition-colors">
                  成約実績
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
            <div className="space-y-2">
              <p className="text-gray-300">
                TEL: <a href="tel:06-6786-8260" className="hover:text-white transition-colors">06-6786-8260</a>
              </p>
              <p className="text-gray-300">
                FAX: 06-6786-8261
              </p>
              <p className="text-gray-300">
                営業時間: 9:00〜18:00<br />
                (土日祝日を除く)
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block mt-4 bg-accent text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
            >
              お問い合わせフォーム
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 株式会社ベネフィットM&Aコンサルタンツ All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer