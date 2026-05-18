import type {
  CaseStudyContent,
  CaseStudyServiceLink,
} from "../types/caseStudy";
import {
  GOREON_DEPLOY_ORIGIN,
  SANGSANGMADANG_DEPLOY_ORIGIN,
  TONE_DEPLOY_ORIGIN,
} from "./projects";

const goreonPublic = (file: string) =>
  `${import.meta.env.BASE_URL}projects/goreon/${file}`;

const tonePublic = (file: string) =>
  `${import.meta.env.BASE_URL}projects/tone/${file}`;

const ssmPublic = (file: string) =>
  `${import.meta.env.BASE_URL}projects/sangsangmadang/${file}`;

function p(...lines: string[]): readonly string[] {
  return lines;
}

const GOREON_SERVICE_LINKS: readonly CaseStudyServiceLink[] = [
  {
    label: "Home",
    title: "질문 시작 화면",
    href: `${GOREON_DEPLOY_ORIGIN}/`,
    featured: false,
    description:
      "서비스 첫 진입 화면에서 조건 질문으로 추천 흐름이 시작되는 구조를 확인할 수 있습니다.",
  },
  {
    label: "AI Chat",
    title: "조건 정리 화면",
    href: `${GOREON_DEPLOY_ORIGIN}/#ai_chat`,
    featured: true,
    description:
      "대화 입력을 통해 예산, 사용 목적, 선호 조건이 정리되는 추천 진입 흐름을 확인할 수 있습니다.",
  },
  {
    label: "Product List",
    title: "후보 추천 화면",
    href: `${GOREON_DEPLOY_ORIGIN}/list`,
    featured: true,
    description:
      "정리된 조건을 바탕으로 추천 후보를 탐색하고 비교 대상을 고르는 화면을 확인할 수 있습니다.",
  },
  {
    label: "Product Detail",
    title: "상세 비교 화면",
    href: `${GOREON_DEPLOY_ORIGIN}/product/1`,
    featured: false,
    description:
      "선택한 후보의 상세 정보와 판단 기준이 어떻게 정리되는지 확인할 수 있습니다.",
  },
  {
    label: "Wishlist",
    title: "저장한 후보 화면",
    href: `${GOREON_DEPLOY_ORIGIN}/wishlist`,
    featured: false,
    description:
      "관심 후보를 저장한 뒤 다시 비교하거나 선택을 이어가는 화면을 확인할 수 있습니다.",
  },
  {
    label: "Cart",
    title: "구매 전환 화면",
    href: `${GOREON_DEPLOY_ORIGIN}/cart`,
    featured: false,
    description:
      "최종 후보를 장바구니에 담고 구매 단계로 이어지는 전환 화면을 확인할 수 있습니다.",
  },
  {
    label: "Login",
    title: "로그인 화면",
    href: `${GOREON_DEPLOY_ORIGIN}/login`,
    featured: false,
    description:
      "로그인 후 저장한 후보와 구매 흐름이 이어지는 서비스 진입 화면을 확인할 수 있습니다.",
  },
];

const GOREON_VERIFICATION_POINTS: readonly string[] = [
  "질문에서 후보 압축으로 이어지는 판단 시작 흐름을 확인하실 수 있습니다.",
  "비교-저장-재진입으로 이어지는 선택 유지 구조를 확인하실 수 있습니다.",
  "로그인 후 저장과 구매 전환이 연속적으로 이어지는 흐름을 확인하실 수 있습니다.",
];

/** Paths match `frontend/src/router/index.js` on gwonsumin/TONE (main). */
const TONE_SERVICE_LINKS: readonly CaseStudyServiceLink[] = [
  {
    label: "For You",
    title: "오늘의 톤 추천",
    description:
      "스플래시·로그인 후 메인 탭에서 Daily Tone·스펙트럼 기반 오늘의 컬러/음악 추천을 확인할 수 있습니다.",
    href: `${TONE_DEPLOY_ORIGIN}/`,
    type: "mobile-preview",
    featured: true,
  },
  {
    label: "Color Charts",
    title: "컬러 차트 탐색",
    description:
      "인기 컬러 플레이리스트와 좋아요·저장 흐름을 컬러 차트 탭에서 확인할 수 있습니다.",
    href: `${TONE_DEPLOY_ORIGIN}/color-chart`,
    type: "mobile-preview",
    featured: true,
  },
  {
    label: "Player",
    title: "메인 플레이어",
    description:
      "로그인 후 /main에서 음악·뮤비 전환, 재생, 셔플, 반복, 저장 UX를 확인할 수 있습니다.",
    href: `${TONE_DEPLOY_ORIGIN}/main`,
    type: "mobile-preview",
    featured: true,
  },
  {
    label: "Category",
    title: "무드 카테고리",
    description: "컬러별 음악 리스트와 재생 진입 흐름을 확인할 수 있습니다.",
    href: `${TONE_DEPLOY_ORIGIN}/category`,
    type: "mobile-preview",
  },
  {
    label: "Palette Log",
    title: "저장한 플레이리스트",
    description:
      "저장한 컬러 플레이리스트가 쌓이는 팔레트 로그 구조를 확인할 수 있습니다.",
    href: `${TONE_DEPLOY_ORIGIN}/palette-log`,
    type: "mobile-preview",
  },
  {
    label: "Calendar",
    title: "감정 기록 캘린더",
    description: "날짜별 컬러, 음악, 메모 기록 흐름을 확인할 수 있습니다.",
    href: `${TONE_DEPLOY_ORIGIN}/calendar`,
    type: "mobile-preview",
  },
  {
    label: "Search",
    title: "AI 검색 추천",
    description:
      "검색 화면에서 자연어 기반 컬러 플레이리스트 추천 흐름을 확인할 수 있습니다.",
    href: `${TONE_DEPLOY_ORIGIN}/search`,
    type: "mobile-preview",
  },
];

const TONE_VERIFICATION_POINTS: readonly string[] = [
  "Daily Tone에서 오늘의 컬러와 추천 음악을 확인할 수 있습니다.",
  "Color Charts와 Category를 통해 컬러 기반 음악 탐색 구조를 확인할 수 있습니다.",
  "Playlist와 Player에서 재생, 뮤비 전환, 셔플, 반복, 저장 UX를 확인할 수 있습니다.",
  "Palette Log와 Calendar에서 음악 감상이 감정 기록으로 이어지는 흐름을 확인할 수 있습니다.",
  "Search에서 OpenAI 기반 자연어 추천 흐름을 확인할 수 있습니다.",
];

const SSM = SANGSANGMADANG_DEPLOY_ORIGIN;

const SANGSANGMADANG_SERVICE_LINKS: readonly CaseStudyServiceLink[] = [
  {
    tier: "primary",
    label: "Main Website",
    title: "메인 페이지",
    href: `${SSM}/`,
    type: "external",
    description:
      "메인에 머물며 브랜드의 리듬과 최신 운영 소식을 읽고, 프로그램·공간·기록으로 탐색을 분기하는 진입면입니다.",
  },
  {
    tier: "primary",
    label: "Program Archive",
    title: "프로그램·공연 목록",
    href: `${SSM}/sub_01.php`,
    type: "external",
    description:
      "진행 중인 공연·프로그램을 아카이브처럼 넘겨 보며 일정과 장소 맥락을 비교하고, 상세 탐색으로 자연스럽게 이어지는 축입니다.",
  },
  {
    tier: "primary",
    label: "Performance Detail",
    title: "프로그램 상세 페이지",
    href: `${SSM}/sub_01_01.php`,
    type: "external",
    description:
      "한 작품·프로그램에 대한 판단 정보와 본문이 한 화면에 모이는, 탐색 질문이 정리되는 깊은 레이어입니다.",
  },
  {
    tier: "secondary",
    label: "Community Archive",
    title: "게시판 목록",
    href: `${SSM}/board_list.php`,
    type: "external",
    description:
      "공지와 커뮤니티 흔적이 리스트로 남는 층으로, 플랫폼이 ‘살아 있는 기록’을 어떻게 보여 주는지 확인할 수 있습니다.",
  },
  {
    tier: "secondary",
    label: "Member Experience",
    title: "회원 정보 수정",
    href: `${SSM}/member_modify_form.php`,
    type: "external",
    description:
      "로그인 이후에도 탐색 맥락이 끊기지 않도록 회원 정보와 설정이 정리된, 사람 중심의 보조 표면입니다.",
  },
  {
    tier: "secondary",
    label: "Operation System",
    title: "게시글 작성 폼",
    href: `${SSM}/board_form.php`,
    type: "external",
    description:
      "콘텐츠를 올리고 다듬는 운영자의 입구로, 사용자에게 보이는 탐색 구조 뒤쪽에서 플랫폼이 어떻게 돌아가는지 보여 줍니다.",
  },
];

const SANGSANGMADANG_VERIFICATION_POINTS: readonly string[] = [
  "메인 → 프로그램 → 상세로 이어지는 문화 콘텐츠 탐색 축을 실제 화면에서 따라가 볼 수 있습니다.",
  "게시판·회원 맥락이 같은 도메인 안에서 어떻게 이어지는지, 아카이브 표면으로 확인할 수 있습니다.",
  "운영 작성 화면까지 열람해 ‘보이는 탐색’과 ‘돌아가는 구조’를 함께 검증해 볼 수 있습니다.",
];

const placeholderIntro = (name: string) =>
  p(
    `${name} 프로젝트의 문제 정의부터 결과까지를 동일한 케이스 스터디 구조로 정리한 페이지입니다.`,
  );

const placeholderBlock = (label: string) =>
  p(
    `${label} 섹션은 현재 정리 중입니다. 리서치 근거, 의사결정 과정, 화면 결과와 성과를 순서대로 추가할 예정입니다.`,
  );

function makeCaseStudy(
  name: string,
  overrides: Partial<CaseStudyContent>,
): CaseStudyContent {
  const base: CaseStudyContent = {
    intro: placeholderIntro(name),
    problem: placeholderBlock("Problem"),
    insight: placeholderBlock("Insight"),
    iaUserFlow: placeholderBlock("IA / User Flow"),
    solution: placeholderBlock("Solution"),
    uiDesign: placeholderBlock("UI design"),
    result: placeholderBlock("Result"),
    learnings: placeholderBlock("Learnings"),
  };
  return { ...base, ...overrides };
}

const caseStudies: Readonly<Record<string, CaseStudyContent>> = {
  goreon: makeCaseStudy("GOREON", {
    intro: p(
      "GOREON은 전자기기 선택 과정에서 발생하는 판단 피로를 줄이기 위해 설계한 UX 프로젝트입니다.",
      "사용자가 자신의 조건을 단계적으로 정리하고, 결정 가능한 후보로 좁혀가며, 비교와 저장을 거쳐 구매까지 이어지도록 경험을 구성했습니다.",
    ),
    sectionTitles: {
      problem: "Problem",
      insight: "Insight",
      solution: "Solution",
      iaUserFlow: "UX Flow",
      result: "Key Experience",
      learnings: "Learnings",
    },
    myRole: {
      summary: p(
        "권수민은 4주 동안 프로젝트 전 구간을 리드하며 문제 정의부터 화면 구현까지 하나의 UX 의사결정 체계로 연결했습니다.",
        "기능 나열이 아니라 선택 흐름 설계를 기준으로 화면 우선순위를 정리해, 사용자의 결정 부담을 줄이는 방향으로 프로젝트를 완성했습니다.",
      ),
      roles: [
        {
          title: "UX Flow Design",
          detail:
            "1-2주차에 묻기 → 좁히기 → 비교하기 → 저장하기 → 구매하기 여정을 핵심 흐름으로 정의하고, 화면 우선순위를 이 순서에 맞췄습니다.",
        },
        {
          title: "AI Chat Interaction Design",
          detail:
            "질문과 응답이 반복될수록 후보가 압축되는 대화 구조를 설계해, 재입력 없이도 판단을 이어갈 수 있도록 만들었습니다.",
        },
        {
          title: "Core Screen UI Design",
          detail:
            "2-3주차에 메인, 후보 목록, 상세 화면의 정보 계층과 액션 리듬을 통일해 비교 판단 정보가 빠르게 읽히도록 구성했습니다.",
        },
        {
          title: "Purchase Flow UX Design",
          detail:
            "저장한 후보가 구매 단계로 자연스럽게 이어지도록 전환 흐름을 정리하고, 단계별 상태 피드백을 명확히 설계했습니다.",
        },
        {
          title: "Design System Direction",
          detail:
            "컴포넌트와 상태 표현 규칙을 문서화해 화면 간 해석 오차를 줄이고 선택 흐름의 일관성을 확보했습니다.",
        },
        {
          title: "React Frontend Collaboration",
          detail:
            "3-4주차에 React 화면 일부를 직접 구현하며 UX 의도를 상태/컴포넌트 단위로 정렬해 디자인-개발 간 간극을 줄였습니다.",
        },
      ],
      contributions: [
        { label: "프로젝트 전 구간 관여", percentage: 100 },
        { label: "디자인팀 리딩", percentage: 100 },
        { label: "UX Flow / IA 설계", percentage: 90 },
        { label: "핵심 UI 설계", percentage: 90 },
        { label: "프론트 구현", percentage: 40 },
      ],
    },
    problem: p(
      "전자기기 쇼핑에서는 비교해야 할 정보가 많아 사용자가 무엇부터 판단해야 하는지부터 막히는 경우가 많습니다.",
      "특히 자신에게 맞는 후보를 찾기 전까지 탐색을 반복해야 하므로, 결정 이전 단계에서 피로가 빠르게 누적되는 문제가 있었습니다.",
    ),
    insight: p(
      "문제의 핵심은 정보의 양이 아니라, 사용자가 자신의 조건을 결정 가능한 후보로 압축하기 어려운 구조에 있었습니다.",
      "그래서 탐색 중심 화면을 확장하기보다, 질문을 통해 조건을 정리하고 비교 결정을 돕는 흐름 중심 UX로 전환해야 한다고 판단했습니다.",
    ),
    solution: p(
      "GOREON은 사용자의 조건을 단계적으로 묻고, 그 결과를 후보 압축으로 연결해 선택 시작점을 빠르게 만들도록 설계했습니다.",
      "압축된 후보는 비교 근거가 읽히는 형태로 정리하고 저장/재진입 흐름과 연결해, 최종적으로 구매까지 자연스럽게 이어지도록 구성했습니다.",
    ),
    iaUserFlow: p(
      "사용자는 질문에 답하며 조건을 정리하고, 시스템은 조건에 맞는 후보를 압축해 제안합니다.",
      "이후 사용자는 후보를 비교해 판단 근거를 확인하고, 바로 결정하지 못한 경우 저장한 뒤 다시 돌아와 선택을 이어갑니다.",
      "최종적으로 선택된 후보는 구매 단계로 연결되어 탐색이 아닌 결정 중심 여정으로 마무리됩니다.",
    ),
    uxFlowEditorial: {
      title: "선택 흐름 에디토리얼",
      steps: ["묻습니다", "좁힙니다", "비교합니다", "저장합니다", "구매합니다"],
    },
    uiDesign: p(
      "각 화면은 기능 카드처럼 분절되지 않도록 하나의 결정 흐름 안에서 읽히는 타이포 계층과 정보 리듬으로 정리했습니다.",
      "문장 → UX 의도 → 화면 순서를 유지해 사용자가 화면을 보기 전에 먼저 '왜 이 장면이 필요한지'를 이해할 수 있도록 구성했습니다.",
    ),
    result: p(
      "이 프로젝트를 통해 선택 시작 단계의 부담을 줄이고, 사용자가 후보를 더 빠르게 좁혀 비교할 수 있는 경험을 만들었습니다.",
      "또한 저장 후 재진입 흐름을 명확히 설계해 즉시 결정을 강요하지 않으면서도 구매 전환으로 이어지는 구조를 완성했습니다.",
      "결과적으로 GOREON은 기능 소개형 쇼핑몰이 아니라, 선택 흐름을 설계한 UX 사례로 읽히도록 정리되었습니다.",
    ),
    learnings: p(
      "대화형 인터랙션은 기술 요소 자체보다 사용자 판단 흐름 안에 배치될 때 더 분명한 UX 가치를 만든다는 점을 배웠습니다.",
      "또한 커머스 UX에서는 기능 수를 늘리는 것보다 질문-압축-비교-저장-구매 흐름을 끊기지 않게 연결하는 구조가 핵심임을 확인했습니다.",
      "이전에 TONE 프로젝트와 다른 색감을 사용하면서 목적에 따라 더 효과적인 디자인을 완성시킬 수 있다는 것을 배웠습니다.",
    ),
    serviceExperience: {
      title: "실제 서비스 체험",
      description: p(
        "GOREON은 반응형 환경에 맞춰 설계한 전자기기 추천 및 비교 서비스입니다.",
        "질문 시작 화면부터 조건 정리, 후보 추천, 상세 비교, 저장, 구매 전환까지 이어지는 핵심 UX 흐름을 실제 배포 화면에서 확인할 수 있습니다.",
      ),
      mobileNotice:
        "데스크톱과 모바일 화면에 모두 대응한 반응형 서비스이므로 원하는 기기 환경에서 확인할 수 있습니다.",
      serviceLinks: GOREON_SERVICE_LINKS,
      verificationPoints: GOREON_VERIFICATION_POINTS,
      testAccountLead:
        "로그인 후 저장부터 구매 전환까지 연속 흐름을 검증하실 수 있습니다.",
    },
    prototype: {
      href: "https://www.figma.com/proto/zvSNQN4Jn8jAxxiT2zo7uc/%EB%94%94%EC%9E%90%EC%9D%B8?node-id=430-5154&t=3c6ZDjaV8B54Ibax-0&scaling=min-zoom&content-scaling=fixed&page-id=172%3A1911&starting-point-node-id=430%3A5154",
      description:
        "PC/모바일 프로토타입에서 묻기-압축-비교-저장-구매 흐름이 실제 인터랙션으로 어떻게 이어지는지 확인하실 수 있습니다.",
      buttonLabel: "PC 프로토타입 보기",
      extraLinks: [
        {
          href: "https://www.figma.com/proto/zvSNQN4Jn8jAxxiT2zo7uc/%EB%94%94%EC%9E%90%EC%9D%B8?node-id=1085-7486&t=3c6ZDjaV8B54Ibax-0&scaling=scale-down&content-scaling=fixed&page-id=1085%3A6750&starting-point-node-id=1085%3A7486",
          buttonLabel: "모바일 프로토타입 보기",
        },
      ],
    },
    media: {
      hero: {
        desktopSrc: goreonPublic("goreon-detail-thumbnail.png"),
        desktopAlt: "GOREON 케이스 스터디 대표 비주얼",
      },
      prototype: {
        desktopSrc: goreonPublic("goreon-prototype-desktop.png"),
        mobileSrc: goreonPublic("goreon-prototype-mobile.png"),
        desktopAlt: "GOREON PC 프로토타입 화면",
        mobileAlt: "GOREON 모바일 프로토타입 화면",
      },
    },
  }),
  tone: makeCaseStudy("TONE", {
    intro: p(
      "TONE은 플레이리스트 탐색보다 먼저, 사용자가 오늘의 상태를 고르고 감정에 머무르는 시간을 설계한 감정 기록 인터페이스다.",
      "기능 목록을 보여주기보다 Problem → Insight → Solution → Experience 흐름이 자연스럽게 읽히도록 내러티브를 재구성했다.",
    ),
    heroNarrative: {
      leadTitle: "TONE",
      coreMessage: p(
        "오늘의 감정을",
        "색과 음악으로 기록하는",
        "모바일 감정 아카이브",
      ),
      flowLabels: ["Color Tone", "Sound Tone", "Emotion Archive"],
    },
    sectionTitles: {
      solution: "오늘의 상태를 고르는 첫 진입점",
      uiDesign: "Color Tone이 Sound Tone으로 이어지는 순간",
      result: "하루의 감정이 기록으로 남는 구조",
    },
    myRole: {
      summary: p(
        "TONE 프로젝트에서는 기능 단위 작업 나열이 아니라, 사용자의 감정 기록 경험이 끊기지 않도록 핵심 경험 흐름을 설계하고 구현 연결까지 담당했다.",
        "UX Flow 설계부터 UI 시스템 정리, 프로토타입 인터랙션 검증, Vue 기반 프론트 협업까지 하나의 경험 언어로 이어지도록 역할을 수행했다.",
      ),
      roles: [
        {
          title: "UX Flow Design",
          detail:
            "감정 선택 → 톤 기록 → 플레이리스트 추천 → 캘린더 아카이브로 이어지는 메인 여정을 설계하고, 각 단계의 전환 맥락을 정리했다.",
        },
        {
          title: "UI Design System",
          detail:
            "컬러-감정 매핑 규칙과 컴포넌트 기준을 통일해 일관된 화면 리듬을 만들고, 기록 경험의 인지 부담을 줄였다.",
        },
        {
          title: "Prototype Interaction",
          detail:
            "감정 선택/기록/저장 인터랙션을 프로토타입으로 검증해 핵심 태스크의 완료 흐름이 자연스럽게 연결되도록 다듬었다.",
        },
        {
          title: "Main Experience Flow",
          detail:
            "탐색 중심 음악 서비스가 아닌 감정 아카이브 중심 서비스로 경험 프레이밍을 전환하고 주요 화면 우선순위를 정의했다.",
        },
        {
          title: "Frontend Collaboration (Vue)",
          detail:
            "Vue 기반 화면 구현 구조를 개발 관점으로 함께 맞추며 상태 흐름과 UI 의도를 정렬해 디자인-구현 간 간극을 줄였다.",
        },
      ],
      contributions: [
        { label: "기획", percentage: 80 },
        { label: "디자인", percentage: 100 },
        { label: "프론트 구현", percentage: 50 },
      ],
    },
    problem: p(
      "기존 음악 스트리밍 서비스는 검색과 소비 중심 구조에 머물러 있다.",
      "사용자는 자신의 감정을 기록하거나 그날의 상태에 맞는 음악을 직관적으로 찾기 어렵다.",
    ),
    insight: p(
      "문제의 본질은 “음악 탐색”이 아니라 “감정을 표현하고 기억하는 경험의 부재”이다.",
      "→ 음악은 감정을 기록하는 매개가 될 수 있다.",
    ),
    iaUserFlow: p(
      "사용자는 먼저 오늘의 상태를 Color Tone으로 고르고, 그 톤과 연결된 Sound Tone 안에서 음악을 감상한다.",
      "이 경험은 재생으로 끝나지 않고 캘린더에 하루의 감정 레이어로 누적되며 개인 아카이브를 만든다.",
      "핵심 여정은 상태 선택 → 감정 몰입 → 기록 축적의 3단계로 정리된다.",
    ),
    uxFlowEditorial: {
      title: "감정 경험의 흐름",
      steps: ["상태를 고른다", "음악에 머문다", "감정이 기록으로 남는다"],
    },
    prototype: {
      href: "https://www.figma.com/proto/CPHFRbBDBqaBRVcCQzwULV/%EB%94%94%EC%9E%90%EC%9D%B8?node-id=290-6422&p=f&t=OGzQaCRN52M5DVZr-0&scaling=scale-down&content-scaling=fixed&page-id=290%3A6295&starting-point-node-id=290%3A6540&show-proto-sidebar=1",
      prototypeMobileThumbSlot: true,
      description:
        "초반에는 대표 화면만 보여주고, 상세/긴 모바일 흐름은 이 프로토타입 섹션으로 모아 스크롤 피로를 줄였습니다. 모바일 카드를 누르면 Figma에서 상태 선택 → 몰입 → 기록 축적 흐름을 연속으로 확인할 수 있습니다.",
      buttonLabel: "모바일 프로토타입 보기",
    },
    media: {
      hero: {
        staggeredScreens: {
          left: {
            src: tonePublic("tone-thumbnail-01.png"),
            alt: "감정 흐름 첫 단계 — 하루의 톤을 고르기 전 화면",
          },
          center: {
            src: tonePublic("tone-thumbnail-02.png"),
            alt: "중심 화면 — 선택한 감정 톤에서 음악으로 이어지는 플레이어",
          },
          right: {
            src: tonePublic("tone-thumbnail-03.png"),
            alt: "흐름의 연속 — 같은 날의 감정을 이어 받는 다음 장면",
          },
        },
      },
      prototype: {
        mobileSrc: tonePublic("tone-prototype-mobile.png"),
        mobileAlt: "TONE 모바일 Figma 프로토타입 목업",
      },
      sectionFigures: {
        solution: {
          src: tonePublic("tone-palette.png"),
          alt: "오늘의 상태를 고르기 위한 감정 컬러 선택 화면",
          presentation: "palette",
        },
        uiDesign: {
          src: tonePublic("tone-player.png"),
          alt: "Color Tone이 Sound Tone으로 전환되는 플레이어 몰입 화면",
          presentation: "player",
        },
      },
    },
    solution: p(
      "Palette는 컬러를 고르는 기능 화면이 아니라, 사용자가 오늘의 상태를 먼저 자각하게 만드는 첫 진입점으로 설계했다.",
      "선택지는 많은 옵션 대신 감정 단위로 압축해 결정 피로를 줄였고, 한 번의 선택이 다음 경험으로 이어질 수 있도록 진입 리듬을 단순화했다.",
    ),
    uiDesign: p(
      "Player는 재생 컨트롤을 나열하는 구간이 아니라, Color Tone이 Sound Tone으로 자연스럽게 이어지는 전환의 순간에 집중했다.",
      "같은 톤의 레이어 안에서 컬러와 사운드가 함께 반응하도록 구성해 사용자가 기능을 조작하기보다 감정에 머무는 경험을 우선하도록 만들었다.",
    ),
    result: p(
      "Calendar는 데이터를 모아두는 저장소가 아니라, 하루의 상태가 시간축 위에 남는 감정 아카이브로 읽히도록 설계했다.",
      "사용자는 날짜를 다시 열어보며 그날의 색과 음악을 함께 회상할 수 있고, 기록 행위 자체가 서비스 재방문 동기가 되도록 경험을 구성했다.",
    ),
    learnings: p(
      "감정을 기반으로 한 UX 설계에서 '기록 경험'이 사용자 몰입을 높인다는 것을 이해했다.",
      "또한 사용자가 자신의 상태를 표현할 수 있는 인터페이스가 제이처 기반 추천보다 먼저 설계되어야 한다는 점을 배웠다.",
      "특히 '기록'이라는 행동이 단순 기능이 아니라 사용자의 경험을 지속시키는 핵심 요소라는 것을 느꼈다.",
    ),
    serviceExperience: {
      title: "실제 서비스 체험",
      description: p(
        "TONE은 모바일 환경에 최적화된 감정 기반 음악 추천 서비스입니다.",
        "오늘의 컬러 추천부터 플레이리스트 재생, 저장, 캘린더 기록까지 이어지는 핵심 UX 흐름을 실제 배포 화면에서 확인할 수 있습니다.",
      ),
      mobileNotice:
        "모바일 기준으로 설계된 서비스이므로 모바일 기기 또는 브라우저 모바일 뷰에서 확인하는 것을 권장합니다.",
      serviceLinks: TONE_SERVICE_LINKS,
      verificationPoints: TONE_VERIFICATION_POINTS,
      testAccountLead:
        "테스트 계정으로 로그인한 뒤 탭·플레이어·저장·캘린더 흐름을 확인할 수 있습니다.",
    },
  }),
  sangsangmadang: makeCaseStudy("Sangsangmadang", {
    intro: p(
      "상상마당은 복합문화공간의 브랜드, 공간, 문화 프로그램을 사용자 탐색 흐름 중심으로 재구조화한 foundation 프로젝트입니다.",
      "시각적 리브랜딩이 아닌 정보 구조 설계부터 시작해, PHP/MySQL 기반 운영 기능 구현과 실서버 배포까지 하나의 완성된 문화 플랫폼으로 연결했습니다.",
    ),
    media: {
      hero: {
        desktopSrc: ssmPublic("sangsangmadang-thumbnail.png"),
        desktopAlt: "상상마당 케이스 스터디 대표 비주얼",
      },
    },
    sectionTitles: {
      intro: "Project Overview",
      problem: "Program Structure",
      insight: "Detail Page · Content Experience",
      iaUserFlow: "IA / User Flow",
      solution: "Platform as Archive",
      uiDesign: "Website Surface",
      result: "Operations",
      learnings: "Reflection",
    },
    myRole: {
      summary: p(
        "개인 프로젝트로 기획, UI 디자인, 퍼블리싱, PHP 개발, MySQL 연동, 서버 배포까지 전 과정을 담당했습니다.",
        "기능 구현 나열이 아닌 UX 의사결정 단위로 역할을 구분해, 정보 구조 설계부터 운영형 게시판까지 하나의 경험 흐름으로 완성했습니다.",
      ),
      roles: [
        {
          title: "UX Planning",
          detail:
            "지점·프로그램·공간·뉴스 정보를 방문 목적 기준으로 재분류하고 핵심 탐색 흐름을 정의했습니다.",
        },
        {
          title: "Information Architecture",
          detail:
            "메인에서 주요 콘텐츠를 먼저 확인하고, 프로그램·공지 상세로 자연스럽게 이동할 수 있도록 메뉴 구조와 콘텐츠 우선순위를 정리했습니다.",
        },
        {
          title: "UI Design",
          detail:
            "문화 콘텐츠의 분위기를 유지하면서도 섹션 구성과 카드형 콘텐츠 표현이 명확하게 읽히도록 편집 리듬을 설계했습니다.",
        },
        {
          title: "Publishing",
          detail:
            "HTML, CSS, JavaScript, jQuery를 활용해 메인·서브 페이지를 구현하고 화면 전환과 콘텐츠 노출 흐름을 맞췄습니다.",
        },
        {
          title: "PHP Development",
          detail:
            "PHP와 MySQL로 공지사항 CRUD 게시판과 이미지 업로드 기능을 직접 구현했습니다.",
        },
        {
          title: "Deploy",
          detail:
            "Dothome 서버와 FileZilla로 실제 접속 가능한 웹사이트를 배포하고 운영 환경에서 기능을 검증했습니다.",
        },
      ],
      contributions: [
        { label: "기획", percentage: 100 },
        { label: "UX / IA 설계", percentage: 100 },
        { label: "UI 디자인", percentage: 100 },
        { label: "퍼블리싱", percentage: 100 },
        { label: "PHP / MySQL 구현", percentage: 100 },
        { label: "배포", percentage: 100 },
      ],
    },
    problem: p(
      "지점·프로그램·공간·뉴스가 한꺼번에 쌓이면 방문 목적별로 무엇을 먼저 봐야 할지 분기하기 어렵습니다.",
      "프로그램 리스트와 상세로 이어지는 흐름을 정리해, 일정·장소·요약 정보가 한 화면에서 읽히도록 구조를 맞췄습니다.",
    ),
    insight: p(
      "목적별 탐색이 가능해지려면 ‘탐색 질문이 끝나는 지점’에 상세 경험이 와야 합니다.",
      "상세 화면에는 판단에 필요한 본문과 운영 정보를 모으고, 맥락 없는 장식보다 읽기 리듬을 우선했습니다.",
    ),
    iaUserFlow: p(
      "사용자는 메인에서 상상마당의 핵심 공간과 운영 정보를 먼저 확인하고, 프로그램·공간·뉴스/공지로 이동해 필요한 상세 정보를 탐색합니다.",
      "공지사항은 DB와 연동해 최신 게시글이 메인에 자동 노출되도록 구성했습니다.",
      "핵심 흐름: 메인 진입 → 지점/공간 확인 → 프로그램 탐색 → 뉴스/공지 → 상세 정보.",
    ),
    solution: p(
      "문화공간의 핵심 정보를 프로그램·공간·뉴스 흐름으로 재정리하고, 메인에서 주요 콘텐츠와 최신 공지를 바로 확인할 수 있도록 탐색 구조를 개선했습니다.",
      "PHP/MySQL 기반 게시판 CRUD를 직접 구현해 공지 작성, 조회, 수정, 삭제, 이미지 업로드가 가능한 운영형 플랫폼 구조를 완성했습니다.",
    ),
    uiDesign: p(
      "메인 화면은 문화공간의 분위기와 현재 진행 중인 콘텐츠를 빠르게 인지할 수 있도록 구성했습니다.",
      "프로그램·뉴스 콘텐츠는 카테고리·제목·장소·일정 등 판단에 필요한 정보를 먼저 노출해 상세 페이지로 이동 전에 핵심 내용을 파악할 수 있게 했습니다.",
    ),
    result: p(
      "복합문화공간의 콘텐츠를 방문 목적에 따라 탐색할 수 있는 구조로 재편했습니다.",
      "정적 리브랜딩에 그치지 않고 PHP/MySQL 게시판과 실서버 배포까지 연결해 운영 가능한 문화 플랫폼으로 완성했습니다.",
    ),
    learnings: p(
      "GOREON이 AI 기반 UX를 탐구하고, TONE이 감정 인터랙션을 설계하기 이전에—상상마당은 브랜드와 공간을 UX 구조로 해석하는 foundation 작업이었습니다.",
      "리브랜딩에서도 시각적 변화보다 사용자의 탐색 방식과 운영자의 관리 흐름이 함께 설계되어야 한다는 것, PHP/MySQL로 화면·데이터·배포가 연결되는 웹 서비스의 기본 구조를 몸소 경험했습니다.",
    ),
    serviceExperience: {
      title: "Platform Experience",
      description: p(
        "배포된 사이트는 기능 목록이 아니라, 문화 콘텐츠를 어떤 순서로 읽고 이동할지 보여 주는 탐색 표면의 묶음입니다.",
        "아래 카드는 화면 이름이 아니라 ‘어떤 흐름을 열어볼 수 있는지’를 안내합니다. 상단은 방문자가 가장 먼저 마주하는 문화 플랫폼의 축이고, 하단은 그 뒤를 받치는 기록·회원·운영 레이어입니다.",
      ),
      secondaryBandLabel: "Archive · member · operations",
      serviceLinks: SANGSANGMADANG_SERVICE_LINKS,
      verificationPoints: SANGSANGMADANG_VERIFICATION_POINTS,
      testAccountLead:
        "테스트 계정으로 로그인한 뒤 회원 화면과 커뮤니티·운영 흐름을 이어 확인해 보실 수 있습니다.",
    },
    browserScrollPreviews: {
      intro: [
        {
          title: "Main page · scroll preview",
          pages: [
            {
              src: ssmPublic("sangsangmadang-main-full.png"),
              alt: "상상마당 메인 페이지 전체",
            },
          ],
        },
      ],
      problem: [
        {
          title: "Program structure · scroll preview",
          pages: [
            {
              src: ssmPublic("sangsangmadang-program-full.png"),
              alt: "상상마당 프로그램 페이지 전체",
            },
          ],
        },
      ],
      insight: [
        {
          title: "Detail page · scroll preview",
          pages: [
            {
              src: ssmPublic("sangsangmadang-detail-full.png"),
              alt: "상상마당 상세 페이지 전체",
            },
          ],
        },
      ],
    },
    sectionImageLayout: {
      solution: 'row',
      result: 'row',
    },
    sectionImages: {
      solution: [
        {
          src: ssmPublic('sangsangmadang-board.png'),
          alt: '상상마당 게시판 화면',
        },
        {
          src: ssmPublic('sangsangmadang-login.png'),
          alt: '상상마당 로그인 화면',
        },
        {
          src: ssmPublic('sangsangmadang-mypage.png'),
          alt: '상상마당 마이페이지 화면',
        },
      ],
      result: [
        {
          src: ssmPublic('sangsangmadang-admin1.png'),
          alt: '상상마당 관리자 화면 1',
        },
        {
          src: ssmPublic('sangsangmadang-admin2.png'),
          alt: '상상마당 관리자 화면 2',
        },
      ],
    },
  }),
};

export function getCaseStudyContent(
  slug: string,
): CaseStudyContent | undefined {
  return caseStudies[slug];
}
