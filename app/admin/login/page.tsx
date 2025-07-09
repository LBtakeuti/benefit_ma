'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

// Validation schema
const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上である必要があります'),
  rememberMe: z.boolean().optional()
})

type LoginFormData = z.infer<typeof loginSchema>

// Function to get CSRF token from cookie
function getCSRFToken(): string | null {
  const matches = document.cookie.match(/csrf-token=([^;]+)/)
  return matches ? matches[1] : null
}

// Function to check if user is already authenticated
async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/check', {
      method: 'GET',
      credentials: 'include'
    })
    return response.ok
  } catch {
    return false
  }
}

export default function AdminLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)
  
  const returnUrl = searchParams.get('returnUrl') || '/admin'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await checkAuth()
      if (isAuthenticated) {
        router.push(returnUrl)
      }
      setIsCheckingAuth(false)
    }
    checkAuthentication()
  }, [router, returnUrl])

  // Focus on email field when component mounts
  useEffect(() => {
    if (!isCheckingAuth) {
      setFocus('email')
    }
  }, [setFocus, isCheckingAuth])

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null)
    setIsLoading(true)

    try {
      // Get CSRF token from cookie or generate request
      let csrfToken = getCSRFToken()
      
      // If no CSRF token, request one first
      if (!csrfToken) {
        const csrfResponse = await fetch('/api/auth/csrf', {
          method: 'GET',
          credentials: 'include'
        })
        if (csrfResponse.ok) {
          const csrfData = await csrfResponse.json()
          csrfToken = csrfData.csrfToken
        }
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || ''
        },
        credentials: 'include',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          csrfToken: csrfToken
        })
      })

      const responseData = await response.json()

      if (response.ok) {
        toast.success('ログインに成功しました')
        
        // Small delay to show success message
        setTimeout(() => {
          router.push(returnUrl)
        }, 500)
      } else {
        // Handle specific error types
        if (response.status === 401) {
          setApiError('メールアドレスまたはパスワードが正しくありません')
        } else if (response.status === 403) {
          setApiError('セキュリティエラーが発生しました。ページを更新してもう一度お試しください。')
        } else if (response.status === 429) {
          setApiError('ログイン試行回数が多すぎます。しばらくしてからもう一度お試しください。')
        } else {
          setApiError(responseData.error || 'ログインに失敗しました')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setApiError('ネットワークエラーが発生しました。インターネット接続を確認してください。')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading screen while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">B</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">管理画面にログイン</h2>
          <p className="mt-2 text-sm text-gray-600">
            アカウント情報を入力してください
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* API Error Display */}
            {apiError && (
              <div className="rounded-md bg-red-50 p-4 animate-fadeIn">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{apiError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors`}
                  placeholder="admin@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`appearance-none block w-full px-3 py-2 pr-10 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  {...register('rememberMe')}
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  ログイン状態を保持する
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  パスワードを忘れた場合
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isSubmitting || isLoading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                } transition-colors`}
              >
                {isSubmitting || isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    ログイン中...
                  </div>
                ) : (
                  'ログイン'
                )}
              </button>
            </div>
          </form>

          {/* Test Credentials */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="text-center text-sm text-gray-600 bg-gray-50 rounded-md p-3">
              <p className="font-medium text-gray-700 mb-1">テスト用認証情報</p>
              <p className="font-mono text-xs">Email: admin@example.com</p>
              <p className="font-mono text-xs">Password: BenefitMA2024!@#$</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            このページは暗号化されており、入力情報は安全に送信されます
          </p>
        </div>
      </div>
    </div>
  )
}