<div align="center">

# 🎙️ Discord Voice Manager

<p align="center">
  <b>Bot autónomo para la gestión de salas de voz privadas temporales en Discord.</b><br>
  <i>Zero-Command Plug & Play • Zero Privileged Intents • Impulsado por Bun & Drizzle ORM</i>
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
  <b>Español</b> •
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

## 🌟 ¿Por qué elegir Discord Voice Manager?

* 🚀 **Configuración Automática Zero-Command:** Sin comandos de barra que saturen el menú `/`. El bot crea automáticamente la categoría, el canal disparador y el panel de control.
* ⚡ **Rendimiento Ultrarrápido (Bun):** Ejecución nativa de TypeScript con inicio instantáneo en submilisegundos y recarga en caliente integrada.
* 🛡️ **Base de Datos Embebida Type-Safe:** Drizzle ORM sobre el motor C nativo `bun:sqlite` — sin servidores externos y sin compilaciones `node-gyp`.
* 🔒 **100% Compatible con Discord API v10:** Requiere únicamente los intents básicos `Guilds` y `GuildVoiceStates`, garantizando seguridad y aprobación en verificación.
* 🛡️ **Protección Anti-Canales Fantasma:** El bloqueo por usuario evita la creación duplicada de salas en conexiones rápidas.
* 🎨 **Personalización Multiservidor:** Personalización completa de colores, emojis, nombres y títulos de botones por servidor.

---

## 🎛️ Funciones del Panel de Control

Los propietarios gestionan sus salas en tiempo real mediante botones interactivos, formularios modales y menús de selección:

* ✏️ **Renombrar Sala** — Cambia el nombre del canal con protección de cooldown.
* 👥 **Límite de Usuarios** — Configura la capacidad máxima de participantes (`0` para ilimitado).
* 🔒 **Bloquear / Desbloquear** — Alterna el permiso de conexión para `@everyone`.
* 👁️ **Ocultar / Mostrar** — Alterna la visibilidad del canal para `@everyone`.
* 👤 **Acceso de Usuario** — Otorga o revoca permisos de conexión para usuarios específicos.
* 🔈 **Silenciar / Permitir Hablar** — Gestiona los permisos de voz de participantes.
* 🚫 **Expulsar (Kick)** — Desconecta a un usuario de tu sala privada.
* 👑 **Transferir Propiedad** — Transfiere el liderazgo de la sala a otro participante.
* 🔄 **Restablecer Permisos** — Borra todos los permisos personalizados individuales.
* ℹ️ **Información de la Sala** — Consulta estadísticas en vivo, hora de creación y permisos.

---

## 🚀 Inicio Rápido

### 1. Clonar e Instalar Dependencias
```bash
git clone https://github.com/oneheka/Discord-Voice-Manager.git
cd Discord-Voice-Manager
bun install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
DISCORD_TOKEN=tu_token_aqui
```

### 3. Iniciar el Bot
```bash
# Modo de desarrollo (con recarga en caliente)
bun run dev

# Modo producción
bun start
```

---

## 🛠️ Permisos Requeridos del Bot

Al generar el enlace de invitación en el Discord Developer Portal, selecciona los siguientes permisos OAuth2:
* `Manage Channels` (Administrar canales)
* `Move Members` (Mover miembros)
* `Send Messages` (Enviar mensajes)
* `Embed Links` (Insertar enlaces)
* `Attach Files` (Adjuntar archivos)
* `View Channel` (Ver canales)
* `Connect` & `Speak` (Conectar y hablar)

---

## 📄 Licencia

Distribuido bajo la [Licencia ISC](../../LICENSE). Desarrollado con ❤️ por [oneheka](https://github.com/oneheka).