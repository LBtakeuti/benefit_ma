import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Clear auth cookies
  response.cookies.delete('auth-token')
  response.cookies.delete('csrf-token')
  
  return response
}