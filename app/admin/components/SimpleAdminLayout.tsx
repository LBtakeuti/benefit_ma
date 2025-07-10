'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  HomeIcon, 
  NewspaperIcon, 
  PlusCircleIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function SimpleAdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // ログインページではレイアウトを表示しない
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const navigation = [
    { name: 'ダッシュボード', href: '/admin', icon: HomeIcon },
    { name: 'ニュース管理', href: '/admin/news', icon: NewspaperIcon },
    { name: '新規作成', href: '/admin/news/create', icon: PlusCircleIcon },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    // Clear auth cookie
    document.cookie = 'admin-auth=; path=/; max-age=0'
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* モバイルメニューボタン */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white shadow-sm px-4 py-3">
          <h1 className="text-xl font-semibold">管理画面</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div className="flex h-screen">
        {/* サイドバー */}
        <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block w-64 bg-white shadow-md`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 hidden lg:block">管理画面</h1>
          </div>
          
          <nav className="px-4 pb-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-0 w-64 p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="font-medium">ログアウト</span>
            </button>
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}