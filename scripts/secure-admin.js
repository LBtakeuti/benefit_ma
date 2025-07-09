// 本番環境用の強固なパスワードに変更するスクリプト
const { PrismaClient } = require('../app/generated/prisma')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function secureAdmin() {
  // より強固なパスワード（本番環境用）
  const strongPassword = 'BenefitMA2024!@#$'
  const hashedPassword = await bcrypt.hash(strongPassword, 12)
  
  try {
    // 既存のadminユーザーを更新
    const user = await prisma.user.update({
      where: { email: 'admin@example.com' },
      data: { 
        password: hashedPassword,
        name: 'BMAC Administrator'
      }
    })
    
    console.log('管理者パスワードを更新しました')
    console.log('メール: admin@example.com')
    console.log('新しいパスワード: BenefitMA2024!@#$')
  } catch (error) {
    console.error('エラー:', error)
  } finally {
    await prisma.$disconnect()
  }
}

secureAdmin()