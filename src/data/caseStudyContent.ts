import type { CaseStudyContent } from "../types/caseStudy";

function p(...lines: string[]): readonly string[] {
  return lines;
}

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
      "전자기기 선택의 복잡함을 AI 추천 흐름으로 줄인 쇼핑몰 UX.",
      "GOREON은 사용자의 선택 정보를 바탕으로 맞춤형 전자기기를 추천하고, 탐색부터 비교, 저장, 구매까지 이어지는 쇼핑 경험을 설계한 AI 기반 커머스 프로젝트입니다.",
    ),
    myRole: {
      summary: p(
        "권수민은 4주 전 구간을 디자인팀 팀장으로 리드하며, 기획-디자인-구현을 하나의 UX 의사결정 체계로 연결했습니다.",
        "AI 인터랙션과 구매 전환 흐름을 단일 여정으로 설계해 탐색 중심 쇼핑을 선택 중심 경험으로 전환했습니다.",
      ),
      roles: [
        {
          title: "UX Flow Design",
          detail:
            "1-2주차에 탐색 → AI 추천 → 비교 → 저장 → 구매를 핵심 여정으로 정의하고, 화면 우선순위를 이 흐름에 고정했습니다.",
        },
        {
          title: "AI Chat Interaction Design",
          detail:
            "AI 입력, 추천 결과, 추천 기록 재진입 구조를 설계해 재입력 없이 선택을 이어가는 대화형 추천 경험을 만들었습니다.",
        },
        {
          title: "Core Screen UI Design",
          detail:
            "2-3주차에 메인, 검색, 리스트, 상세의 정보 계층과 CTA 리듬을 통일해 비교 판단 정보가 빠르게 읽히는 UI를 구축했습니다.",
        },
        {
          title: "Purchase Flow UX Design",
          detail:
            "장바구니-결제-리뷰를 단절 없이 연결하고, 단계별 상태 피드백을 명확히 설계해 이탈 요인을 줄였습니다.",
        },
        {
          title: "Design System Direction",
          detail:
            "컴포넌트, 폼, 상태 표현 규칙을 문서화해 화면 일관성을 확보하고 구현 해석 오차를 줄였습니다.",
        },
        {
          title: "React Frontend Collaboration",
          detail:
            "3-4주차에 React 화면 일부를 직접 구현하고 UX 의도를 상태/컴포넌트 단위로 정렬해 디자인-개발 간극을 줄였습니다.",
        },
      ],
      contributions: [
        { label: "프로젝트 전 구간 관여", percentage: 100 },
        { label: "디자인팀 리딩", percentage: 100 },
        { label: "UX Flow / IA 설계", percentage: 90 },
        { label: "핵심 UI 설계", percentage: 90 },
        { label: "프론트 구현", percentage: 60 },
      ],
    },
    problem: p(
      "전자기기 쇼핑은 제품 종류, 스펙, 가격, 리뷰 등 비교해야 할 정보가 많아 사용자가 빠르게 결정을 내리기 어렵습니다.",
      "특히 자신에게 맞는 상품을 찾기 전까지 검색과 카테고리 탐색을 반복해야 하는 부담이 있습니다.",
    ),
    insight: p(
      "문제의 핵심은 상품 정보가 부족한 것이 아니라, 사용자가 자신의 조건에 맞는 제품 후보를 좁히기 어렵다는 점이었습니다.",
      "따라서 쇼핑 경험의 중심을 단순 탐색에서 사용자 선택 기반 추천 흐름으로 전환해야 한다고 판단했습니다.",
    ),
    iaUserFlow: p(
      "사용자는 검색 또는 카테고리로 상품을 탐색하고, AI 추천을 통해 자신에게 맞는 제품 후보를 확인합니다.",
      "추천 결과는 다시 확인할 수 있는 기록으로 남기고, 상품 상세, 찜, 장바구니, 주문 흐름으로 연결했습니다.",
      "전체 여정은 탐색 → AI 추천 → 비교 → 저장 → 구매 순서로 설계했습니다.",
    ),
    solution: p(
      "GOREON은 사용자의 선택 정보를 바탕으로 AI 추천 흐름을 제공해 상품 탐색의 진입 장벽을 낮췄습니다.",
      "추천 결과를 기록으로 다시 확인하고, 찜/장바구니/상세 페이지로 연결해 탐색이 실제 구매 행동으로 이어지도록 설계했습니다.",
      "핵심 기능은 AI 기반 상품 추천, 카테고리 탐색, 추천 기록, 찜/장바구니 기반 구매 연결로 구성했습니다.",
    ),
    uiDesign: p(
      "카드에는 프로젝트의 핵심만 보이도록 AI 추천, 커머스, UX 흐름을 중심으로 정보를 압축했습니다.",
      "상세 화면에서는 문제 정의, 사용자 흐름, 추천 기능의 역할, 구매 전환 구조를 순서대로 풀어 UX case study로 읽히도록 구성했습니다.",
      "기술 스택은 카드에서 React, Redux Toolkit, Node.js, MongoDB만 노출하고, 상세에서는 Frontend, Backend, Database, UX/UI, Deploy 기준으로 분리했습니다.",
    ),
    result: p(
      "상품 탐색 → AI 추천 → 비교 → 저장 → 구매로 이어지는 전자기기 쇼핑 UX 흐름을 구축했습니다.",
      "정보가 많은 전자기기 구매 과정에서 사용자가 제품 후보를 빠르게 좁히고 다시 확인할 수 있는 구조를 만들었습니다.",
      "기능 중심 프로젝트 설명을 UX 문제 해결 중심의 포트폴리오 콘텐츠로 재구성했습니다.",
    ),
    learnings: p(
      "AI 기능은 독립된 기술 요소가 아니라 사용자의 의사결정 흐름 안에서 설계될 때 더 명확한 UX 가치가 생긴다는 점을 배웠습니다.",
      "커머스 UX에서는 많은 기능을 보여주는 것보다 탐색, 비교, 저장, 구매의 흐름을 끊기지 않게 연결하는 구조가 중요하다는 것을 확인했습니다.",
    ),
    livePreview: {
      href: "https://goreon.vercel.app/",
      description:
        "배포된 GOREON 서비스입니다. AI 추천, 상품 탐색, 상세 확인, 찜/장바구니 흐름을 실제 화면에서 확인할 수 있습니다.",
      buttonLabel: "라이브 사이트 열기",
    },
    prototype: {
      href: "https://www.figma.com/proto/zvSNQN4Jn8jAxxiT2zo7uc/%EB%94%94%EC%9E%90%EC%9D%B8?node-id=430-5154&t=3c6ZDjaV8B54Ibax-0&scaling=min-zoom&content-scaling=fixed&page-id=172%3A1911&starting-point-node-id=430%3A5154&desktop-link-click-timestamp=1778262100308&desktop-ul-exp-bucket=po",
      description:
        "PC/모바일 두 가지 버전의 Figma 프로토타입을 통해 핵심 사용자 흐름과 인터랙션 구성을 확인할 수 있습니다.",
      buttonLabel: "PC 프로토타입 보기",
      extraLinks: [
        {
          href: "https://www.figma.com/proto/zvSNQN4Jn8jAxxiT2zo7uc/%EB%94%94%EC%9E%90%EC%9D%B8?node-id=1085-7486&t=3c6ZDjaV8B54Ibax-0&scaling=scale-down&content-scaling=fixed&page-id=1085%3A6750&starting-point-node-id=1085%3A7486&desktop-link-click-timestamp=1778262097242&desktop-ul-exp-bucket=po",
          buttonLabel: "모바일 프로토타입 보기",
        },
      ],
    },
  }),
  tone: makeCaseStudy("TONE", {
    intro: p(
      "감정을 기록하고 색으로 축적하며 음악으로 연결되는 아카이브형 음악 UX 서비스.",

      "사용자는 매일의 감정을 컬러 톤(Color)으로 기록하고, 이를 캘린더에 쌓아 자신만의 감정 아카이브를 만든다.",
    ),
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
      "사용자는 감정을 선택하고, 해당 감정을 컬러 톤으로 기록한다.",

      "→ 기록된 감정은 음악 추천으로 연결되며, 캘린더에 누적되어 개인 감정 아카이브를 형성한다.",

      "핵심 흐름은 감정 선택 → 톤 기록 → 음악 추천 → 캘린더 저장 → 히스토리 확인으로 이어진다.",
    ),
    prototype: {
      href: "https://www.figma.com/proto/CPHFRbBDBqaBRVcCQzwULV/%EB%94%94%EC%9E%90%EC%9D%B8?node-id=290-6422&p=f&t=OGzQaCRN52M5DVZr-0&scaling=scale-down&content-scaling=fixed&page-id=290%3A6295&starting-point-node-id=290%3A6540&show-proto-sidebar=1",
      description:
        "모바일 기준으로 제작된 Figma 프로토타입입니다. 감정 기록부터 추천 흐름까지 핵심 여정을 검증했습니다.",
      buttonLabel: "모바일 프로토타입 보기",
    },
    solution: p(
      "감정 기록을 중심으로 음악 경험을 재구성했다.",

      "- 감정을 컬러 톤으로 기록",
      "- 감정 기반 음악 추천 제공",
      "- 캘린더를 통한 감정 아카이브 구축",
    ),
    uiDesign: p(
      "감정과 색을 직관적으로 연결하기 위해 컬러 기반 인터페이스를 중심으로 설계했다.",

      "- 하루의 감정을 하나의 톤(Color)으로 표현",
      "- 컬러를 통해 감정을 직관적으로 인식",
      "- 선택 → 기록 → 추천으로 이어지는 흐름 구성",

      "사용자가 복잡한 입력 없이 자신의 상태를 빠르게 표현할 수 있도록 간결한 인터렉션을 설계했다.",
    ),
    result: p(
      "- 감정 기록 → 추천 → 저장으로 이어지는 UX 흐름 구축",
      "- 사용자가 자신의 감정을 빠르게 선택하고 표현할 수 있는 UX 흐름을 구축",
      "- 음악 소비 중심 경험을 감정 기록 기반의 개인 아카이브 경험으로 전환",
      "- 감정을 기록하는 행위 자체가 음악 경험의 시작이 되도록 UX를 전환",
    ),
    learnings: p(
      "감정을 기반으로 한 UX 설계에서 '기록 경험'이 사용자 몰입을 높인다는 것을 이해했다.",
      "또한 사용자가 자신의 상태를 표현할 수 있는 인터페이스가 제이처 기반 추천보다 먼저 설계되어야 한다는 점을 배웠다.",
      "특히 '기록'이라는 행동이 단순 기능이 아니라 사용자의 경험을 지속시키는 핵심 요소라는 것을 느꼈다.",
    ),
    livePreview: {
      href: "https://tone.dothome.co.kr/splash",
      description:
        "실제로 구현된 인터랙티브 빌드입니다. 배포된 사이트에서 감정 기록부터 추천 흐름까지 직접 사용해 볼 수 있습니다.",
      buttonLabel: "라이브 사이트 열기",
    },
  }),
  sangsangmadang: makeCaseStudy("Sangsangmadang", {
    intro: p(
      "복합문화공간 상상마당의 콘텐츠 탐색 경험을 정보 구조 중심으로 재설계하고, 게시판 기능까지 직접 구현한 리브랜딩 웹사이트.",
      "상상마당의 지점, 프로그램, 공간, 뉴스 정보를 사용자가 목적에 따라 빠르게 탐색할 수 있도록 화면 흐름을 재구성하고 PHP/MySQL 기반 운영 기능까지 연결했습니다.",
    ),
    myRole: {
      summary: p(
        "개인 프로젝트로 기획, UI 디자인, 퍼블리싱, PHP 개발, MySQL 연동, 서버 배포까지 전 과정을 담당했습니다.",
        "팀 프로젝트처럼 역할을 기능 단위가 아닌 UX 의사결정 단위로 분리해, 정보 구조 설계부터 실제 운영형 게시판 구현까지 하나의 완성된 웹 경험으로 연결했습니다.",
      ),
      roles: [
        {
          title: "UX Planning",
          detail:
            "복합문화공간의 지점, 프로그램, 공간, 뉴스 정보를 사용자의 방문 목적에 맞게 다시 분류하고 핵심 탐색 흐름을 정의했습니다.",
        },
        {
          title: "Information Architecture",
          detail:
            "메인에서 주요 콘텐츠를 먼저 확인하고, 프로그램과 공지 상세로 자연스럽게 이동할 수 있도록 메뉴 구조와 콘텐츠 우선순위를 정리했습니다.",
        },
        {
          title: "UI Design",
          detail:
            "문화 콘텐츠의 분위기를 유지하면서도 프로그램, 공간, 공지 정보가 명확하게 읽히도록 섹션 구성과 카드형 콘텐츠 표현을 설계했습니다.",
        },
        {
          title: "Publishing",
          detail:
            "HTML, CSS, JavaScript, jQuery를 활용해 메인 페이지와 서브 페이지를 구현하고 화면 전환과 콘텐츠 노출 흐름을 맞췄습니다.",
        },
        {
          title: "PHP Development",
          detail:
            "PHP와 MySQL을 사용해 공지사항 작성, 조회, 수정, 삭제가 가능한 CRUD 게시판과 이미지 업로드 기능을 직접 구현했습니다.",
        },
        {
          title: "Deploy",
          detail:
            "Dothome 서버와 FileZilla를 활용해 실제 접속 가능한 웹사이트로 배포하고 운영 환경에서 화면과 기능을 확인했습니다.",
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
      "상상마당은 지점, 프로그램, 공간, 뉴스 등 정보 유형이 다양해 사용자가 원하는 콘텐츠를 빠르게 파악하기 어렵습니다.",
      "문화공간의 성격은 명확하지만, 방문 목적에 따라 어떤 콘텐츠를 먼저 봐야 하는지 판단하기 쉬운 탐색 구조가 필요했습니다.",
    ),
    insight: p(
      "문제의 핵심은 콘텐츠 양이 아니라, 사용자가 방문 목적에 따라 정보를 탐색할 수 있는 구조의 부족이라고 판단했습니다.",
      "따라서 브랜드 분위기를 바꾸는 시각적 리브랜딩보다, 문화 콘텐츠를 목적별로 읽고 이동할 수 있는 정보 구조 개선을 우선했습니다.",
    ),
    iaUserFlow: p(
      "사용자는 메인에서 상상마당의 핵심 공간과 운영 정보를 먼저 확인하고, 프로그램, 공간, 뉴스/공지로 이동해 필요한 상세 정보를 탐색합니다.",
      "공지사항은 DB와 연동해 최신 게시글이 메인에 자동 출력되도록 구성해 정적인 소개 사이트가 아닌 운영형 웹사이트 흐름으로 확장했습니다.",
      "주요 흐름은 메인 진입 → 지점/공간 확인 → 프로그램 탐색 → 뉴스/공지 확인 → 상세 정보 확인으로 구성했습니다.",
    ),
    solution: p(
      "문화공간의 핵심 정보를 프로그램, 공간, 뉴스 흐름으로 재정리하고, 메인에서 주요 콘텐츠와 최신 공지를 바로 확인할 수 있도록 탐색 구조를 개선했습니다.",
      "PHP와 MySQL 기반 게시판 CRUD를 직접 구현해 공지 작성, 목록 조회, 상세 조회, 수정, 삭제, 이미지 업로드까지 가능한 운영 기능을 추가했습니다.",
      "핵심 기능은 지점/공간 정보 구조화, 프로그램 탐색, 공지사항 CRUD, 이미지 업로드, 메인 최신 공지 자동 노출로 구성했습니다.",
    ),
    uiDesign: p(
      "메인 화면은 문화공간의 분위기와 현재 진행 중인 콘텐츠를 빠르게 인지할 수 있도록 구성했습니다.",
      "프로그램과 뉴스 콘텐츠는 카테고리, 제목, 장소, 일정 등 판단에 필요한 정보를 우선 노출해 사용자가 상세 페이지로 이동하기 전 핵심 내용을 파악할 수 있게 했습니다.",
      "카드에서는 리브랜딩, 정보 구조, PHP CRUD, 실제 배포 경험만 간결하게 보여주고, 상세 페이지에서는 문제 정의부터 구현 결과까지 UX case study 흐름으로 확장했습니다.",
    ),
    result: p(
      "복합문화공간의 콘텐츠를 사용자가 목적에 따라 탐색할 수 있는 웹사이트 구조로 재구성했습니다.",
      "정적인 리브랜딩 화면에 그치지 않고 PHP/MySQL 기반 게시판과 실제 서버 배포까지 연결해 완성형 웹 프로젝트로 구현했습니다.",
      "개인 프로젝트지만 기획, 디자인, 프론트 구현, 백엔드 기능, 배포를 역할 단위로 분리해 팀 프로젝트와 같은 밀도의 포트폴리오 콘텐츠로 정리했습니다.",
    ),
    learnings: p(
      "리브랜딩 프로젝트에서도 시각적 변화보다 사용자가 정보를 찾는 방식과 운영자가 콘텐츠를 관리하는 흐름이 함께 설계되어야 한다는 점을 배웠습니다.",
      "PHP와 MySQL로 CRUD 구조를 직접 구현하며 화면, 데이터, 서버 배포가 연결되는 웹 서비스의 기본 흐름을 경험했습니다.",
    ),
    livePreview: {
      href: "https://gsumin8327.dothome.co.kr/",
      description:
        "배포된 상상마당 리브랜딩 웹사이트입니다. 메인 콘텐츠 구성, 프로그램/공간 탐색, 공지사항 흐름을 실제 화면에서 확인할 수 있습니다.",
      buttonLabel: "라이브 사이트 열기",
    },
  }),
};

export function getCaseStudyContent(
  slug: string,
): CaseStudyContent | undefined {
  return caseStudies[slug];
}
