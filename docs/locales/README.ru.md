<div align="center">

# 🎙️ Discord Voice Manager

<p align="center">
  <b>Автономный бот для управления временными приватными голосовыми комнатами в Discord.</b><br>
  <i>Zero-Command Plug & Play • Zero Privileged Intents • На базе Bun и Drizzle ORM</i>
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
  <b>Русский</b> •
  <a href="./README.zh-CN.md">简体中文</a> •
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

## 🌟 Почему Discord Voice Manager?

* 🚀 **Zero-Command Auto-Setup:** 0 слэш-команд в меню `/` вашего сервера. Бот сам автоматически создает категорию, канал-триггер и панель управления при входе.
* ⚡ **Сверхбыстрый (Bun Runtime):** Прямое исполнение TypeScript с субмиллисекундным запуском и встроенным hot-reload.
* 🛡️ **Типобезопасная встроенная БД:** Drizzle ORM поверх нативного `bun:sqlite` — 0 внешних серверов баз данных и 0 проблем со сборкой через `node-gyp`.
* 🔒 **100% соответствие Discord API v10:** Используются только базовые интенты `Guilds` и `GuildVoiceStates`. Никаких привилегированных интентов и отказов в верификации.
* 🛡️ **Защита от состояний гонки (Mutex):** Блокировки на уровне пользователей предотвращают появление каналов-призраков при быстром спаме входом/выходом.
* 🎨 **Мультисерверная кастомизация:** Индивидуальная настройка цветов, эмодзи, названий и текстов кнопок для каждого сервера.

---

## 🎛️ Возможности панели управления

Владельцы комнат управляют своими каналами в реальном времени через интерактивные кнопки, модальные формы и выпадающие списки участников:

* ✏️ **Переименовать комнату** — изменение названия с защитой от кулдауна.
* 👥 **Лимит пользователей** — настройка вместимости комнаты (`0` для бесконечности).
* 🔒 **Закрыть / Открыть** — переключение права подключения для `@everyone`.
* 👁️ **Скрыть / Показать** — переключение видимости канала для `@everyone`.
* 👤 **Доступ пользователю** — выдача или запрет на подключение конкретным участникам.
* 🔈 **Мут / Размут** — выдача или запрет права говорить в войсе.
* 🚫 **Выгнать (Kick)** — принудительное отключение участника из вашей комнаты.
* 👑 **Передать права** — передача владения комнатой другому участнику.
* 🔄 **Сбросить права** — очистка всех персональных оверрайтов прав.
* ℹ️ **Информация о комнате** — просмотр активных настроек, времени создания и прав.

---

## 🚀 Быстрый старт

### 1. Клонирование и установка зависимостей
```bash
git clone https://github.com/oneheka/Discord-Voice-Manager.git
cd Discord-Voice-Manager
bun install
```

### 2. Настройка переменных окружения
Создайте файл `.env` в корне проекта:
```env
DISCORD_TOKEN=ваш_токен_бота
```

### 3. Запуск
```bash
# Режим разработки (с hot-reload)
bun run dev

# Продакшн запуск
bun start
```

---

## 🛠️ Необходимые права бота (OAuth2)

При генерации ссылки приглашения бота выберите следующие разрешения:
* `Manage Channels` (Управление каналами)
* `Move Members` (Перемещение участников)
* `Send Messages` (Отправка сообщений)
* `Embed Links` (Встраивание ссылок)
* `Attach Files` (Прикрепление файлов)
* `View Channel` (Просмотр каналов)
* `Connect` & `Speak` (Подключение и разговор)

---

## 📄 Лицензия

Распространяется под [Лицензией ISC](../../LICENSE). Разработано с ❤️ автором [oneheka](https://github.com/oneheka).