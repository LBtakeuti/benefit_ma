/** @type {import('next').NextConfig} */
const nextConfig = {
  // セキュリティヘッダー
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },

  // 画像の最適化設定
  images: {
    domains: process.env.ALLOWED_IMAGE_DOMAINS 
      ? process.env.ALLOWED_IMAGE_DOMAINS.split(',') 
      : ['images.unsplash.com', 'localhost'],
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma', 'bcryptjs']
  },

  // Webpack設定の最適化
  webpack: (config, { dev, isServer }) => {
    // 本番環境でのソースマップを無効化
    if (!isServer && process.env.NODE_ENV === 'production') {
      config.devtool = false
    }
    
    return config
  },

  // 本番環境での最適化
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,

  // 環境変数の型安全性
  env: {
    NEXT_PUBLIC_ADMIN_ENABLED: process.env.NEXT_PUBLIC_ADMIN_ENABLED,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  // Vercel向けの最適化
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma', 'bcryptjs'],
    // ISRメモリキャッシュの設定
    isrMemoryCacheSize: 0,
  },
}

module.exports = nextConfig