import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 管理画面を環境変数で制御
  const adminEnabled = process.env.NEXT_PUBLIC_ADMIN_ENABLED === 'true'
  
  if (!adminEnabled && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}