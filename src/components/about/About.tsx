import profilePhoto from "../../assets/images/profile-photo.png";
import tomatoSticker from "../../assets/icons/tomatoIcon-sticker-ver.svg";
import tomatoCan from "../../assets/images/tomatoCan.svg";
import tomatoIcon01 from "../../assets/icons/tamatoicon01.svg";
import tomatoIcon02 from "../../assets/icons/tamatoicon02.svg";
import aboutTitleIcon from "../../assets/about/about-title.svg";
import "./About.scss";

const ABOUT_KEYWORDS = [
  { type: "toggle", label: "상태 기반 사고" },
  { type: "flow", label: "흐름 설계" },
  { type: "cursor", label: "구현 가능한 디자인" },
] as const;

const QUICK_INFO = [
  { label: "ROLE", value: "UX/UI Designer" },
  { label: "EMAIL", value: "gsum212@gmail.com" },
  { label: "PHONE", value: "82+01-8327-8238" },
] as const;

const FOUNDATION_GROUPS = [
  {
    id: "education",
    title: "EDUCATION",
    summary: "디자인 기초와 시각 커뮤니케이션 기반 형성",
    bullets: [
      {
        task: "2019.03 ~ 2021.02 | 백석예술대학(영상미디어과)",
        insight: "시각 언어와 콘텐츠 구성의 기본기를 학습하며 사용자 전달 관점을 확장",
      },
    ],
  },
  {
    id: "license",
    title: "LICENSE",
    summary: "실무 툴 활용과 제작 역량 검증",
    bullets: [
      {
        task: "2022 | GTQ 1급",
        insight: "디자인 툴 숙련도를 기반으로 시각 결과물의 정확도와 완성도를 강화",
      },
      {
        task: "2022 | 컴퓨터 그래픽기능사",
        insight: "그래픽 제작 프로세스와 출력 품질에 대한 실무 감각을 체계화",
      },
      {
        task: "2022 | 운전면허 2종 보통",
        insight: "현장 기반 업무 대응력과 실무 이동 유연성 확보",
      },
      {
        task: "2026 | 웹디자인기능사(필기)",
        insight: "웹 서비스 구조와 UI 제작 원리에 대한 이해를 확장",
      },
    ],
  },
  {
    id: "training",
    title: "TRAINING",
    summary: "UX/UI와 프론트엔드 구현을 연결한 실전형 학습",
    bullets: [
      {
        task: "2025.11 ~ 2026.06 | 생성형AI 활용 UX UI 디자인 & 프론트엔드 개발 과정 (ChatGPT, 일러 포토, 피그마, 자바스크립트, 리액트)-3차",
        insight:
          "디자인 의도를 코드로 연결하는 과정에서, 팀 프로젝트를 통해 기획–디자인–개발 간 커뮤니케이션 구조와 역할 흐름에 대한 이해를 확장",
      },
    ],
  },
] as const;

const EXPERIENCE_SECTIONS = [
  {
    periodCompany: "2022.01 ~ 2023.05 | P&L KOREA (그래픽 디자이너)",
    summary: "그래픽 디자인 실무 경험",
    bullets: [
      {
        task: "상품 패키지 및 쇼핑몰 이미지 제작",
        insight: "사용자 시선과 정보 전달 구조를 고려한 디자인",
      },
      {
        task: "다양한 매체 디자인 작업",
        insight: "서비스 맥락에 맞는 시각 요소 설계 경험",
      },
    ],
  },
  {
    periodCompany: "2023.06 ~ 2025.07 | 캐나다 워킹홀리데이",
    summary: "서비스 환경 기반 사용자 경험 이해",
    bullets: [
      {
        task: "다양한 사용자와의 직접적인 소통 경험",
        insight: "상황에 따른 커뮤니케이션 및 대응 능력 강화",
      },
      {
        task: "현지 서비스 환경 경험 (약 20개월)",
        insight: "사용자 행동과 서비스 흐름에 대한 이해 확장",
      },
    ],
  },
] as const;

const CAREER_CARDS = [
  {
    title: "FOUNDATION",
    description: "UX/UI 설계를 위한 학습 기반과 디자인 툴 활용 역량을 정리했습니다.",
  },
  {
    title: "EXPERIENCE",
    description: "실무와 서비스 환경에서\n사용자의 행동과 흐름을 이해하는 경험을 쌓았습니다.",
  },
] as const;

type KeywordIconType = (typeof ABOUT_KEYWORDS)[number]["type"];

function KeywordIcon({ type }: { type: KeywordIconType }) {
  if (type === "toggle") {
    return (
      <svg
        viewBox="0 0 48 48"
        className="about-card__keyword-icon keyword-icon"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="12"
          width="40"
          height="24"
          rx="12"
          className="keyword-icon__toggle-track"
        />
        <circle
          cx="16"
          cy="24"
          r="9"
          className="keyword-icon__toggle-knob"
        />
      </svg>
    );
  }

  if (type === "flow") {
    return (
      <svg
        viewBox="0 0 48 48"
        className="about-card__keyword-icon keyword-icon"
        aria-hidden="true"
      >
        <path
          className="keyword-icon__flow-line keyword-icon__flow-line--top"
          d="M6 14H26C31.523 14 36 9.523 36 4V4C36 2.895 35.105 2 34 2H29"
        />
        <path
          className="keyword-icon__flow-line keyword-icon__flow-line--middle"
          d="M10 24H42"
        />
        <path
          className="keyword-icon__flow-line keyword-icon__flow-line--bottom"
          d="M6 34H26C31.523 34 36 38.477 36 44V44C36 45.105 35.105 46 34 46H29"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      className="about-card__keyword-icon keyword-icon"
      aria-hidden="true"
    >
      <path
        className="keyword-icon__cursor-fill"
        d="M22 42L8 8L42 22L29.47 27.37C28.5264 27.7746 27.7746 28.5264 27.37 29.47L22 42Z"
      />
      <path
        className="keyword-icon__cursor-stroke"
        d="M22 42L8 8L42 22L29.47 27.37C28.5264 27.7746 27.7746 28.5264 27.37 29.47L22 42Z"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CareerCardHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="about-career-card__header">
      <p className="about-career-card__title">
        <img src={aboutTitleIcon} alt="" aria-hidden="true" />
        <span>{title}</span>
      </p>
      <p className="about-career-card__description">{description}</p>
    </div>
  );
}

function FoundationCard() {
  return (
    <article className="about-career-card about-career-card--foundation">
      <CareerCardHeader {...CAREER_CARDS[0]} />
      <div className="about-foundation-groups">
        {FOUNDATION_GROUPS.map((group) => (
          <section key={group.id} className="about-foundation-group">
            <h4 className="about-foundation-group__title">{group.title}</h4>
            <p className="about-foundation-group__summary">{group.summary}</p>
            <ul className="about-foundation-group__bullet-list" role="list">
              {group.bullets.map((bullet) => (
                <li key={bullet.task}>
                  <span className="about-foundation-group__task">{bullet.task}</span>
                  <span className="about-foundation-group__insight">→ {bullet.insight}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

function ExperienceCard() {
  return (
    <article className="about-career-card about-career-card--experience">
      <CareerCardHeader {...CAREER_CARDS[1]} />
      <div className="about-experience-sections">
        {EXPERIENCE_SECTIONS.map((section) => (
          <section key={section.periodCompany} className="about-experience-section">
            <p className="about-career-card__meta">{section.periodCompany}</p>
            <h4 className="about-experience-section__summary">{section.summary}</h4>
            <ul className="about-experience-section__bullet-list" role="list">
              {section.bullets.map((bullet) => (
                <li key={bullet.task}>
                  <span className="about-experience-section__task">{bullet.task}</span>
                  <span className="about-experience-section__insight">→ {bullet.insight}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

export function About() {
  return (
    <div className="about-layout">
      <div className="about-layout__top">
        <article className="about-summary">
          <p className="about-summary__intro">
            사용자의 맥락을 이해하고 자연스럽게 선택할 수 있는 경험 흐름을
            설계합니다.
          </p>
          <ul className="about-summary__keywords" role="list">
            {ABOUT_KEYWORDS.map((keyword) => (
              <li key={keyword.label}>
                <KeywordIcon type={keyword.type} />
                <span>{keyword.label}</span>
              </li>
            ))}
          </ul>
          <ul className="about-quick-info" role="list" aria-label="기본 정보">
            {QUICK_INFO.map((item) => (
              <li key={item.label}>
                <span className="about-quick-info__label">{item.label}</span>
                <span className="about-quick-info__value">{item.value}</span>
              </li>
            ))}
          </ul>
        </article>

        <figure className="about-photo">
          <img src={tomatoSticker} alt="" aria-hidden="true" className="about-photo__sticker" />
          <div className="about-photo__frame">
            <img src={profilePhoto} alt="권수민 프로필 사진" />
          </div>
        </figure>
      </div>

      <section className="about-career" aria-label="기반과 경험">
        <FoundationCard />
        <div className="about-experience-wrap">
          <ExperienceCard />
          <div className="about-career__decor" aria-hidden="true">
            <div className="about-career__tomatoes">
              <img className="about-career__tomato about-career__tomato--large" src={tomatoIcon01} alt="" />
              <img className="about-career__tomato about-career__tomato--small" src={tomatoIcon02} alt="" />
            </div>
            <img className="about-career__can" src={tomatoCan} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}
