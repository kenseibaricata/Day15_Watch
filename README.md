# React Clock Suite

ReactとTypeScriptで作られたシンプルな時計アプリケーションです。時計、アラーム、ストップウォッチの機能を備えています。

## 機能

- **時計**: 現在時刻を12時間表記（AM/PM）で表示します。秒単位でリアルタイム更新されます。
- **アラーム**: 指定時刻にアラーム音を鳴らして通知します。設定は自動的に保存されます。
- **ストップウォッチ**: 時間計測機能。スタート、ストップ、リセット操作が可能です。

## プロジェクトのセットアップ

### 必要条件

- Node.js (バージョン14以上推奨)
- npm または yarn

### インストール手順

1. リポジトリをクローン/ダウンロードします
   ```
   git clone https://github.com/yourusername/react-clock-suite.git
   cd react-clock-suite
   ```

2. 依存パッケージをインストールします
   ```
   npm install
   ```

3. 開発サーバーを起動します
   ```
   npm start
   ```
   ブラウザで `http://localhost:3000` にアクセスしてアプリケーションを確認できます。

4. プロダクションビルドを作成します
   ```
   npm run build
   ```
   生成されたファイルは `build` ディレクトリに保存されます。

## 技術スタック

- React
- TypeScript
- HTML5 / CSS3
- LocalStorage (アラーム設定の保存)

## デザイン

- 黒背景＋白文字のハイコントラストデザイン
- ロボットテイストのUIと「Orbitron」フォントを使用
- レスポンシブデザイン（スマートフォン・タブレット・デスクトップ対応）

## ブラウザサポート

- Chrome, Firefox, Safari, Edge (最新の2バージョン)
- Chrome for Android, Safari on iOS 