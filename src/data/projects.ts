import { projectPublicUrl } from "../config/assets";
import { ROUTES } from "../config/routes";
import type { ProjectPreview } from "../types/project";

const PDF_BASE_PATH = `${import.meta.env.BASE_URL}assets/files`;

/** GOREON production origin (no trailing slash) — shared with case study deep links. */
export const GOREON_DEPLOY_ORIGIN = "https://goreon.vercel.app" as const;

/** TONE production origin (no trailing slash) — Vue app routes are under this host. */
export const TONE_DEPLOY_ORIGIN = "https://toneapp.dothome.co.kr" as const;

/** Sangsangmadang PHP deploy origin (no trailing slash). */
export const SANGSANGMADANG_DEPLOY_ORIGIN =
  "https://gsumin8327.dothome.co.kr" as const;

/** LoopIn production origin (no trailing slash) — shared with case study deep links. */
export const LOOPIN_DEPLOY_ORIGIN = "https://loop-in-mu.vercel.app" as const;

/** TAEMIN World Tour <LiMiNaL> official site origin (no trailing slash). */
export const TAEMIN_DEPLOY_ORIGIN = "https://taemintour.com" as const;

const LOOPIN_PERIOD_LABEL = "2026.05 · 약 3주";

export const selectedProjects: readonly ProjectPreview[] = [
  {
    id: "goreon",
    title: "GOREON",
    description:
      "AI 기반 전자기기 쇼핑에서 사용자의 상황을 이해하고 더 쉬운 선택을 돕는 추천 경험",
    subDescription:
      "AI 대화로 조건을 정리하고, 비교 구조로 선택 부담을 줄이는 전자기기 추천 쇼핑 서비스",
    techStack: [
      "React",
      "Redux Toolkit",
      "Node.js",
      "MongoDB",
      "OpenAI API",
      "Cloudflare R2",
      "Figma",
    ],
    tags: ["UX/UI Design", "AI Recommendation", "E-commerce", "Frontend"],
    period: "2026.03 - 2026.04 (약 4주)",
    role: "UX Flow Design · UI Design · Prototype · Frontend Collaboration",
    visual: {
      label: "01",
      meta: "AI Commerce",
      variant: "coral",
    },
    to: ROUTES.caseStudyGoreon,
    githubUrl: "https://github.com/gwonsumin/GOREON",
    deployUrl: `${GOREON_DEPLOY_ORIGIN}/`,
    proposalUrl: `${PDF_BASE_PATH}/GOREON-Proposal.pdf`,
    demoTestId: "test@test.com",
    demoTestPassword: "123123123",
    thumbnailSrc: projectPublicUrl("goreon", "goreon-thumbnail.png"),
    caseStudyTeamInfo: {
      kind: "team",
      teamCount: 5,
      periodLabel: "2026.03 ~ 2026.04 · 25일",
      myRoleBadge: "UX DESIGN · AI CHAT · FRONTEND",
    },
  },
  {
    id: "tone",
    title: "TONE",
    description:
      "TONE은 팬톤 컬러 기반의 데일리 톤과 플레이리스트를 제공하고, 사용자가 하루의 감정을 색과 음악으로 기록할 수 있도록 설계한 모바일 뮤직 플랫폼입니다.",
    subDescription:
      "팬톤 컬러 기반 Daily Tone과 플레이리스트로 하루의 감정을 색과 음악으로 기록하는 앱",
    techStack: ["Vue", "Pinia", "PHP", "MySQL", "OpenAI API", "Cloudflare R2"],
    tags: ["UX/UI", "Vue", "PHP", "Emotion Record", "Music Platform"],
    period: "2026.02 - 2026.03 (약 7주)",
    role: "UX Flow Design · UI Design System · Prototype · Vue Frontend Collaboration",
    visual: {
      label: "02",
      meta: "Emotion Archive",
      variant: "teal",
    },
    to: ROUTES.caseStudyTone,
    prototypeUrl:
      "https://www.figma.com/proto/CPHFRbBDBqaBRVcCQzwULV/%EB%94%94%EC%9E%90%EC%9D%B8?node-id=290-6422&p=f&t=OGzQaCRN52M5DVZr-0&scaling=scale-down&content-scaling=fixed&page-id=290%3A6295&starting-point-node-id=290%3A6540&show-proto-sidebar=1",
    proposalUrl: `${PDF_BASE_PATH}/TONE-Proposal.pdf`,
    githubUrl: "https://github.com/gwonsumin/TONE",
    deployUrl: TONE_DEPLOY_ORIGIN,
    deployWindow: { width: 430, height: 850, name: "TONEPreview" },
    thumbnailSrc: projectPublicUrl("tone", "tone-thumbnail-02.png"),
    heroStaggeredScreens: {
      left: {
        src: projectPublicUrl("tone", "tone-thumbnail-01.png"),
        alt: "감정 흐름 첫 단계 — 하루의 톤을 고르기 전 화면",
      },
      center: {
        src: projectPublicUrl("tone", "tone-thumbnail-02.png"),
        alt: "중심 화면 — 선택한 감정 톤에서 음악으로 이어지는 플레이어",
      },
      right: {
        src: projectPublicUrl("tone", "tone-thumbnail-03.png"),
        alt: "흐름의 연속 — 같은 날의 감정을 이어 받는 다음 장면",
      },
    },
    demoTestId: "testuser",
    demoTestPassword: "testuser",
    caseStudyTeamInfo: {
      kind: "team",
      teamCount: 4,
      periodLabel: "2026.02 ~ 2026.03 · 49일",
      myRoleBadge: "UX DESIGN · UI SYSTEM · PROTOTYPE",
    },
  },
  {
    id: "sangsangmadang",
    title: "Sangsangmadang",
    description:
      "공간 경험을 웹에서 탐색 가능한 흐름으로 재구성한 문화 플랫폼 UX 리디자인 프로젝트",
    subDescription:
      "사용자 탐색 흐름과 콘텐츠 구조 중심으로 재설계한 문화 공간 브랜드 웹사이트 UX 리디자인",
    techStack: ["HTML + CSS", "JavaScript", "jQuery", "PHP", "MySQL"],
    tags: ["UX/UI Design", "Branding", "Redesign", "Frontend"],
    period: "2026.01 - 2026.02 (약 4주)",
    role: "UX Research · UX Flow Design · UI Design · Frontend Implementation",
    visual: {
      label: "03",
      meta: "Cultural Platform",
      variant: "ink",
    },
    to: ROUTES.caseStudySangsangmadang,
    githubUrl: "https://github.com/gwonsumin/sangsangmadang-rebranding",
    deployUrl: `${SANGSANGMADANG_DEPLOY_ORIGIN}/`,
    thumbnailSrc: projectPublicUrl(
      "sangsangmadang",
      "sangsangmadang-thumbnail.png",
    ),
    demoTestId: "test",
    demoTestPassword: "1234",
    caseStudyTeamInfo: {
      kind: "solo",
      myRoleBadge: "FULL STACK DESIGN · DEV",
    },
  },
  {
    id: "loopin",
    title: "LoopIn",
    description:
      "직무 학습 자료를 발견 → 저장 → 이어가기 흐름으로 연결하는 탐색 중심 EduTech 플랫폼",
    subDescription:
      "발견 → 저장 → 이어가기 흐름으로 연결하는 탐색 중심 직무 학습 EduTech 플랫폼",
    techStack: [
      "Next.js",
      "TanStack Query",
      "MongoDB",
      "shadcn/ui",
      "Tailwind CSS",
      "Figma",
    ],
    tags: ["UX/UI Design", "EduTech", "Information Architecture", "Frontend"],
    period: LOOPIN_PERIOD_LABEL,
    role: "UX Flow Design · UI Design · Frontend Implementation",
    visual: {
      label: "04",
      meta: "EduTech Platform",
      variant: "teal",
    },
    to: ROUTES.caseStudyLoopin,
    githubUrl: "https://github.com/gwonsumin/LoopIn",
    deployUrl: "https://loop-in-mu.vercel.app/",
    demoTestId: "test@loopin.kr",
    demoTestPassword: "loopin1234",
    thumbnailSrc: projectPublicUrl("loopin", "loopin-thumbnail.png"),
    caseStudyTeamInfo: {
      kind: "solo",
      periodLabel: LOOPIN_PERIOD_LABEL,
      myRoleBadge: "UX DESIGN · IA · FRONTEND",
    },
  },
  {
    id: "taemin",
    title: "TAEMIN World Tour <LiMiNaL>",
    description:
      "태민의 2026-27 월드투어 공식 사이트. 비개발자 클라이언트가 구글시트만으로 투어 일정을 직접 운영할 수 있도록 설계·구현했습니다.",
    subDescription:
      "관리자 페이지 없이 구글시트 연동만으로 운영되는 아티스트 월드투어 공식 사이트",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "papaparse",
      "zod",
      "Google Sheets",
    ],
    tags: [
      "UX/UI Design",
      "Frontend Development",
      "Official Tour Site",
      "No-CMS Architecture",
    ],
    period: "2026.07 ~ 2026.08 · 12일",
    role: "UX Flow Design · UI Design · Next.js Frontend · Data Sync Architecture",
    visual: {
      label: "05",
      meta: "Tour Site",
      variant: "ink",
    },
    to: ROUTES.caseStudyTaemin,
    deployUrl: `${TAEMIN_DEPLOY_ORIGIN}/`,
    thumbnailSrc: projectPublicUrl("taemin", "taemin-thumbnail.png"),
    caseStudyTeamInfo: {
      kind: "solo",
      myRoleBadge: "UX DESIGN · FRONTEND · DATA ARCHITECTURE",
    },
  },
];

export function getSelectedProjectBySlug(
  slug: string | undefined,
): ProjectPreview | undefined {
  if (!slug) {
    return undefined;
  }
  return selectedProjects.find((p) => p.id === slug);
}
