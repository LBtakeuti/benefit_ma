# ContentfulのSpace IDとAccess Token取得方法

## 1. Contentfulにログイン
1. [Contentful](https://app.contentful.com/)にアクセス
2. アカウントでログイン

## 2. Spaceの作成（初回のみ）

### 新規Spaceを作成する場合：
1. ダッシュボードで「Create space」をクリック
2. 「Create an empty space」を選択
3. Space名を入力（例：「BMAC Website」）
4. 「Create space」をクリック

## 3. Space IDの取得

### 方法1：URLから確認
1. Spaceを開いた状態でURLを確認
   ```
   https://app.contentful.com/spaces/[ここがSpace ID]/home
   ```

### 方法2：設定から確認
1. 左メニューの「Settings」をクリック
2. 「General settings」を選択
3. 「Space ID」の欄に表示されている文字列をコピー

## 4. Access Tokenの取得

### Content Delivery API token（読み取り専用）の取得：

1. **Settingsメニューへ**
   - 左メニューの「Settings」をクリック
   - 「API keys」を選択

2. **新しいAPIキーを作成**
   - 「Add API key」ボタンをクリック
   - 名前を入力（例：「Production」）

3. **トークンをコピー**
   - 作成されたAPIキーをクリック
   - 「Content Delivery API - access token」の欄の文字列をコピー
   - これがあなたのAccess Tokenです

## 5. 環境変数に設定

取得した値を`.env.local`に設定：

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=abc123xyz789
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=1234567890abcdefghijklmnopqrstuvwxyz
```

### 例：
- **Space ID**: `abc123xyz789`（12文字程度の英数字）
- **Access Token**: `1234567890abcdefghijklmnopqrstuvwxyz`（長い英数字の文字列）

## 6. 重要な注意事項

### セキュリティについて：
- Access Tokenは**読み取り専用**を使用（Content Delivery API）
- Management API tokenは使用しない（書き込み権限があるため）
- `.env.local`はGitにコミットしない（.gitignoreに含まれています）

### トークンの種類：
1. **Content Delivery API token**（推奨）
   - 公開されたコンテンツの読み取りのみ
   - フロントエンドで安全に使用可能

2. **Content Preview API token**
   - 下書きコンテンツも読み取り可能
   - 開発環境でのプレビュー用

3. **Content Management API token**
   - 読み書き両方可能
   - サーバーサイドでのみ使用
   - フロントエンドでは絶対に使用しない

## 7. 確認方法

設定が正しいか確認：

```bash
# 開発サーバーを再起動
npm run dev

# ブラウザのコンソールでエラーがないか確認
# Network タブで /api/news/contentful へのリクエストが成功しているか確認
```

## トラブルシューティング

### よくあるエラー：

1. **401 Unauthorized**
   - Access Tokenが間違っている
   - トークンの前後にスペースが入っていないか確認

2. **404 Not Found**
   - Space IDが間違っている
   - Contentモデル（news）が作成されていない

3. **環境変数が読み込まれない**
   - `.env.local`ファイルの場所が正しいか確認（プロジェクトルート）
   - 開発サーバーを再起動する
   - `NEXT_PUBLIC_`プレフィックスが付いているか確認