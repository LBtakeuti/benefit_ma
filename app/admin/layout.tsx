import { Metadata } from 'next'
import AdminLayout from './components/AdminLayout'
import { ToastProvider } from '@/app/components/ui/Toast'

export const metadata: Metadata = {
  title: 'BMAC 管理画面',
  description: 'Benefit M&A Consultingの管理画面',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      <ToastProvider />
    </>
  )
}