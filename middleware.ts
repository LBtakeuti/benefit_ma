import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 管理画面へのアクセスを制御
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Vercelでは環境変数をヘッダーから取得
    const adminEnabled = request.headers.get('x-admin-enabled') || 'true'
    
    // 本番環境でのみ制限（開発環境では常に許可）
    if (process.env.NODE_ENV === 'production' && adminEnabled === 'false') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}