<div align="center">

# 🎙️ Discord Voice Manager

<p align="center">
  <b>Discordコミュニティ向けの自律型・一時的プライベートボイスチャンネル管理Bot。</b><br>
  <i>Zero-Command Plug & Play • 特権インテント不要 • Bun & Drizzle ORM 搭載</i>
</p>

<p align="center">
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/Runtime-Bun-fbf0df?style=flat-square&logo=bun&logoColor=black" alt="Bun"></a>
  <a href="https://discord.js.org"><img src="https://img.shields.io/badge/Discord.js-v14-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord.js"></a>
  <a href="https://orm.drizzle.team"><img src="https://img.shields.io/badge/ORM-Drizzle-C5F74F?style=flat-square&logo=drizzle&logoColor=black" alt="Drizzle"></a>
  <a href="https://bun.sh/docs/api/sqlite"><img src="https://img.shields.io/badge/Database-bun:sqlite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="bun:sqlite"></a>
  <a href="../../LICENSE"><img src="https://img.shields.io/badge/License-ISC-blue?style=flat-square" alt="License"></a>
</p>

<p align="center">
  <a href="../../README.md">English</a> •
  <a href="./README.ru.md">Русский</a> •
  <a href="./README.zh-CN.md">简体中文</a> •
  <b>日本語</b> •
  <a href="./README.pt-BR.md">Português</a> •
  <a href="./README.es.md">Español</a> •
  <a href="./README.ko.md">한국어</a> •
  <a href="./README.de.md">Deutsch</a> •
  <a href="./README.fr.md">Français</a> •
  <a href="./README.uk.md">Українська</a>
</p>

<p align="center">
  <img src="../visual.gif" alt="Discord Voice Manager Demo" width="100%">
</p>

---

</div>

## 🌟 Discord Voice Manager が選ばれる理由

* 🚀 **Zero-Command 自動セットアップ:** `/` コマンドメニューに余計なコマンドを登録しません。導入時に自動でカテゴリー、トリガーチャンネル、操作パネルを作成します。
* ⚡ **超高速パフォーマンス (Bun):** TypeScriptのネイティブ実行、ミリ秒未満の高速起動、ホットリロード対応。
* 🛡️ **型安全な組み込みDB:** `bun:sqlite` 上の Drizzle ORM — 外部DBサーバー不要、`node-gyp` などのビルド環境も一切不要です。
* 🔒 **100% Discord API v10 準拠:** 基本的な `Guilds` と `GuildVoiceStates` インテントのみを使用。特権インテントの申請リスクがありません。
* 🛡️ **ゴーストチャンネル防止 (Mutex):** ユーザー単位の排他制御により、連続入退室時の多重作成や不要チャンネルの残留を防ぎます。
* 🎨 **マルチサーバーカスタマイズ:** サーバーごとに色、絵文字、部屋名、ボタンタイトルを自由にカスタマイズ可能。

---

## 🎛️ コントロールパネルの機能

チャンネル所有者は、ボタン・モーダル・ユーザー選択メニューを使ってリアルタイムに部屋を管理できます：

* ✏️ **部屋名の変更** — クールダウン制限付きでチャンネル名を変更。
* 👥 **人数制限** — 接続可能なユーザー上限を設定（`0` で無制限）。
* 🔒 **ロック / ロック解除** — `@everyone` の接続権限を切り替え。
* 👁️ **非表示 / 表示** — `@everyone` に対するチャンネルの表示/非表示を切り替え。
* 👤 **ユーザーアクセス** — 特定のメンバーに対して接続権限を個別に許可/禁止。
* 🔈 **ミュート / ミュート解除** — 特定のメンバーの発言権限を制御。
* 🚫 **キック** — プライベート部屋から特定のユーザーを切断。
* 👑 **所有権の譲渡** — チャンネルの所有権を別の参加者に譲渡。
* 🔄 **権限リセット** — すべてのカスタム権限オーバーライドを初期化。
* ℹ️ **部屋情報** — 現在の設定、作成日時、アクセス権限を確認。

---

## 🚀 クイックスタート

### 1. クローンと依存パッケージのインストール
```bash
git clone https://github.com/oneheka/Discord-Voice-Manager.git
cd Discord-Voice-Manager
bun install
```

### 2. 環境変数の設定
プロジェクトルートに `.env` ファイルを作成します：
```env
DISCORD_TOKEN=あなたのBotトークン
```

### 3. 起動
```bash
# 開発モード（ホットリロード）
bun run dev

# 本番起動
bun start
```

---

## 🛠️ 必要なBot権限

Discord Developer Portal で招待リンクを生成する際、以下のOAuth2権限を付与してください：
* `Manage Channels` (チャンネルの管理)
* `Move Members` (メンバーの移動)
* `Send Messages` (メッセージの送信)
* `Embed Links` (埋め込みリンク)
* `Attach Files` (ファイルの添付)
* `View Channel` (チャンネルの閲覧)
* `Connect` & `Speak` (接続と発言)

---

## 📄 ライセンス

本プロジェクトは [ISC License](../../LICENSE) の下で公開されています。[oneheka](https://github.com/oneheka) により開発。