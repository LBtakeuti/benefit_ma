import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET() {
  try {
    // Generate CSRF token
    const csrfToken = crypto.randomBytes(32).toString('hex')
    
    const response = NextResponse.json({
      csrfToken: csrfToken
    })

    // Set CSRF token cookie (readable by JavaScript)
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    return response
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}