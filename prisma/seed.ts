import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Create default user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: '$2a$10$XtW2.ciO8Wi5V9N9aWPPNOvOelMZn7vAMf2zQ4/m9WXvj7vQSepuG', // BenefitMA2024!@#
      name: 'Admin User',
      role: 'admin'
    }
  })

  // Create categories
  const categories = [
    { name: 'すべて', slug: 'all', order: 0 },
    { name: 'その他', slug: 'others', order: 1 },
    { name: 'M&A用語集', slug: 'ma-glossary', order: 2 },
    { name: '基礎知識', slug: 'basic-knowledge', order: 3 }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  // Get the "その他" category for default news
  const othersCategory = await prisma.category.findUnique({
    where: { slug: 'others' }
  })

  if (othersCategory) {
    // Create sample news items
    const newsItems = [
      {
        title: 'M&A市場の最新動向',
        content: 'M&A市場は活発な動きを見せており、特にテクノロジー分野での統合が進んでいます。',
        slug: 'ma-market-latest-trends',
        published: true,
        publishedAt: new Date('2024-01-15'),
        authorId: admin.id,
        categoryId: othersCategory.id
      },
      {
        title: 'デューデリジェンスの重要性',
        content: 'M&Aを成功させるためには、適切なデューデリジェンスの実施が不可欠です。',
        slug: 'importance-of-due-diligence',
        published: true,
        publishedAt: new Date('2024-01-10'),
        authorId: admin.id,
        categoryId: othersCategory.id
      },
      {
        title: 'バリュエーションの基礎',
        content: '企業価値評価（バリュエーション）は、M&Aにおいて最も重要なプロセスの一つです。',
        slug: 'basics-of-valuation',
        published: true,
        publishedAt: new Date('2024-01-05'),
        authorId: admin.id,
        categoryId: othersCategory.id
      }
    ]

    for (const newsItem of newsItems) {
      await prisma.news.upsert({
        where: { slug: newsItem.slug },
        update: {},
        create: newsItem
      })
    }
  }

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })