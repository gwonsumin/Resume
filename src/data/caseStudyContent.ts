import type { CaseStudyContent } from "../types/caseStudy";

function p(...lines: string[]): readonly string[] {
  return lines;
}

const placeholderIntro = (name: string) =>
  p(
    `This page documents the ${name} project using a shared case study structure. Replace each block with research, screens, and outcomes as you publish.`,
  );

const placeholderBlock = (label: string) =>
  p(
    `${label}: add research notes, diagrams, or metrics. This template keeps sections consistent across projects.`,
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
    problem: p(
      "Shoppers could not see why recommendations matched their interests. The experience needed clearer mental models and safer paths to purchase.",
    ),
  }),
  tone: makeCaseStudy("TONE", {
    intro: p(
      "감정을 기록하고 색으로 축적하며 음악으로 연결되는 아카이브형 음악 UX 서비스.",

      "사용자는 매일의 감정을 컬러 톤(Color)으로 기록하고, 이를 캘린더에 쌓아 자신만의 감정 아카이브를 만든다.",
    ),
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

      "Flow: 감정 선택 → 톤 기록 → 음악 추천 → 캘린더 저장 → 히스토리 확인",
    ),
    // Figma 프로토타입 URL로 교체하세요.
    prototype: {
      href: "https://www.figma.com/proto/CPHFRbBDBqaBRVcCQzwULV/%EB%94%94%EC%9E%90%EC%9D%B8?node-id=290-6422&p=f&t=OGzQaCRN52M5DVZr-0&scaling=scale-down&content-scaling=fixed&page-id=290%3A6295&starting-point-node-id=290%3A6540&show-proto-sidebar=1",
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
    // 배포 URL로 교체하세요.
    livePreview: {
      href: "https://toneapp.dothome.co.kr/",
      description:
        "실제로 구현된 인터랙티브 빌드입니다. 배포된 사이트에서 감정 기록부터 추천 흐름까지 직접 사용해 볼 수 있습니다.",
      buttonLabel: "라이브 사이트 열기",
    },
  }),
  sangsangmadang: makeCaseStudy("Sangsangmadang", {
    problem: p(
      "Content and program types were split across many entry points. The goal was a clearer map from curiosity to a booking or visit.",
    ),
  }),
  personal: makeCaseStudy("Personal project", {
    problem: p(
      "A self-directed scope to validate ideas quickly: from problem framing to a small, testable UI implementation.",
    ),
  }),
};

export function getCaseStudyContent(
  slug: string,
): CaseStudyContent | undefined {
  return caseStudies[slug];
}
