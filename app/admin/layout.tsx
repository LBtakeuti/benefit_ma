import { Metadata } from 'next'
import SimpleAdminLayout from './components/SimpleAdminLayout'
import { ToastProvider } from '@/app/components/ui/Toast'

export const metadata: Metadata = {
  title: '管理画面',
  description: '管理画面',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SimpleAdminLayout>{children}</SimpleAdminLayout>
      <ToastProvider />
    </>
  )
}