# Vercel デプロイガイド

## 重要：Contentfulエラーの解決

このプロジェクトからContentfulを完全に削除しました。Vercelでビルドエラーが発生する場合は、以下の手順で対応してください。

## 解決手順

### 1. Vercelキャッシュのクリア
- Vercelダッシュボードで該当プロジェクトに移動
- Settings → Functions → Edge Cache → "Clear Cache"をクリック
- Settings → Git → "Redeploy"をクリック

### 2. 環境変数の設定
以下の環境変数をVercelに設定：
```
ADMIN_JWT_SECRET=bmac-production-secret-key-2024
NEXT_PUBLIC_ADMIN_ENABLED=true
```

### 3. ビルドコマンドの確認
ビルドコマンドが以下になっていることを確認：
```
npm run clean && npm run build
```

### 4. 強制リビルド
- 新しいコミットをプッシュして強制的に新しいビルドを実行

## 認証情報
- Email: admin@example.com  
- Password: BenefitMA2024!@#$

## トラブルシューティング
- Contentful関連エラーが発生する場合：キャッシュクリア後に再デプロイ
- ログインできない場合：環境変数の確認
- ビルドエラー：vercel.jsonの設定を確認