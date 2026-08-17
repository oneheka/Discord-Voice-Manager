<div align="center">

# 🎙️ Discord Voice Manager

<p align="center">
  <b>为 Discord 社区打造的轻量级自主临时语音私人房间管理机器人。</b><br>
  <i>Zero-Command Plug & Play（即插即用，零斜杠指令） • 零特权意图 • 基于 Bun 与 Drizzle ORM 构建</i>
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
  <b>简体中文</b> •
  <a href="./README.ja.md">日本語</a> •
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

## 🌟 为什么选择 Discord Voice Manager？

* 🚀 **Zero-Command 自动化部署：** 不在服务器的 `/` 命令菜单中注册任何指令。邀请机器人后自动创建分类、触发频道与交互控制面板。
* ⚡ **极致性能（Bun 运行时）：** 原生执行 TypeScript，毫秒级冷启动，内置热重载机制。
* 🛡️ **类型安全内嵌数据库：** 基于原生 `bun:sqlite` 的 Drizzle ORM，无需部署独立数据库服务器，零 `node-gyp` 编译开销。
* 🔒 **100% 契合 Discord API v10：** 仅需基础 `Guilds` 与 `GuildVoiceStates` 意图，彻底规避特权意图审核风险。
* 🛡️ **并发与防刷保护：** 用户级互斥锁机制，杜绝快速进出导致的幽灵频道与重复创建。
* 🎨 **多服务器自定义：** 支持针对不同服务器独立自定义颜色、表情、房间名称及按钮标题。

---

## 🎛️ 控制面板功能

房主可通过实时交互按钮、模态弹窗与用户选择菜单管理专属房间：

* ✏️ **重命名房间** — 修改房间名称（带冷却防刷保护）。
* 👥 **人数限制** — 设置语音房间容纳人数（`0` 代表无限制）。
* 🔒 **锁定 / 解锁** — 切换 `@everyone` 的连接加入权限。
* 👁️ **隐藏 / 显示** — 切换 `@everyone` 的频道可见性。
* 👤 **用户权限** — 为特定成员授予或收回连接权限。
* 🔈 **禁言 / 解除** — 为特定成员授予或收回语音发言权限。
* 🚫 **踢出成员** — 将指定用户强制移出私人房间。
* 👑 **转让房主** — 将房间所有权转让给其他在场成员。
* 🔄 **重置权限** — 清除所有自定义独立成员权限覆盖。
* ℹ️ **房间信息** — 查看当前房间详细统计数据、创建时间与权限状态。

---

## 🚀 快速开始

### 1. 克隆仓库并安装依赖
```bash
git clone https://github.com/oneheka/Discord-Voice-Manager.git
cd Discord-Voice-Manager
bun install
```

### 2. 配置环境变量
在根目录创建 `.env` 文件：
```env
DISCORD_TOKEN=你的_DISCORD_BOT_TOKEN
```

### 3. 启动机器人
```bash
# 开发模式（带热重载）
bun run dev

# 生产模式
bun start
```

---

## 🛠️ 所需机器人权限

在 Discord 开发者后台生成邀请链接时，请勾选以下 OAuth2 权限：
* `Manage Channels`（管理频道）
* `Move Members`（移动成员）
* `Send Messages`（发送消息）
* `Embed Links`（嵌入链接）
* `Attach Files`（附加文件）
* `View Channel`（查看频道）
* `Connect` & `Speak`（连接与语音发言）

---

## 📄 开源协议

本项目基于 [ISC 许可证](../../LICENSE) 开源。由 [oneheka](https://github.com/oneheka) 精心打造 ❤️