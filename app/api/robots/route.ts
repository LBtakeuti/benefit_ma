import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `# Benefit M&A Consulting robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Sitemap
Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/sitemap.xml
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}