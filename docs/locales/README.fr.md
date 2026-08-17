<div align="center">

# 🎙️ Discord Voice Manager

<p align="center">
  <b>Bot autonome pour la gestion de salons vocaux privés temporaires sur Discord.</b><br>
  <i>Zero-Command Plug & Play • Zéro intent privilégié • Propulsé par Bun & Drizzle ORM</i>
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
  <a href="./README.de.md">Deutsch</a> •
  <b>Français</b> •
  <a href="./README.uk.md">Українська</a>
</p>

<p align="center">
  <img src="../visual.gif" alt="Discord Voice Manager Demo" width="100%">
</p>

---

</div>

## 🌟 Pourquoi choisir Discord Voice Manager ?

* 🚀 **Configuration Automatique Zero-Command :** Aucune commande slash n'encombre le menu `/`. Le bot crée automatiquement la catégorie, le salon déclencheur et le panneau de contrôle.
* ⚡ **Performance Ultra-rapide (Bun) :** Exécution native de TypeScript, démarrage instantané en moins d'une milliseconde et rechargement à chaud intégré.
* 🛡️ **Base de données Type-Safe intégrée :** Drizzle ORM sur le moteur C natif `bun:sqlite` — aucun serveur externe et aucune compilation `node-gyp`.
* 🔒 **100% Conforme à Discord API v10 :** Utilise uniquement les intents de base `Guilds` et `GuildVoiceStates`, garantissant une validation sans restriction.
* 🛡️ **Protection Anti-Salons Fantômes (Mutex) :** Verrouillage par utilisateur empêchant les doublons et les salons orphelins lors de connexions rapides.
* 🎨 **Personnalisation Multi-Serveur :** Personnalisation complète des couleurs, émojis, noms et titres des boutons par serveur.

---

## 🎛️ Fonctionnalités du Panneau de Contrôle

Les propriétaires gèrent leur salon en temps réel via des boutons, des formulaires modaux et des menus de sélection :

* ✏️ **Renommer le salon** — Modifier le nom avec protection contre le spam (cooldown).
* 👥 **Limite d'utilisateurs** — Définir le nombre de places (`0` pour illimité).
* 🔒 **Verrouiller / Déverrouiller** — Activer/désactiver l'accès pour `@everyone`.
* 👁️ **Masquer / Afficher** — Gérer la visibilité du salon pour `@everyone`.
* 👤 **Accès utilisateur** — Autoriser ou refuser l'accès à un membre précis.
* 🔈 **Muet / Rétablir la parole** — Gérer les permissions de parole d'un membre.
* 🚫 **Expulser (Kick)** — Déconnecter un utilisateur de votre salon privé.
* 👑 **Transférer la propriété** — Désigner un autre participant comme propriétaire du salon.
* 🔄 **Réinitialiser les permissions** — Effacer toutes les permissions personnalisées.
* ℹ️ **Infos du salon** — Consulter les statistiques en direct, la date de création et les permissions.

---

## 🚀 Démarrage Rapide

### 1. Cloner et installer les dépendances
```bash
git clone https://github.com/oneheka/Discord-Voice-Manager.git
cd Discord-Voice-Manager
bun install
```

### 2. Configurer les variables d'environnement
Créez un fichier `.env` à la racine :
```env
DISCORD_TOKEN=votre_token_de_bot
```

### 3. Lancer le Bot
```bash
# Mode développement (hot-reload)
bun run dev

# Mode production
bun start
```

---

## 🛠️ Permissions requises du Bot

Lors de la création du lien d'invitation sur le Discord Developer Portal, cochez les permissions suivantes :
* `Manage Channels` (Gérer les salons)
* `Move Members` (Déplacer les membres)
* `Send Messages` (Envoyer des messages)
* `Embed Links` (Intégrer des liens)
* `Attach Files` (Joindre des fichiers)
* `View Channel` (Voir les salons)
* `Connect` & `Speak` (Se connecter et parler)

---

## 📄 Licence

Distribué sous la [Licence ISC](../../LICENSE). Développé avec ❤️ par [oneheka](https://github.com/oneheka).