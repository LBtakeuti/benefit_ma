// 管理画面のアクセス制御
export function isAdminEnabled(): boolean {
  // 本番環境では追加の認証が必要
  if (process.env.NODE_ENV === 'production') {
    return (
      process.env.NEXT_PUBLIC_ADMIN_ENABLED === 'true' &&
      process.env.ADMIN_SECRET_KEY === process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY
    )
  }
  
  // 開発環境では常に有効
  return true
}

// IPアドレス制限（オプション）
export function isAllowedIP(ip: string): boolean {
  const allowedIPs = process.env.ADMIN_ALLOWED_IPS?.split(',') || []
  return allowedIPs.length === 0 || allowedIPs.includes(ip)
}