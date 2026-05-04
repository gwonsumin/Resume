import profilePhoto from "../../assets/images/profile-photo.png";
import aboutTitleIcon from "../../assets/about/about-title.svg";
import iconCheck from "../../assets/icons/icon-check.svg";
import tomatoSticker from "../../assets/icons/tomatoIcon-sticker-ver.svg";
import "./About.scss";

const ABOUT_KEYWORDS = [
  { type: "toggle", label: "상태 기반 사고" },
  { type: "flow", label: "흐름 설계" },
  { type: "cursor", label: "구현 가능한 디자인" },
] as const;

const EDUCATION = [
  { meta: "2019.03 ~ 2021.02", title: "백석예술대학(영상미디어과)" },
] as const;

const LICENSES = [
  { meta: "2022", title: "GTQ 1급" },
  { meta: "2022", title: "컴퓨터 그래픽기능사" },
  { meta: "2022", title: "운전면허 2종 보통" },
  { meta: "2026", title: "웹디자인기능사(필기)" },
] as const;

const TRAINING = [
  {
    meta: "2025.11~2026.06",
    title:
      "생성형AI 활용 UX UI 디자인& 프론트엔드 개발 과정 (ChatGPT, 일러 포토, 피그마, 자바스크립트, 리액트)-3차",
    layout: "split",
  },
] as const;

const EXPERIENCES = [
  {
    period: "2022.01 ~ 2023.05",
    company: "P&L KOREA",
    role: "그래픽 디자이너",
    details: [
      "상품 패키지 및 쇼핑몰 이미지 제작",
      "→ 사용자 시선과 정보 전달 구조를 고려한 디자인",
    ],
  },
  {
    period: "2023.06~2025.07",
    company: "캐나다 워킹홀리데이",
    role: "현지 서비스 환경 경험",
    details: [
      "현지 서비스 환경 경험 (약 20개월)",
      "→ 다양한 사용자와의 직접 소통을 통한 커뮤니케이션 역량 강화",
    ],
  },
] as const;

const PROFILE = [
  { label: "AGE", value: "00.02.12" },
  { label: "EMAIL", value: "gsum212@gmail.com" },
  { label: "PHONE", value: "82+01-8327-8238" },
] as const;

type RecordItem = {
  meta: string;
  title: string;
  layout?: "inline" | "split";
};

type RecordGroupProps = {
  title: string;
  items: readonly RecordItem[];
};

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

function RecordGroup({ title, items }: RecordGroupProps) {
  return (
    <section className="about-record-group">
      <div className="about-record-group__heading">
        <img src={aboutTitleIcon} alt="" aria-hidden="true" />
        <h4>{title}</h4>
      </div>
      <ul className="about-record-list" role="list">
        {items.map((item) => (
          <li key={`${item.meta}-${item.title}`} className="about-record">
            <img src={iconCheck} alt="" aria-hidden="true" className="about-check-icon" />
            {item.layout === "split" ? (
              <p className="about-record__split">
                <span className="about-record__meta">{item.meta}</span>
                <span className="about-record__title">{item.title}</span>
              </p>
            ) : (
              <p>
                <span className="about-record__meta">{item.meta}</span>
                <span className="about-record__divider" aria-hidden="true" />
                <span className="about-record__title">{item.title}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function About() {
  return (
    <div className="about-layout">
      <div className="about-layout__left">
        <article className="about-card about-card--about">
          <header className="about-card__title-bar">
            <h3>ABOUT</h3>
          </header>
          <div className="about-card__body">
            <div className="about-identity">
              <img src={aboutTitleIcon} alt="" aria-hidden="true" />
              <p className="about-card__name">
                <strong>권수민</strong>
                <span className="about-card__name-divider" aria-hidden="true" />
                <span className="about-card__name-en">Sumin Kweon</span>
              </p>
            </div>
            <div className="about-statement">
              <img src={iconCheck} alt="" aria-hidden="true" className="about-check-icon" />
              <div>
                <p className="about-card__lead">
                  사용자의 상태를 설계하는 디자이너
                </p>
                <p className="about-card__intro">
                  사용자의 상태를 이해하고 자연스럽게 선택할 수 있는 흐름을
                  설계합니다.
                </p>
              </div>
            </div>
            <ul className="about-card__keyword-list" role="list">
              {ABOUT_KEYWORDS.map((keyword) => (
                <li key={keyword.label}>
                  <KeywordIcon type={keyword.type} />
                  <span>{keyword.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="about-card">
          <header className="about-card__title-bar about-card__title-bar--empty" aria-hidden="true" />
          <div className="about-card__body about-card__body--stacked">
            <RecordGroup title="EDUCATION" items={EDUCATION} />
            <RecordGroup title="LICENSE" items={LICENSES} />
            <RecordGroup title="TRAINING" items={TRAINING} />
          </div>
        </article>

        <article className="about-card">
          <header className="about-card__title-bar about-card__title-bar--empty" aria-hidden="true" />
          <div className="about-card__body">
            <div className="about-record-group__heading about-record-group__heading--experience">
              <img src={aboutTitleIcon} alt="" aria-hidden="true" />
              <h4>EXPERIENCE</h4>
            </div>
            <ul className="about-card__experience-list" role="list">
              {EXPERIENCES.map((item) => (
                <li
                  key={`${item.period}-${item.company}`}
                  className="experience-record"
                >
                  <img src={iconCheck} alt="" aria-hidden="true" className="about-check-icon" />
                  <div className="experience-record__content">
                    <p className="experience-record__title">
                      <span className="experience-record__period">{item.period}</span>
                      <span className="experience-record__divider" aria-hidden="true" />
                      <span className="experience-record__company">
                        {item.company}
                        <span>({item.role})</span>
                      </span>
                    </p>
                    <ul className="experience-record__details" role="list">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <div className="about-layout__right">
        <figure className="profile-photo-frame">
          <img src={tomatoSticker} alt="" aria-hidden="true" />
          <div className="profile-photo-frame__inner">
            <img src={profilePhoto} alt="권수민 프로필 사진" />
          </div>
        </figure>

        <article className="about-card about-card--profile">
          <div className="about-card__body">
            <header className="about-profile-heading">
              <h3>My Profile</h3>
            </header>
            <ul className="profile-list" role="list">
              {PROFILE.map((item) => (
                <li key={item.label}>
                  <img src={aboutTitleIcon} alt="" aria-hidden="true" />
                  <span className="profile-list__label">{item.label}</span>
                  <span className="profile-list__value">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
