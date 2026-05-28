<div align="center">

<img src="public/portfolio-og.jpg" alt="Sumin Portfolio Banner" width="100%" style="border-radius: 12px;" />

<br /><br />

# Kwon Sumin — UX Portfolio

**State-driven interface design. Warm editorial UX.**

[![Live](https://img.shields.io/badge/Live%20Site-gwonsumin.github.io%2FResume-FF785D?style=flat-square&logo=github)](https://gwonsumin.github.io/Resume/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com/)

</div>

---

## Overview

사용자의 상태를 이해하고, 그 흐름을 **선택 가능한 경험**으로 구조화하는 포트폴리오 웹사이트입니다.

단순 UI 구현이 아닌, UX 흐름과 인터페이스 구조 설계를 중심으로 만들어졌습니다.

> _"State Interface — 사용자가 어느 상태에 있는지를 감지하고, 그 흐름을 선택의 구조로 전환한다."_

---

## Projects

<table>
  <tr>
    <td width="50%" valign="top">
      <img src="public/projects/goreon/goreon-detail-thumbnail.png" alt="GOREON AI recommendation and comparison UI" width="100%" style="aspect-ratio: 16 / 10; object-fit: cover;" />
      <br />
      <h3>GOREON</h3>
      <p>AI 추천과 비교 흐름으로 복잡한 전자기기 선택 과정을 줄이는<br />커머스 UX 프로젝트</p>
      <p>
        <code>AI Recommendation</code>
        <code>E-commerce</code>
        <code>UX/UI Design</code>
        <code>Frontend</code>
      </p>
    </td>
    <td width="50%" valign="top">
      <img src="public/projects/tone/tone-thumbnail-01.png" alt="TONE mobile mood and music mockup" width="50%" style="aspect-ratio: 16 / 10; object-fit: cover; object-position: center;" />
      <br />
      <h3>TONE</h3>
      <p>감정 컬러와 음악 추천을 연결해 하루의 상태를 기록하는<br />모바일 뮤직 플랫폼</p>
      <p>
        <code>Emotion Record</code>
        <code>Music Platform</code>
        <code>UX/UI</code>
        <code>Mobile</code>
      </p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <img src="public/projects/sangsangmadang/sangsangmadang-thumbnail.png" alt="Sangsangmadang browser mockup" width="100%" style="aspect-ratio: 16 / 10; object-fit: cover;" />
      <br />
      <h3>Sangsangmadang</h3>
      <p>문화예술 공간의 탐색 구조와 운영 흐름을 재정리한<br />웹 서비스 리디자인 프로젝트</p>
      <p>
        <code>Redesign</code>
        <code>Branding</code>
        <code>UX/UI Design</code>
        <code>Frontend</code>
      </p>
    </td>
    <td width="50%" valign="top">
      <img src="public/projects/loopin/loopin-thumbnail.png" alt="LoopIn dashboard and learning flow UI" width="100%" style="aspect-ratio: 16 / 10; object-fit: cover;" />
      <br />
      <h3>LoopIn</h3>
      <p>학습 흐름과 몰입 경험을 연결하는<br />AI 기반 EduTech 플랫폼</p>
      <p>
        <code>EduTech</code>
        <code>UX/UI Design</code>
        <code>AI Learning</code>
        <code>Dashboard UX</code>
      </p>
    </td>
  </tr>
</table>

---

## Design System

<table>
  <tr>
    <th>Role</th>
    <th>Token</th>
    <th>Value</th>
    <th>Preview</th>
  </tr>
  <tr>
    <td>Main / Accent</td>
    <td><code>--color-main</code></td>
    <td><code>#FF785D</code></td>
    <td><img src="assets/readme/colors/coral.svg" alt="#FF785D" /></td>
  </tr>
  <tr>
    <td>Point / Teal</td>
    <td><code>--color-point</code></td>
    <td><code>#0AA5A5</code></td>
    <td><img src="assets/readme/colors/mint.svg" alt="#0AA5A5" /></td>
  </tr>
  <tr>
    <td>Background</td>
    <td><code>--color-bg</code></td>
    <td><code>#FFF4EB</code></td>
    <td><img src="assets/readme/colors/cream.svg" alt="#FFF4EB" /></td>
  </tr>
  <tr>
    <td>Line / Text</td>
    <td><code>--color-line</code></td>
    <td><code>#3B2F2F</code></td>
    <td><img src="assets/readme/colors/brown.svg" alt="#3B2F2F" /></td>
  </tr>
</table>

**Typography**

- `Satoshi` — 영문 주력 (Bold · Medium · Regular)
- `Inter` — 영문 보조
- `Pretendard` — 한글

---

## Tech Stack

| Category   | Stack                     |
| ---------- | ------------------------- |
| Framework  | React 19 + TypeScript 6   |
| Build Tool | Vite 8                    |
| Styling    | SCSS (Module 기반)        |
| Routing    | React Router v7           |
| Physics    | Matter.js (Hero 인터랙션) |
| Deploy     | GitHub Pages              |

---

## Features

- **Hero 타이포 레이아웃** — editorial 리듬의 대형 타이포그래피 구성
- **커스텀 커서** — Default / Hover 상태 SVG 커서 전환
- **Matter.js 인터랙션** — 물리 기반 오브젝트 반응
- **카드 기반 프로젝트 구조** — clip-path 디테일이 있는 프로젝트 카드
- **Archive 섹션** — 작업 아카이브 그리드
- **Contact Pass** — 패스포트 형식의 연락처 카드 (QR 포함)
- **섹션 스크롤 UX** — 각 섹션 간 자연스러운 흐름 전환

---

## Project Structure

```
Resume/
├── public/
│   ├── projects/          # 프로젝트 스크린샷 & 데모 영상
│   │   ├── goreon/
│   │   ├── tone/
│   │   └── sangsangmadang/
│   ├── assets/files/      # PDF 제안서 & 이력서
│   ├── favicon.svg
│   └── portfolio-og.jpg   # OG 메타 이미지
│
└── src/
    ├── assets/
    │   ├── images/        # heroChr, profile-photo
    │   ├── icons/         # tomato icon variants
    │   ├── shapes/        # SVG 도형 (hero, footer, mask)
    │   ├── cursor/        # 커스텀 커서 SVG
    │   ├── logo/          # 로고 SVG
    │   ├── skills/        # 툴 아이콘 (Figma, Framer, etc.)
    │   ├── archive/       # 아카이브 이미지
    │   ├── contact/       # Contact Pass 에셋
    │   └── fonts/satoshi/ # Satoshi 폰트 (woff2)
    │
    ├── components/        # 재사용 컴포넌트
    └── pages/             # 페이지 단위 구성
```

---

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:5173)
npm run dev

# 프로덕션 빌드 + 404 fallback 생성
npm run build
```

---

<div align="center">

Designed & Built by **Kwon Sumin**

[gwonsumin.github.io/Resume](https://gwonsumin.github.io/Resume/) · [Resume PDF](public/assets/files/KwonSumin-Resume.pdf)

</div>
