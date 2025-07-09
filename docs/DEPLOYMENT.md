# 本番環境デプロイ手順書

## 目次
1. [事前準備](#事前準備)
2. [Vercel プロジェクト設定](#vercel-プロジェクト設定)
3. [データベース設定](#データベース設定)
4. [環境変数設定](#環境変数設定)
5. [デプロイ実行](#デプロイ実行)
6. [デプロイ後の確認](#デプロイ後の確認)
7. [トラブルシューティング](#トラブルシューティング)
8. [ロールバック手順](#ロールバック手順)

## 事前準備

### 1. 必要なアカウント
- [ ] Vercel アカウント
- [ ] GitHub アカウント
- [ ] データベースプロバイダーアカウント（Vercel Postgres / Supabase / PlanetScale）

### 2. ローカル環境の確認
```bash
# Node.jsバージョン確認（18.x以上推奨）
node --version

# 依存関係のインストール
npm install

# ビルドテスト
npm run build

# 型チェック
npx tsc --noEmit
```

### 3. セキュリティキーの生成
```bash
# JWT Secret の生成
openssl rand -base64 32

# CSRF Secret の生成
openssl rand -base64 32
```

## Vercel プロジェクト設定

### 1. Vercelプロジェクトの作成
1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. "New Project" をクリック
3. GitHubリポジトリを選択
4. プロジェクト名を設定

### 2. ビルド設定
Vercelのプロジェクト設定で以下を確認：
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## データベース設定

### オプション1: Vercel Postgres
1. Vercel Dashboard → Storage → Create Database
2. Postgres を選択
3. データベース名を設定
4. 接続情報をコピー

### オプション2: Supabase
1. [Supabase](https://supabase.com) でプロジェクト作成
2. Settings → Database から接続情報を取得
3. Connection string と Direct URL をコピー

### オプション3: PlanetScale
1. [PlanetScale](https://planetscale.com) でデータベース作成
2. Connect → Create password
3. Prisma 用の接続情報を選択

## 環境変数設定

### Vercel Dashboard での設定
Project Settings → Environment Variables で以下を設定：

#### 基本設定
```
NEXT_PUBLIC_ADMIN_ENABLED=true
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

#### データベース設定
```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
DIRECT_URL=postgresql://username:password@host:port/database?sslmode=require
```

#### 認証設定（生成した値を使用）
```
JWT_SECRET=your-generated-jwt-secret
CSRF_SECRET=your-generated-csrf-secret
SESSION_LIFETIME=604800
```

#### 管理者設定
```
ADMIN_EMAIL=admin@your-domain.com
ADMIN_PASSWORD=your-secure-password
```

### 環境変数の適用範囲
- Production: すべての環境変数を設定
- Preview: DATABASE_URL以外を設定（別のDBを使用推奨）
- Development: ローカルの.env.localを使用

## デプロイ実行

### 1. 初回デプロイ
```bash
# main ブランチにプッシュ
git add .
git commit -m "feat: prepare for production deployment"
git push origin main
```

### 2. データベースマイグレーション
Vercelのデプロイ完了後：
```bash
# Vercel CLIを使用
vercel env pull .env.production.local

# マイグレーション実行
npx prisma generate
npx prisma migrate deploy

# 初期データ投入
npx tsx scripts/init-production-db.ts
```

### 3. デプロイ状況の確認
- Vercel Dashboard でビルドログを確認
- エラーがないことを確認
- プレビューURLでアクセステスト

## デプロイ後の確認

### 1. 基本動作確認チェックリスト
- [ ] トップページが正常に表示される
- [ ] 管理画面ログインページ（/admin/login）にアクセスできる
- [ ] HTTPSが有効になっている
- [ ] セキュリティヘッダーが適用されている

### 2. 管理画面機能確認
- [ ] ログイン機能が動作する
- [ ] ニュース一覧が表示される
- [ ] ニュースの作成・編集・削除ができる
- [ ] 画像アップロードが機能する
- [ ] ログアウトが正常に動作する

### 3. セキュリティ確認
```bash
# セキュリティヘッダーの確認
curl -I https://your-domain.com

# robots.txtの確認
curl https://your-domain.com/robots.txt
```

### 4. パフォーマンス確認
- [ ] Lighthouse スコアの確認
- [ ] Core Web Vitals の測定
- [ ] 画像の最適化が機能している

## トラブルシューティング

### よくある問題と解決方法

#### 1. ビルドエラー
```
Error: Cannot find module '@prisma/client'
```
**解決方法**: 
```json
// package.json に追加
"postinstall": "prisma generate"
```

#### 2. データベース接続エラー
```
Error: Can't reach database server
```
**解決方法**:
- DATABASE_URL が正しいか確認
- SSL設定（?sslmode=require）を確認
- IPホワイトリストを確認

#### 3. 認証エラー
```
Error: Invalid token
```
**解決方法**:
- JWT_SECRET が本番環境で設定されているか確認
- Cookieのドメイン設定を確認

#### 4. 500 Internal Server Error
**確認事項**:
- Vercel Functions のログを確認
- 環境変数がすべて設定されているか確認
- データベースが初期化されているか確認

## ロールバック手順

### 1. Vercel Dashboard からのロールバック
1. Deployments タブを開く
2. 安定していた以前のデプロイメントを選択
3. "..." メニューから "Promote to Production" を選択

### 2. Git を使用したロールバック
```bash
# 以前のコミットを確認
git log --oneline

# 特定のコミットにロールバック
git revert HEAD
git push origin main

# または特定のコミットまで戻る
git reset --hard <commit-hash>
git push --force origin main
```

### 3. データベースのロールバック
```bash
# マイグレーション履歴を確認
npx prisma migrate status

# 特定のマイグレーションまで戻る
npx prisma migrate resolve --rolled-back <migration-name>
```

## セキュリティチェックリスト

### デプロイ前
- [ ] すべての環境変数が本番用の値に更新されている
- [ ] デフォルトパスワードが変更されている
- [ ] 不要なconsole.logが削除されている
- [ ] 開発用のコードが削除されている

### デプロイ後
- [ ] 管理画面が認証なしでアクセスできないことを確認
- [ ] APIエンドポイントが保護されていることを確認
- [ ] エラーメッセージに機密情報が含まれていないことを確認
- [ ] CSPヘッダーが正しく設定されていることを確認

## 監視とメンテナンス

### 1. ログ監視
- Vercel Dashboard → Functions → Logs
- エラーログを定期的に確認
- パフォーマンスメトリクスを監視

### 2. 定期メンテナンス
- [ ] 月次: セキュリティアップデートの確認
- [ ] 月次: データベースバックアップ
- [ ] 四半期: 依存関係の更新
- [ ] 四半期: パフォーマンス最適化

### 3. 緊急時の連絡先
- Vercel サポート: support@vercel.com
- データベースプロバイダーのサポート
- 開発チームの緊急連絡先

## まとめ

本番環境へのデプロイは慎重に行い、各ステップで確認を行ってください。問題が発生した場合は、速やかにロールバック手順を実行し、原因を調査してから再デプロイを行ってください。