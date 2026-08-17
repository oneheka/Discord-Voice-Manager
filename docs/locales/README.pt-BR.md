<div align="center">

# 🎙️ Discord Voice Manager

<p align="center">
  <b>Bot autônomo para gerenciamento de canais de voz privados temporários no Discord.</b><br>
  <i>Zero-Command Plug & Play • Zero Privileged Intents • Desenvolvido com Bun & Drizzle ORM</i>
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
  <b>Português</b> •
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

## 🌟 Por que escolher o Discord Voice Manager?

* 🚀 **Configuração Automática Zero-Command:** Sem comandos slash poluindo o menu `/` do servidor. O bot cria automaticamente a categoria, o canal disparador e o painel de controle.
* ⚡ **Desempenho Ultrarrápido (Bun):** Execução nativa de TypeScript, inicialização instantânea em sub-milissegundos e hot-reload integrado.
* 🛡️ **Banco de Dados Embutido Type-Safe:** Drizzle ORM sobre o motor C nativo `bun:sqlite` — sem servidores externos e sem dores de cabeça com `node-gyp`.
* 🔒 **100% Compatível com Discord API v10:** Utiliza apenas os intents básicos `Guilds` e `GuildVoiceStates`, livre de bloqueios de verificação.
* 🛡️ **Proteção Anti-Ghost (Mutex):** Bloqueio por usuário que impede a duplicação de salas e canais fantasmas em conexões rápidas.
* 🎨 **Personalização Multisservidor:** Personalização completa de cores, emojis, nomes e títulos dos botões por servidor.

---

## 🎛️ Recursos do Painel de Controle

Os donos dos canais gerenciam suas salas em tempo real através de botões, modais e menus de seleção:

* ✏️ **Renomear Sala** — Altera o nome do canal com proteção de cooldown.
* 👥 **Limite de Usuários** — Define o limite de vagas na sala (`0` para ilimitado).
* 🔒 **Trancar / Destrancar** — Alterna a permissão de conexão para `@everyone`.
* 👁️ **Ocultar / Mostrar** — Alterna a visibilidade do canal para `@everyone`.
* 👤 **Acesso de Usuário** — Concede ou revoga permissão de conexão para membros específicos.
* 🔈 **Silenciar / Desmutar** — Concede ou revoga permissão de falar na sala.
* 🚫 **Expulsar (Kick)** — Desconecta um participante da sua sala privada.
* 👑 **Transferir Posse** — Passa a liderança da sala para outro usuário.
* 🔄 **Redefinir Permissões** — Limpa todas as permissões individuais personalizadas.
* ℹ️ **Informações da Sala** — Exibe dados em tempo real, tempo de criação e permissões.

---

## 🚀 Início Rápido

### 1. Clonar e Instalar Dependências
```bash
git clone https://github.com/oneheka/Discord-Voice-Manager.git
cd Discord-Voice-Manager
bun install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
DISCORD_TOKEN=seu_token_aqui
```

### 3. Iniciar o Bot
```bash
# Modo de desenvolvimento (com hot-reload)
bun run dev

# Modo de produção
bun start
```

---

## 🛠️ Permissões Necessárias do Bot

Ao gerar o link de convite no Discord Developer Portal, conceda as seguintes permissões OAuth2:
* `Manage Channels` (Gerenciar canais)
* `Move Members` (Mover membros)
* `Send Messages` (Enviar mensagens)
* `Embed Links` (Inserir links)
* `Attach Files` (Anexar arquivos)
* `View Channel` (Ver canais)
* `Connect` & `Speak` (Conectar e falar)

---

## 📄 Licença

Distribuído sob a [Licença ISC](../../LICENSE). Desenvolvido com ❤️ por [oneheka](https://github.com/oneheka).