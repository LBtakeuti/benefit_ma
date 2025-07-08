'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // フォーム送信処理
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">お問い合わせ</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            M&A・事業承継に関するご相談は、お電話またはお問い合わせフォームから承っております。
            お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="text-2xl font-bold mb-6">お問い合わせフォーム</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                        会社名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        電話番号 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
                      お問い合わせ種別 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="">選択してください</option>
                      <option value="売却相談">事業・会社の売却相談</option>
                      <option value="買収相談">事業・会社の買収相談</option>
                      <option value="事業承継">事業承継のご相談</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      ※ お客様の個人情報は、当社のプライバシーポリシーに基づき適切に管理いたします。<br />
                      ※ お問い合わせ内容によっては、回答にお時間をいただく場合がございます。
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    送信する
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">お電話でのお問い合わせ</h3>
                <a href="tel:06-6786-8260" className="text-3xl font-bold text-accent hover:underline">
                  06-6786-8260
                </a>
                <p className="text-gray-600 mt-2">
                  営業時間: 9:00〜18:00<br />
                  (土日祝日を除く)
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">FAXでのお問い合わせ</h3>
                <p className="text-2xl font-bold">06-6786-8261</p>
                <p className="text-gray-600 mt-2">
                  24時間受付
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-xl font-bold mb-4">アクセス</h3>
                <div className="space-y-2 text-gray-600">
                  <p>〒541-0044</p>
                  <p>大阪府大阪市中央区伏見町4-4-9</p>
                  <p>淀屋橋東洋ビル3階</p>
                  <p className="pt-2">
                    最寄駅: 地下鉄御堂筋線「淀屋橋」駅
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">秘密厳守で対応いたします</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ご相談内容は秘密厳守で対応いたします。
            M&A・事業承継に関するお悩みをお持ちの方は、まずはお気軽にご相談ください。
          </p>
        </div>
      </section>
    </div>
  )
}