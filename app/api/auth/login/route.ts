import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/app/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // ファイルベースCMSでは簡単なハードコード認証のみ
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
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}