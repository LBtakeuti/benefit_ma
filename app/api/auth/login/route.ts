import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { verifyPassword, generateToken, hashPassword } from '@/app/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // 本番環境でのデモ用ログイン
    if (process.env.NODE_ENV === 'production') {
      // ハードコードされた認証情報でのみログイン可能
      if (email === 'admin@example.com' && password === 'BenefitMA2024!@#$') {
        const token = generateToken(1) // デモ用のユーザーID
        
        return NextResponse.json({
          token,
          user: {
            id: 1,
            email: 'admin@example.com',
            name: 'BMAC Administrator'
          }
        })
      } else {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }
    }

    // 開発環境では通常のデータベース認証
    let user = await prisma.user.findUnique({
      where: { email }
    })

    // ユーザーが存在しない場合は作成（開発環境のみ）
    if (!user && email === 'admin@example.com') {
      const hashedPassword = await hashPassword('BenefitMA2024!@#$')
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: 'BMAC Administrator'
        }
      })
    }

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = generateToken(user.id)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}