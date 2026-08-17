<div align="center">

# 🎙️ Discord Voice Manager

<p align="center">
  <b>Autonomer Bot zur Verwaltung temporärer privater Sprachkanäle auf Discord.</b><br>
  <i>Zero-Command Plug & Play • Keine privilegierten Intents • Angetrieben von Bun & Drizzle ORM</i>
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
  <a href="./README.ja.md">日本語</a> •
  <a href="./README.pt-BR.md">Português</a> •
  <a href="./README.es.md">Español</a> •
  <a href="./README.ko.md">한국어</a> •
  <b>Deutsch</b> •
  <a href="./README.fr.md">Français</a> •
  <a href="./README.uk.md">Українська</a>
</p>

<p align="center">
  <img src="../visual.gif" alt="Discord Voice Manager Demo" width="100%">
</p>

---

</div>

## 🌟 Warum Discord Voice Manager?

* 🚀 **Zero-Command Auto-Setup:** Keine Slash-Befehle, die das `/`-Menü überladen. Der Bot erstellt beim Beitreten automatisch die Kategorie, den Auslöser-Kanal und das Kontrollpanel.
* ⚡ **Blitzschnelle Performance (Bun):** Native TypeScript-Ausführung mit Startzeiten unter einer Millisekunde und integriertem Hot-Reload.
* 🛡️ **Typsichere eingebettete DB:** Drizzle ORM auf der nativen `bun:sqlite`-Engine — keine externen Datenbankserver und keine `node-gyp`-Kompilierung.
* 🔒 **100% Discord API v10 Konform:** Verwendet nur grundlegende `Guilds`- und `GuildVoiceStates`-Intents ohne Risiko von Verifizierungsblockaden.
* 🛡️ **Anti-Geisterkanal-Schutz (Mutex):** Benutzerbasierte Sperren verhindern doppelte Erstellungen und hängengebliebene Kanäle bei schnellen Verbindungswechseln.
* 🎨 **Multi-Server-Anpassung:** Vollständige Anpassung von Farben, Emojis, Namen und Schaltflächentexten pro Server.

---

## 🎛️ Funktionen des Kontrollpanels

Kanalbesitzer verwalten ihre Räume in Echtzeit über Buttons, Modale und Auswahlmenüs:

* ✏️ **Kanal umbenennen** — Name mit Abklingzeitschutz ändern.
* 👥 **Benutzerlimit** — Maximale Teilnehmerzahl festlegen (`0` für unbegrenzt).
* 🔒 **Sperren / Entsperren** — Verbindungsberechtigung für `@everyone` umschalten.
* 👁️ **Verstecken / Anzeigen** — Kanalsichtbarkeit für `@everyone` steuern.
* 👤 **Benutzerzugriff** — Verbindungsrechte für bestimmte Mitglieder vergeben oder entziehen.
* 🔈 **Stummschalten** — Sprechberechtigungen verwalten.
* 🚫 **Kicken** — Mitglied aus dem privaten Kanal trennen.
* 👑 **Besitz übertragen** — Eigentümerrechte an einen anderen Teilnehmer übergeben.
* 🔄 **Rechte zurücksetzen** — Alle individuellen Berechtigungsanpassungen löschen.
* ℹ️ **Kanal-Info** — Live-Statistiken, Erstellungszeit und Berechtigungen anzeigen.

---

## 🚀 Schnellstart

### 1. Klonen und Abhängigkeiten installieren
```bash
git clone https://github.com/oneheka/Discord-Voice-Manager.git
cd Discord-Voice-Manager
bun install
```

### 2. Umgebungsvariablen einrichten
Erstelle eine `.env`-Datei im Hauptverzeichnis:
```env
DISCORD_TOKEN=dein_bot_token_hier
```

### 3. Starten
```bash
# Entwicklungsmodus (Hot-Reload)
bun run dev

# Produktionsstart
bun start
```

---

## 🛠️ Erforderliche Bot-Berechtigungen

Wähle im Discord Developer Portal bei der Einladungslink-Erstellung folgende OAuth2-Berechtigungen aus:
* `Manage Channels` (Kanäle verwalten)
* `Move Members` (Mitglieder verschieben)
* `Send Messages` (Nachrichten senden)
* `Embed Links` (Links einbetten)
* `Attach Files` (Dateien anhängen)
* `View Channel` (Kanal anzeigen)
* `Connect` & `Speak` (Verbinden und Sprechen)

---

## 📄 Lizenz

Veröffentlicht unter der [ISC-Lizenz](../../LICENSE). Entwickelt mit ❤️ von [oneheka](https://github.com/oneheka).