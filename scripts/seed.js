const { PrismaClient } = require('../app/generated/prisma')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: '管理者'
    }
  })
  
  console.log('初期ユーザーを作成しました:', user)
  
  // サンプルニュースを作成
  const sampleNews = [
    {
      title: '事業承継セミナー開催のお知らせ',
      content: '中小企業経営者向けの事業承継セミナーを開催いたします。専門家による講演やワークショップを通じて、事業承継の成功ポイントを学びます。',
      category: 'その他',
      slug: 'seminar-announcement-' + Date.now(),
      authorId: user.id
    },
    {
      title: '製造業のM&A成約事例',
      content: '大阪府内の製造業において、事業承継型M&Aが成約しました。従業員の雇用を維持しながら、新たな成長戦略を実現します。',
      category: '基礎知識',
      slug: 'ma-case-study-' + Date.now(),
      authorId: user.id
    },
    {
      title: 'M&Aにおけるデューデリジェンスとは',
      content: 'M&Aを成功させるために重要なデューデリジェンスについて解説します。財務、法務、ビジネスの各観点から詳しく説明します。',
      category: 'M&A用語集',
      slug: 'due-diligence-' + Date.now(),
      authorId: user.id
    }
  ]
  
  for (const news of sampleNews) {
    await prisma.news.create({ data: news })
  }
  
  console.log('サンプルニュースを作成しました')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })