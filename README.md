<div align="center">

# 🎙️ Discord Voice Manager

<p align="center">
  <b>Effortless temporary private voice channels for Discord communities.</b><br>
  <i>Zero-Command Plug & Play • Zero Privileged Intents • Powered by Bun & Drizzle ORM</i>
</p>

<p align="center">
  <a href="https://bun.sh"><img src="https://img.shields.io/badge/Runtime-Bun-fbf0df?style=flat-square&logo=bun&logoColor=black" alt="Bun"></a>
  <a href="https://discord.js.org"><img src="https://img.shields.io/badge/Discord.js-v14-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord.js"></a>
  <a href="https://orm.drizzle.team"><img src="https://img.shields.io/badge/ORM-Drizzle-C5F74F?style=flat-square&logo=drizzle&logoColor=black" alt="Drizzle"></a>
  <a href="https://bun.sh/docs/api/sqlite"><img src="https://img.shields.io/badge/Database-bun:sqlite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="bun:sqlite"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-ISC-blue?style=flat-square" alt="License"></a>
</p>

<p align="center">
  <b>English</b> •
  <a href="./docs/locales/README.ru.md">Русский</a> •
  <a href="./docs/locales/README.zh-CN.md">简体中文</a> •
  <a href="./docs/locales/README.ja.md">日本語</a> •
  <a href="./docs/locales/README.pt-BR.md">Português</a> •
  <a href="./docs/locales/README.es.md">Español</a> •
  <a href="./docs/locales/README.ko.md">한국어</a> •
  <a href="./docs/locales/README.de.md">Deutsch</a> •
  <a href="./docs/locales/README.fr.md">Français</a> •
  <a href="./docs/locales/README.uk.md">Українська</a>
</p>

<p align="center">
  <img src="./docs/visual.gif" alt="Discord Voice Manager Demo" width="100%">
</p>

---

</div>

## 🌟 Why Discord Voice Manager?

* 🚀 **Zero-Command Auto-Setup:** Zero slash commands in your server's `/` menu. The bot auto-creates the category, trigger channel, and control panel on arrival.
* ⚡ **Blazing Fast (Bun Runtime):** Native TypeScript execution with sub-millisecond cold starts and built-in hot reloading.
* 🛡️ **Type-Safe Embedded DB:** Drizzle ORM on top of native `bun:sqlite` — zero external DB servers and zero `node-gyp` compilation steps.
* 🔒 **100% Discord API v10 Compliant:** Uses only basic `Guilds` and `GuildVoiceStates` intents. Completely safe from intent bans and verification blocks.
* 🛡️ **Anti-Race Protection:** Per-user creation mutex locks prevent ghost channels during rapid join/leave cycles.
* 🎨 **Multi-Server Customization:** Full customization of colors, emojis, names, and button titles per server.

---

## 🎛️ Control Panel Features

Channel owners manage their rooms in real-time via interactive buttons, modal forms, and user select menus:

* ✏️ **Rename Room** — Change room name with cooldown protection.
* 👥 **User Limit** — Set voice slot capacity (`0` for unlimited).
* 🔒 **Lock / Unlock** — Toggle connect permission for `@everyone`.
* 👁️ **Hide / Show** — Toggle channel visibility for `@everyone`.
* 👤 **User Access** — Grant or deny connection access to specific members.
* 🔈 **Mute / Unmute** — Grant or revoke speaking permissions for members.
* 🚫 **Kick Member** — Disconnect a user from your private room.
* 👑 **Transfer Owner** — Transfer room ownership to another participant.
* 🔄 **Reset Permissions** — Clear all custom permission overrides.
* ℹ️ **Room Info** — View active statistics, creation time, and permissions.

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/oneheka/Discord-Voice-Manager.git
cd Discord-Voice-Manager
bun install
```

### 2. Configure
Create a `.env` file in the root directory:
```env
DISCORD_TOKEN=your_bot_token_here
```

### 3. Run
```bash
# Development (with hot-reload)
bun run dev

# Production
bun start
```

---

## 🛠️ Required Bot Permissions

Grant the following OAuth2 permissions when generating the bot invite link:
* `Manage Channels`
* `Move Members`
* `Send Messages`
* `Embed Links`
* `Attach Files`
* `View Channel`
* `Connect` & `Speak`

---

## 📄 License

Distributed under the [ISC License](./LICENSE). Developed with ❤️ by [oneheka](https://github.com/oneheka).