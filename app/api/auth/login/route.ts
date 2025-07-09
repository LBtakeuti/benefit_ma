import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/app/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // リクエストボディの解析
    let requestBody
    try {
      requestBody = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      )
    }

    const { email, password } = requestBody

    // 入力値の検証
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // ファイルベースCMSでは簡単なハードコード認証のみ
    if (email === 'admin@example.com' && password === 'BenefitMA2024!@#$') {
      let token
      try {
        token = generateToken(1) // デモ用のユーザーID
      } catch (tokenError) {
        console.error('Token generation failed:', tokenError)
        return NextResponse.json(
          { error: 'Authentication service error' },
          { status: 500 }
        )
      }
      
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
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}