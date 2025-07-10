import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-2024'

export interface SessionUser {
  id: number
  email: string
  name: string | null
  role: string
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
    
    // In a real app, you would fetch the user from the database here
    // For now, we'll use the Prisma client
    const { prisma } = await import('@/app/lib/db')
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    return user
  } catch (error) {
    return null
  }
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession()
  
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  return session
}