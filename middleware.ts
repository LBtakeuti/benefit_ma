import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public routes that don't require authentication
const publicRoutes = ['/admin/login', '/api/auth/login', '/api/auth/refresh', '/api/auth/csrf', '/api/auth/check']

// API routes that require authentication
const protectedApiRoutes = [
  '/api/news',
  '/api/categories',
  '/api/auth/logout'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if admin is enabled
  const adminEnabled = process.env.NEXT_PUBLIC_ADMIN_ENABLED === 'true'
  
  if (!adminEnabled && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Check if the route is an admin route
  const isAdminRoute = pathname.startsWith('/admin')
  const isProtectedApiRoute = protectedApiRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.includes(pathname)

  // Skip middleware for non-admin routes
  if (!isAdminRoute && !isProtectedApiRoute) {
    return NextResponse.next()
  }

  // Allow public routes
  if (isPublicRoute) {
    // If user is already authenticated and tries to access login, redirect to admin
    const token = request.cookies.get('auth-token')?.value
    if (token && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  // Check for auth token
  const token = request.cookies.get('auth-token')?.value

  if (!token) {
    // For API routes, return 401
    if (isProtectedApiRoute) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    // For admin routes, redirect to login
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('returnUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Pass the token to the request headers for verification in API routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-auth-token', token)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'
  ],
}