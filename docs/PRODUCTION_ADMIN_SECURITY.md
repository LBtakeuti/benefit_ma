# 本番環境での管理画面セキュリティ設定

## 1. より強固なパスワードに変更

```javascript
// scripts/change-admin-password.js
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('../app/generated/prisma')

const prisma = new PrismaClient()

async function changePassword() {
  const newPassword = process.env.NEW_ADMIN_PASSWORD || 'your-super-strong-password-here'
  const hashedPassword = await bcrypt.hash(newPassword, 12)
  
  await prisma.user.update({
    where: { email: 'admin@example.com' },
    data: { password: hashedPassword }
  })
  
  console.log('Password updated successfully')
}

changePassword()
```

## 2. IP制限（Vercel Edge Functionsを使用）

```typescript
// middleware.ts に追加
const ALLOWED_IPS = process.env.ADMIN_ALLOWED_IPS?.split(',') || []

if (request.nextUrl.pathname.startsWith('/admin')) {
  const ip = request.headers.get('x-forwarded-for') || request.ip
  
  if (ALLOWED_IPS.length > 0 && !ALLOWED_IPS.includes(ip)) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
```

## 3. 2段階認証の実装

追加のセキュリティレイヤーとして、OTPやメール認証を実装することを推奨します。

## 4. アクセスログの記録

管理画面へのアクセスをログに記録し、不正アクセスを監視します。

## 5. 定期的なパスワード変更

最低でも月1回はパスワードを変更することを推奨します。