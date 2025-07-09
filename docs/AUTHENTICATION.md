# 認証システムドキュメント

## 概要

このプロジェクトの管理画面は、JWT（JSON Web Token）を使用したセキュアな認証システムを実装しています。

## 技術スタック

- **Next.js Middleware**: ルートレベルでのアクセス制御
- **JWT**: セキュアなトークンベース認証
- **HTTP-only Cookies**: XSS攻撃から保護
- **CSRF Protection**: クロスサイトリクエストフォージェリ対策
- **Prisma + SQLite**: ユーザーデータの永続化

## セキュリティ機能

### 1. パスワードハッシュ化
- bcryptを使用した安全なパスワードハッシュ化
- ソルトラウンド: 10

### 2. JWT トークン
- 有効期限: 7日間
- HTTP-only Cookieに保存（XSS対策）
- 自動更新機能（期限1時間前に更新）

### 3. CSRF保護
- ランダムな32バイトのCSRFトークン
- JavaScriptから読み取り可能なCookieに保存
- APIリクエスト時にヘッダーで検証

### 4. セッション管理
- サーバーサイドでのセッション検証
- 無効なトークンの自動削除
- ログアウト時のクッキー削除

## 環境変数

```env
# JWT署名用の秘密鍵（本番環境では必ず変更してください）
JWT_SECRET=your-very-secure-jwt-secret-key-change-this-in-production

# CSRF保護用の秘密鍵
CSRF_SECRET=your-csrf-secret-key-change-this-in-production

# セッション有効期限（秒）
SESSION_LIFETIME=604800 # 7日間
```

## API エンドポイント

### 認証関連

- `POST /api/auth/login` - ログイン
- `POST /api/auth/logout` - ログアウト
- `POST /api/auth/refresh` - トークン更新
- `GET /api/auth/check` - 認証状態確認
- `GET /api/auth/csrf` - CSRFトークン取得

### 保護されたエンドポイント

- `/api/news/*` - ニュース管理API
- `/api/categories/*` - カテゴリ管理API
- `/admin/*` - 管理画面のすべてのルート

## 実装の詳細

### Middleware（`/middleware.ts`）

```typescript
// 認証が必要なルートの定義
const protectedRoutes = ['/admin/*', '/api/news/*', '/api/categories/*']

// 公開ルート（認証不要）
const publicRoutes = ['/admin/login', '/api/auth/login']
```

### ログインフロー

1. ユーザーがメールアドレスとパスワードを入力
2. CSRFトークンを取得（必要に応じて）
3. `/api/auth/login`にPOSTリクエスト
4. サーバーがパスワードを検証
5. 成功時:
   - JWTトークンをHTTP-only Cookieに設定
   - CSRFトークンを通常のCookieに設定
   - ユーザー情報を返却
6. クライアントが管理画面にリダイレクト

### 認証チェックフロー

1. Middlewareがリクエストをインターセプト
2. `auth-token` Cookieの存在を確認
3. トークンが存在しない場合:
   - APIルート: 401エラーを返却
   - 管理画面: ログインページにリダイレクト
4. トークンが存在する場合:
   - ヘッダーにトークンを追加
   - リクエストを通過

### ログアウトフロー

1. `/api/auth/logout`にPOSTリクエスト
2. すべての認証関連Cookieを削除
3. ログインページにリダイレクト

## セキュリティのベストプラクティス

1. **環境変数の管理**
   - 本番環境では強力なJWT_SECRETを使用
   - 環境変数は`.env.local`に保存（Gitにコミットしない）

2. **HTTPS の使用**
   - 本番環境では必ずHTTPSを使用
   - CookieのSecureフラグが有効化される

3. **定期的なトークン更新**
   - トークンの有効期限が近づくと自動更新
   - 長期間のセッションでもセキュリティを維持

4. **エラーハンドリング**
   - 認証エラーの詳細を露出しない
   - 一般的なエラーメッセージを使用

## トラブルシューティング

### ログインできない場合

1. データベースにユーザーが存在するか確認
2. パスワードが正しいか確認
3. 環境変数が正しく設定されているか確認

### 認証が維持されない場合

1. Cookieが正しく設定されているか確認
2. JWT_SECRETが一貫しているか確認
3. Middlewareが正しく動作しているか確認

### CSRFエラーが発生する場合

1. CSRFトークンが正しく送信されているか確認
2. Cookieが有効になっているか確認
3. 同一オリジンからのリクエストか確認

## デフォルトの管理者アカウント

開発環境用のデフォルトアカウント:
- Email: `admin@example.com`
- Password: `BenefitMA2024!@#`

**注意**: 本番環境では必ず変更してください。