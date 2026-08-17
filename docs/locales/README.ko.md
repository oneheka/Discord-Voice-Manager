<div align="center">

# 🎙️ Discord Voice Manager

<p align="center">
  <b>Discord 커뮤니티를 위한 자율형 임시 개인 음성 채널 관리 봇.</b><br>
  <i>Zero-Command Plug & Play • 권한 인텐트 불필요 • Bun & Drizzle ORM 기반</i>
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
  <b>한국어</b> •
  <a href="./README.de.md">Deutsch</a> •
  <a href="./README.fr.md">Français</a> •
  <a href="./README.uk.md">Українська</a>
</p>

<p align="center">
  <img src="../visual.gif" alt="Discord Voice Manager Demo" width="100%">
</p>

---

</div>

## 🌟 왜 Discord Voice Manager인가요?

* 🚀 **Zero-Command 자동 구성:** `/` 명령어 메뉴를 복잡하게 만들지 않습니다. 서버 초대 시 카테고리, 트리거 채널, 제어 패널을 1초 만에 자동 생성합니다.
* ⚡ **초고속 성능 (Bun 런타임):** TypeScript 네이티브 실행, 1밀리초 미만의 콜드 스타트 및 핫 리로드 지원.
* 🛡️ **타입 안전 내장 데이터베이스:** `bun:sqlite` 기반의 Drizzle ORM — 별도 DB 서버나 `node-gyp` 빌드 도구가 전혀 필요 없습니다.
* 🔒 **100% Discord API v10 준수:** 기본 `Guilds` 및 `GuildVoiceStates` 인텐트만 사용하므로 특권 인텐트 심사 거절 위험이 없습니다.
* 🛡️ **유령 채널 방지 (Mutex):** 사용자별 잠금 큐를 통해 빠른 재접속 시 발생하는 중복 생성 및 미삭제 문제를 차단합니다.
* 🎨 **다중 서버 맞춤 설정:** 서버별로 색상, 이모지, 방 이름, 버튼 제목을 자유롭게 설정 가능.

---

## 🎛️ 제어 패널 기능

채널 소유자는 버튼, 모달 창, 유저 선택 메뉴를 통해 실시간으로 방을 제어할 수 있습니다:

* ✏️ **방 이름 변경** — 쿨다운 제한과 함께 음성 채널 이름 변경.
* 👥 **인원 제한** — 채널 최대 접속 인원 설정 (`0`은 무제한).
* 🔒 **잠금 / 잠금 해제** — `@everyone` 접속 권한 활성화/비활성화.
* 👁️ **숨기기 / 보이기** — `@everyone` 대상 채널 표시 여부 전환.
* 👤 **유저 권한 설정** — 특정 멤버의 접속 권한 허용/차단.
* 🔈 **음소거 / 음소거 해제** — 특정 멤버의 마이크 발언 권한 관리.
* 🚫 **추방 (Kick)** — 개인 채널에서 특정 유저 강제 퇴장.
* 👑 **방장 양도** — 다른 참여자에게 방장 권한 이전.
* 🔄 **권한 초기화** — 모든 개별 유저 권한 오버라이드 제거.
* ℹ️ **방 정보** — 현재 설정, 생성 시간 및 활성 권한 정보 확인.

---

## 🚀 빠른 시작

### 1. 저장소 복제 및 패키지 설치
```bash
git clone https://github.com/oneheka/Discord-Voice-Manager.git
cd Discord-Voice-Manager
bun install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성합니다:
```env
DISCORD_TOKEN=your_bot_token_here
```

### 3. 실행
```bash
# 개발 모드 (핫 리로드)
bun run dev

# 프로덕션 실행
bun start
```

---

## 🛠️ 필수 봇 권한

Discord 개발자 포털에서 봇 초대 링크 생성 시 다음 OAuth2 권한을 부여하세요:
* `Manage Channels` (채널 관리)
* `Move Members` (멤버 이동)
* `Send Messages` (메시지 보내기)
* `Embed Links` (링크 삽입)
* `Attach Files` (파일 첨부)
* `View Channel` (채널 보기)
* `Connect` & `Speak` (연결 및 말하기)

---

## 📄 라이선스

[ISC 라이선스](../../LICENSE)에 따라 배포됩니다. [oneheka](https://github.com/oneheka) 제작 ❤️