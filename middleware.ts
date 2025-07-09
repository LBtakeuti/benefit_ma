import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 管理画面へのアクセスを環境変数で制御
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminEnabled = process.env.NEXT_PUBLIC_ADMIN_ENABLED === 'true'
    
    // 管理画面が無効な場合はホームページにリダイレクト
    if (!adminEnabled) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}