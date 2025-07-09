/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma', 'bcryptjs']
  },
  // Force clean build to remove contentful cache
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      // Exclude contentful from server build
      config.externals = config.externals || []
      config.externals.push('contentful')
    }
    return config
  }
}

module.exports = nextConfig