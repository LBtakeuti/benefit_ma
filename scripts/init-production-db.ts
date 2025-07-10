import { PrismaClient } from '../app/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Initializing production database...')

  try {
    // Create default admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!'
    
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    
    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword
      },
      create: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin'
      }
    })
    
    console.log('✅ Admin user created/updated:', admin.email)

    // Create default categories
    const categories = [
      { name: 'すべて', slug: 'all', order: 0 },
      { name: 'その他', slug: 'others', order: 1 },
      { name: 'M&A用語集', slug: 'ma-glossary', order: 2 },
      { name: '基礎知識', slug: 'basic-knowledge', order: 3 }
    ]

    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: { order: category.order },
        create: category
      })
    }
    
    console.log('✅ Categories created/updated')

    // Create initial news if none exists
    const newsCount = await prisma.news.count()
    
    if (newsCount === 0) {
      const othersCategory = await prisma.category.findUnique({
        where: { slug: 'others' }
      })

      if (othersCategory) {
        await prisma.news.create({
          data: {
            title: 'ウェブサイトがリニューアルされました',
            content: 'Benefit M&A Consultingのウェブサイトがリニューアルされました。新しい管理システムにより、より迅速な情報発信が可能になりました。',
            slug: 'website-renewal-' + Date.now(),
            published: true,
            publishedAt: new Date(),
            authorId: admin.id,
            categoryId: othersCategory.id
          }
        })
        
        console.log('✅ Initial news created')
      }
    }

    console.log('✨ Production database initialization completed!')
    console.log(`
⚠️  Important Security Notes:
1. Change the admin password immediately after first login
2. Use strong, unique passwords
3. Enable 2FA if available
4. Regularly review and update security settings
    `)

  } catch (error) {
    console.error('❌ Error initializing database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })