import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/app/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // 入力値の検証
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // シンプルなハードコード認証
    if (email === 'admin@example.com' && password === 'BenefitMA2024!@#$') {
      const token = generateToken(1)
      
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}