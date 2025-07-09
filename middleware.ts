import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './app/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if admin is enabled
  const adminEnabled = process.env.NEXT_PUBLIC_ADMIN_ENABLED === 'true'
  
  if (!adminEnabled && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Skip authentication check for login page and API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Check authentication for admin routes
  if (pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('auth-token')

    if (!authToken) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('returnUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Verify token
    const payload = verifyToken(authToken.value)
    if (!payload) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('returnUrl', pathname)
      
      // Clear invalid token
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete('auth-token')
      response.cookies.delete('csrf-token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}