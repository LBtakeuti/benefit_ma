import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 一時的に管理画面への制限を完全に無効化
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}