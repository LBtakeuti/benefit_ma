import Image from 'next/image'
import Link from 'next/link'
import NewsSection from '@/components/NewsSection'

export default function Home() {
  return (
    <>
      <section className="relative h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="ビジネスミーティング"
            fill
            className="object-cover scale-110 animate-scale-in"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white animate-fade-in text-shadow-luxury">
              価値を継ぐ、<br />
              日本を継ぐ。
            </h1>
            <p className="text-2xl mb-6 text-white animate-slide-up opacity-90" style={{animationDelay: '0.2s'}}>
              事業承継でお悩みのすべての経営者のために。
            </p>
            <p className="text-xl mb-12 text-gray-200 animate-slide-up" style={{animationDelay: '0.4s'}}>
              企業価値を最適化し、すべての関係者をWin-Winへ
            </p>
            <div className="animate-slide-up" style={{animationDelay: '0.6s'}}>
              <a href="/contact" className="gradient-luxury text-white px-12 py-6 rounded inline-block font-bold text-xl tracking-wider">
                完全成功報酬制でご相談承ります
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-shadow-luxury">私たちの使命</h2>
            <p className="text-xl text-gray-600">伝統と革新を融合し、企業価値を次世代へ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="bg-white p-8 border border-gray-200 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="text-primary text-6xl font-bold mb-4 opacity-20">01</div>
              <h3 className="font-bold mb-4 text-xl">ベネフィットM&Aとは</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                企業価値に関する「完全成功報酬制」を採用し、お客様の成功を第一に考えます
              </p>
              <Link href="/about" className="text-primary font-bold hover:text-orange-600 transition-all duration-300 flex items-center gap-2">
                詳細を見る <span className="text-2xl">→</span>
              </Link>
            </div>
            <div className="bg-white p-8 border border-gray-200 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-primary text-6xl font-bold mb-4 opacity-20">02</div>
              <h3 className="font-bold mb-4 text-xl">組織体制</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                相続対策から事業発展まで幅広くサポートする専門家集団
              </p>
              <Link href="/organization" className="text-primary font-bold hover:text-orange-600 transition-all duration-300 flex items-center gap-2">
                詳細を見る <span className="text-2xl">→</span>
              </Link>
            </div>
            <div className="bg-white p-8 border border-gray-200 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="text-primary text-6xl font-bold mb-4 opacity-20">03</div>
              <h3 className="font-bold mb-4 text-xl">創業55年の豊富な実績</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                累計5,500件の実績が物語る、確かな信頼と実力
              </p>
              <Link href="/results" className="text-primary font-bold hover:text-orange-600 transition-all duration-300 flex items-center gap-2">
                詳細を見る <span className="text-2xl">→</span>
              </Link>
            </div>
            <div className="bg-white p-8 border border-gray-200 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="text-primary text-6xl font-bold mb-4 opacity-20">04</div>
              <h3 className="font-bold mb-4 text-xl">「四方良し」M&Aを実現</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                日本経済の活性化と全ステークホルダーの幸福を追求
              </p>
              <Link href="/philosophy" className="text-primary font-bold hover:text-orange-600 transition-all duration-300 flex items-center gap-2">
                詳細を見る <span className="text-2xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">よくある質問</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b pb-6">
              <h3 className="font-bold mb-3">Q. M&Aの相談は無料ですか？</h3>
              <p className="text-gray-600">
                A. はい、初回のご相談は完全無料です。お気軽にお問い合わせください。
              </p>
            </div>
            <div className="border-b pb-6">
              <h3 className="font-bold mb-3">Q. どのような企業が対象ですか？</h3>
              <p className="text-gray-600">
                A. 業種・規模を問わず、幅広い企業様のM&A・事業承継をサポートしています。
              </p>
            </div>
            <div className="border-b pb-6">
              <h3 className="font-bold mb-3">Q. 成約までどのくらいかかりますか？</h3>
              <p className="text-gray-600">
                A. 案件により異なりますが、通常3〜6ヶ月程度での成約を目指しています。
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="inline-block border-2 border-accent text-accent px-6 py-2 rounded hover:bg-accent hover:text-white transition-colors"
            >
              よくある質問をもっと見る
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">無料相談実施中</h2>
          <p className="text-xl mb-8">
            M&A・事業承継に関するご相談は、<br />
            お電話またはお問い合わせフォームから承っております。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:06-6786-8260"
              className="bg-white text-accent px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              電話で相談する
            </a>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-accent transition-colors font-medium"
            >
              問い合わせフォームへ
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}