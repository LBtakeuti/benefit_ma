'use client'

import { useState } from 'react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqCategories = [
    {
      category: "M&Aの基本について",
      questions: [
        {
          q: "M&Aとは何ですか？",
          a: "M&A（Mergers and Acquisitions）とは、企業の合併・買収を指します。事業承継、事業拡大、経営資源の有効活用などを目的として行われる経営戦略の一つです。"
        },
        {
          q: "M&Aのメリットは何ですか？",
          a: "売り手側には後継者問題の解決、創業者利益の確保、事業の継続などのメリットがあります。買い手側には事業拡大、シナジー効果、新規参入の時間短縮などのメリットがあります。"
        },
        {
          q: "M&Aにはどのような手法がありますか？",
          a: "株式譲渡、事業譲渡、会社分割、合併など様々な手法があります。それぞれの企業の状況や目的に応じて、最適な手法を選択します。"
        }
      ]
    },
    {
      category: "費用・報酬について",
      questions: [
        {
          q: "相談は無料ですか？",
          a: "はい、初回のご相談は完全無料です。お気軽にお問い合わせください。"
        },
        {
          q: "成功報酬制とは何ですか？",
          a: "成約が成立するまで一切費用をいただかない料金体系です。着手金や月額費用は不要で、M&Aが成立した場合のみ報酬をいただきます。"
        },
        {
          q: "成功報酬の金額はどのように決まりますか？",
          a: "譲渡金額に応じたレーマン方式により算出されます。詳細な料金体系については、お問い合わせください。"
        }
      ]
    },
    {
      category: "M&Aの流れについて",
      questions: [
        {
          q: "M&A成約までの期間はどのくらいですか？",
          a: "案件により異なりますが、通常3〜6ヶ月程度です。スムーズな案件では2〜3ヶ月、複雑な案件では1年以上かかる場合もあります。"
        },
        {
          q: "M&Aの基本的な流れを教えてください。",
          a: "1.初回相談、2.企業評価・査定、3.買い手候補の探索、4.基本合意、5.デューデリジェンス（買収監査）、6.最終契約・クロージング、という流れが一般的です。"
        },
        {
          q: "秘密保持はどのように行われますか？",
          a: "秘密保持契約（NDA）を締結し、情報管理を徹底しています。買い手候補への情報開示も段階的に行い、必要最小限の情報のみを提供します。"
        }
      ]
    },
    {
      category: "対象企業について",
      questions: [
        {
          q: "どのような企業が対象ですか？",
          a: "業種・規模を問わず、幅広い企業様のM&Aをサポートしています。年商1億円未満の小規模企業から大企業まで対応可能です。"
        },
        {
          q: "赤字企業でもM&Aは可能ですか？",
          a: "はい、可能です。技術力、顧客基盤、立地条件など、財務面以外の強みがあれば買い手が見つかる可能性があります。"
        },
        {
          q: "地方の企業でも対応可能ですか？",
          a: "はい、日本全国対応しています。オンラインでの相談も可能ですので、地域を問わずご相談ください。"
        }
      ]
    },
    {
      category: "その他",
      questions: [
        {
          q: "従業員の雇用は守られますか？",
          a: "多くの場合、従業員の雇用維持は買い手企業にとってもメリットがあるため、雇用は継続されます。ただし、個別の条件については交渉により決定されます。"
        },
        {
          q: "M&A後も経営に関わることは可能ですか？",
          a: "はい、可能です。顧問や相談役として残る、一定期間は代表として継続するなど、様々な形で関わることができます。"
        },
        {
          q: "どのタイミングで相談すべきですか？",
          a: "M&Aを検討し始めたタイミングでご相談ください。早めのご相談により、より良い条件での成約が期待できます。"
        }
      ]
    }
  ]

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const index = categoryIndex * 10 + questionIndex
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">よくある質問</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            M&Aに関してよくいただくご質問をまとめました。
            こちらにない質問については、お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const isOpen = openIndex === categoryIndex * 10 + questionIndex
                  return (
                    <div key={questionIndex} className="bg-white border border-gray-200">
                      <button
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                      >
                        <span className="font-medium pr-4">{item.q}</span>
                        <span className="flex-shrink-0 text-2xl text-gray-400">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-700 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">ご不明な点はお気軽にお問い合わせください</h2>
          <p className="text-xl mb-8">
            M&Aに関するご相談は無料です。<br />
            経験豊富な専門家が丁寧にお答えいたします。
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