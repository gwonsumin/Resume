import profilePhoto from "../../assets/images/profile-photo.png";
import tomatoSticker from "../../assets/icons/tomatoIcon-sticker-ver.svg";
import tomatoCan from "../../assets/images/tomatoCan.svg";
import { useState } from "react";
import aboutTitleIcon from "../../assets/about/about-title.svg";
import iconCheck from "../../assets/icons/icon-check.svg";
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

const ABOUT_DETAILS = [
  {
    id: "education",
    label: "Education",
    title: "EDUCATION",
    items: ["2019.03 ~ 2021.02 | 백석예술대학(영상미디어과)"],
  },
  {
    id: "license",
    label: "License",
    title: "LICENSE",
    items: [
      "2022 | GTQ 1급",
      "2022 | 컴퓨터 그래픽기능사",
      "2022 | 운전면허 2종 보통",
      "2026 | 웹디자인기능사(필기)",
    ],
  },
  {
    id: "training",
    label: "Training",
    title: "TRAINING",
    items: [
      "2025.11 ~ 2026.06 | 생성형AI 활용 UX UI 디자인 & 프론트엔드 개발 과정 (ChatGPT, 일러 포토, 피그마, 자바스크립트, 리액트)-3차",
    ],
  },
  {
    id: "experience",
    label: "Experience",
    title: "EXPERIENCE",
    items: [
      "2022.01 ~ 2023.05 | P&L KOREA (그래픽 디자이너) - 상품 패키지 및 쇼핑몰 이미지 제작, 사용자 시선과 정보 전달 구조를 고려한 디자인",
      "2023.06 ~ 2025.07 | 캐나다 워킹홀리데이 (현지 서비스 환경 경험) - 다양한 사용자와의 직접 소통을 통한 커뮤니케이션 역량 강화",
    ],
  },
] as const;

type KeywordIconType = (typeof ABOUT_KEYWORDS)[number]["type"];
type AboutDetailId = (typeof ABOUT_DETAILS)[number]["id"];

function splitDetailItem(item: string) {
  const [meta, ...rest] = item.split("|");
  const content = rest.join("|").trim();

  if (!content) {
    return { meta: "", content: meta.trim() };
  }

  return { meta: meta.trim(), content };
}

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

export function About() {
  const [activeDetail, setActiveDetail] = useState<AboutDetailId>("education");
  const activeDetailData =
    ABOUT_DETAILS.find((detail) => detail.id === activeDetail) ?? ABOUT_DETAILS[0];

  return (
    <section className="about-layout" aria-labelledby="about-heading">
      <div className="about-layout__top">
        <article className="about-summary">
          <p className="about-summary__eyebrow">ABOUT</p>
          <h3 id="about-heading" className="about-summary__title">
            권수민<span aria-hidden="true">/</span>Sumin Kweon
          </h3>
          <p className="about-summary__lead">사용자의 상태를 설계하는 디자이너</p>
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
        </article>

        <figure className="about-photo">
          <img src={tomatoSticker} alt="" aria-hidden="true" className="about-photo__sticker" />
          <div className="about-photo__frame">
            <img src={profilePhoto} alt="권수민 프로필 사진" />
          </div>
        </figure>
      </div>

      <ul className="about-quick-info" role="list" aria-label="기본 정보">
        {QUICK_INFO.map((item) => (
          <li key={item.label}>
            <span className="about-quick-info__label">{item.label}</span>
            <span className="about-quick-info__value">{item.value}</span>
          </li>
        ))}
      </ul>

      <section className="about-detail-can" aria-label="추가 이력 정보">
        <p className="about-detail-can__hint">Hover or tap a can to preview details.</p>
        <ul className="about-detail-can__topic-list" role="list">
          {ABOUT_DETAILS.map((detail) => (
            <li
              key={detail.id}
              className={`about-detail-topic${detail.id === activeDetail ? " about-detail-topic--active" : ""}`}
            >
              <button
                type="button"
                className="about-detail-topic__trigger"
                onMouseEnter={() => setActiveDetail(detail.id)}
                onFocus={() => setActiveDetail(detail.id)}
                onClick={() => setActiveDetail(detail.id)}
              >
                <span className="about-detail-topic__label">{detail.label}</span>
                <img src={tomatoCan} alt="" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <article
          key={activeDetail}
          className="about-detail-dock"
          role="status"
          aria-live="polite"
        >
          <div className="about-detail-topic__bar" aria-hidden="true" />
          <div className="about-detail-topic__inner">
            <p className="about-detail-topic__title">
              <img src={aboutTitleIcon} alt="" aria-hidden="true" />
              <span>{activeDetailData.title}</span>
            </p>
            <ul className="about-detail-topic__list" role="list">
              {activeDetailData.items.map((item) => {
                const parsed = splitDetailItem(item);

                return (
                  <li key={item}>
                    <img src={iconCheck} alt="" aria-hidden="true" />
                    <div>
                      {parsed.meta ? (
                        <span className="about-detail-topic__meta">{parsed.meta}</span>
                      ) : null}
                      <span className="about-detail-topic__content">{parsed.content}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </article>
      </section>
    </section>
  );
}
