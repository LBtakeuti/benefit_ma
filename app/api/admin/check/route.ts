import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    adminEnabled: process.env.NEXT_PUBLIC_ADMIN_ENABLED,
    nodeEnv: process.env.NODE_ENV,
    hasJwtSecret: !!process.env.ADMIN_JWT_SECRET,
    timestamp: new Date().toISOString()
  })
}