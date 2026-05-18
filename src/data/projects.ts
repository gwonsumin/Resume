import { ROUTES } from '../config/routes'
import type { ProjectPreview } from '../types/project'

const PDF_BASE_PATH = `${import.meta.env.BASE_URL}assets/files`

const tonePublicThumb = (file: string) => `${import.meta.env.BASE_URL}projects/tone/${file}`

/** GOREON production origin (no trailing slash) — shared with case study deep links. */
export const GOREON_DEPLOY_ORIGIN = 'https://goreon.vercel.app' as const

/** TONE production origin (no trailing slash) — Vue app routes are under this host. */
export const TONE_DEPLOY_ORIGIN = 'https://toneapp.dothome.co.kr' as const

/** Sangsangmadang PHP deploy origin (no trailing slash). */
export const SANGSANGMADANG_DEPLOY_ORIGIN = 'https://gsumin8327.dothome.co.kr' as const

export const selectedProjects: readonly ProjectPreview[] = [
  {
    id: 'goreon',
    title: 'GOREON',
    description:
      'AI 기반 전자기기 쇼핑에서 사용자의 상황을 이해하고 더 쉬운 선택을 돕는 추천 경험',
    subDescription:
      '복잡한 스펙과 비교 과정에서 발생하는 사용자의 선택 부담을 줄이기 위해, AI 대화 기반 추천과 비교 구조를 결합한 쇼핑 서비스',
    techStack: [
      'React',
      'Redux Toolkit',
      'Node.js',
      'MongoDB',
      'OpenAI API',
      'Cloudflare R2',
      'Figma',
    ],
    tags: ['UX/UI Design', 'AI Recommendation', 'E-commerce', 'Frontend'],
    period: '2026.03 - 2026.04 (약 4주)',
    role: 'UX Flow Design · UI Design · Prototype · Frontend Collaboration',
    visual: {
      label: 'Case log 01',
      meta: 'AI Commerce',
      variant: 'coral',
    },
    to: ROUTES.caseStudyGoreon,
    githubUrl: 'https://github.com/gwonsumin/GOREON',
    deployUrl: `${GOREON_DEPLOY_ORIGIN}/`,
    proposalUrl: `${PDF_BASE_PATH}/GOREON-Proposal.pdf`,
    demoTestId: 'test@test.com',
    demoTestPassword: '123123123',
    thumbnailSrc: `${import.meta.env.BASE_URL}projects/goreon/goreon-thumbnail.png`,
  },
  {
    id: 'tone',
    title: 'TONE',
    description:
      'TONE은 팬톤 컬러 기반의 데일리 톤과 플레이리스트를 제공하고, 사용자가 하루의 감정을 색과 음악으로 기록할 수 있도록 설계한 모바일 뮤직 플랫폼입니다.',
    techStack: ['Vue', 'Pinia', 'PHP', 'MySQL', 'OpenAI API', 'Cloudflare R2'],
    tags: ['UX/UI', 'Vue', 'PHP', 'Emotion Record', 'Music Platform'],
    period: '2026.02 - 2026.03 (약 7주)',
    role: 'UX Flow Design · UI Design System · Prototype · Vue Frontend Collaboration',
    visual: {
      label: 'Case log 02',
      meta: 'Emotion Archive',
      variant: 'teal',
    },
    to: ROUTES.caseStudyTone,
    prototypeUrl:
      'https://www.figma.com/proto/CPHFRbBDBqaBRVcCQzwULV/%EB%94%94%EC%9E%90%EC%9D%B8?node-id=290-6422&p=f&t=OGzQaCRN52M5DVZr-0&scaling=scale-down&content-scaling=fixed&page-id=290%3A6295&starting-point-node-id=290%3A6540&show-proto-sidebar=1',
    proposalUrl: `${PDF_BASE_PATH}/TONE-Proposal.pdf`,
    githubUrl: 'https://github.com/gwonsumin/TONE',
    deployUrl: TONE_DEPLOY_ORIGIN,
    deployWindow: { width: 430, height: 850, name: 'TONEPreview' },
    thumbnailSrc: `${import.meta.env.BASE_URL}projects/tone/tone-thumbnail-02.png`,
    heroStaggeredScreens: {
      left: {
        src: tonePublicThumb('tone-thumbnail-01.png'),
        alt: '감정 흐름 첫 단계 — 하루의 톤을 고르기 전 화면',
      },
      center: {
        src: tonePublicThumb('tone-thumbnail-02.png'),
        alt: '중심 화면 — 선택한 감정 톤에서 음악으로 이어지는 플레이어',
      },
      right: {
        src: tonePublicThumb('tone-thumbnail-03.png'),
        alt: '흐름의 연속 — 같은 날의 감정을 이어 받는 다음 장면',
      },
    },
    demoTestId: 'testuser',
    demoTestPassword: 'testuser',
  },
  {
    id: 'sangsangmadang',
    title: 'Sangsangmadang',
    description:
      '공간 경험을 웹에서 탐색 가능한 흐름으로 재구성한 문화 플랫폼 UX 리디자인 프로젝트',
    subDescription:
      '브랜드 아이덴티티와 사용자 경험이 분리되어 있던 기존 웹사이트를 사용자 탐색 흐름과 콘텐츠 구조 중심으로 재설계해 더 직관적인 공간 경험을 제공',
    techStack: ['HTML + CSS', 'JavaScript', 'jQuery', 'PHP', 'MySQL'],
    tags: ['UX/UI Design', 'Branding', 'Redesign', 'Frontend'],
    period: '2026.01 - 2026.02 (약 4주)',
    role: 'UX Research · UX Flow Design · UI Design · Frontend Implementation',
    visual: {
      label: 'Case log 03',
      meta: 'Cultural Platform',
      variant: 'ink',
    },
    to: ROUTES.caseStudySangsangmadang,
    githubUrl: 'https://github.com/gwonsumin/sangsangmadang-rebranding',
    deployUrl: `${SANGSANGMADANG_DEPLOY_ORIGIN}/`,
    thumbnailSrc: `${import.meta.env.BASE_URL}projects/sangsangmadang/sangsangmadang-thumbnail.png`,
    demoTestId: 'test',
    demoTestPassword: '1234',
  },
]

export function getSelectedProjectBySlug(
  slug: string | undefined,
): ProjectPreview | undefined {
  if (!slug) {
    return undefined
  }
  return selectedProjects.find((p) => p.id === slug)
}
