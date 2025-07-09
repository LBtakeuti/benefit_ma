# Contentfulセットアップガイド

## 1. Contentfulアカウントの作成

1. [Contentful](https://www.contentful.com/)にアクセス
2. 無料アカウントを作成（クレジットカード不要）
3. 新しいSpaceを作成

## 2. コンテンツモデルの作成

### Newsコンテンツタイプの作成

1. Content Model → Add content typeをクリック
2. 以下の設定で作成：
   - Name: `News`
   - Api Identifier: `news`

### フィールドの追加

以下のフィールドを追加してください：

1. **Title（タイトル）**
   - Field ID: `title`
   - Type: Short text
   - Required: Yes

2. **Content（内容）**
   - Field ID: `content`
   - Type: Long text
   - Required: Yes

3. **Category（カテゴリ）**
   - Field ID: `category`
   - Type: Short text
   - Required: Yes
   - Validation: Accept only specified values
     - その他
     - M&A用語集
     - 基礎知識

4. **Thumbnail（サムネイル）**
   - Field ID: `thumbnail`
   - Type: Media
   - Required: No
   - Accept only images

5. **Published At（公開日）**
   - Field ID: `publishedAt`
   - Type: Date & time
   - Required: Yes

## 3. APIキーの取得

1. Settings → API keys
2. 「Add API key」をクリック
3. 以下の情報をコピー：
   - Space ID
   - Content Delivery API - access token

## 4. 環境変数の設定

`.env.local`ファイルを作成し、以下を設定：

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
```

## 5. コンテンツの作成

1. Content → Add entry → News
2. 各フィールドに情報を入力
3. Publishをクリック

## 6. 使い方

### Contentfulが設定されている場合
- 自動的にContentfulからデータを取得

### Contentfulが設定されていない場合
- `data/news.json`から静的データを表示

## メリット

- **管理画面不要**: Contentfulの管理画面で更新
- **画像管理**: 自動的に最適化
- **多言語対応**: 将来的に可能
- **バージョン管理**: 変更履歴を保持
- **プレビュー機能**: 公開前の確認が可能

## 料金

- **無料プラン**
  - 2ユーザーまで
  - 25,000レコードまで
  - 48言語まで
  - 2つのロケールまで
  - 十分な容量（小規模サイトには十分）