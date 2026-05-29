import { useEffect, useState } from "react";
import { RESUME_FILENAME, RESUME_HREF } from "../../config/assets";
import { useRevealReady } from "../reveal/RevealReadyContext";
import heroChr from "../../assets/images/heroChr.png";
import tomatoSticker from "../../assets/icons/tomatoIcon-sticker-ver.svg";
import "./Hero.scss";

function HeroResumeBtn({ placement }: { placement: "masthead" | "footer" }) {
  return (
    <a
      href={RESUME_HREF}
      download={RESUME_FILENAME}
      className={`hero-resume-btn hero-resume-btn--${placement}`}
    >
      RESUME
    </a>
  );
}

export function Hero() {
  const revealReady = useRevealReady();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!revealReady) {
      setIsVisible(false);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [revealReady]);

  return (
    <div
      className={isVisible ? "hero hero--visible" : "hero"}
      aria-labelledby="hero-title"
    >
      <div className="hero__stage">
        <img
          src={tomatoSticker}
          alt=""
          aria-hidden="true"
          className="hero__tomato hero__tomato--one"
        />
        <img
          src={tomatoSticker}
          alt=""
          aria-hidden="true"
          className="hero__tomato hero__tomato--two"
        />

        <div className="hero__layout">
          <header className="hero__masthead">
            <p className="hero__label-ko">UX · UI PORTFOLIO</p>
            <p className="hero__label-mono">STATE NOTES BY SUMIN · SEOUL</p>
            <div className="hero__masthead-meta">
              <p className="hero__label-vol">Vol. 04 · Selected Work</p>
              <HeroResumeBtn placement="masthead" />
            </div>
          </header>

          <div className="hero__main">
            <div className="hero__copy">
              <h1 className="hero__title" id="hero-title">
                <span className="hero__title-set hero__title-set--desktop">
                  <span className="hero__title-line">
                    사용자의{" "}
                    <span className="hero__marker">상태</span>
                    를 이해하고,
                  </span>
                  <span className="hero__title-line">흐름으로 설계합니다.</span>
                </span>
                <span className="hero__title-set hero__title-set--mobile" aria-hidden="true">
                  <span className="hero__title-line">
                    사용자의{" "}
                    <span className="hero__marker">상태</span>
                    를
                  </span>
                  <span className="hero__title-line">이해하고,</span>
                  <span className="hero__title-line hero__title-line--split">
                    <span className="hero__title-word">흐름</span>
                    <span className="hero__title-word">으로</span>
                  </span>
                  <span className="hero__title-line">설계합니다.</span>
                </span>
              </h1>

              <div className="hero__byline">
                <p className="hero__byline-primary">
                  <span className="hero__byline-name">권수민 Sumin Kweon</span>
                  <span className="hero__byline-sep" aria-hidden="true">
                    ·
                  </span>
                  <span className="hero__byline-role">UX/UI Designer · Frontend</span>
                </p>
                <p className="hero__byline-meta">
                  PROBLEM · FLOW · INTERFACE · BUILD
                </p>
              </div>

              <p className="hero__lede">
                사용자 문제를 정의하고, 경험 흐름을 설계하며, 디자인과 구현을
                연결합니다.
              </p>
            </div>

            <aside className="hero__sticker" aria-label="오늘의 마스코트">
              <svg
                className="hero__sticker-ring"
                viewBox="0 0 220 220"
                aria-hidden="true"
              >
                <path
                  className="hero__sticker-ring-path hero__sticker-ring-path--primary"
                  d="M110 18 C168 24, 198 72, 192 128 C186 178, 132 206, 82 198 C34 190, 12 142, 22 92 C32 48, 62 14, 110 18 Z"
                />
                <path
                  className="hero__sticker-ring-path hero__sticker-ring-path--ghost"
                  d="M108 22 C162 30, 188 74, 184 124 C178 170, 128 198, 80 192 C36 186, 18 138, 28 94 C38 54, 66 20, 108 22 Z"
                />
              </svg>
              <span className="hero__washi" aria-hidden="true" />
              <img
                src={heroChr}
                alt=""
                className="hero__sticker-image"
                loading="eager"
              />
              <span className="hero__open-tag">✿ Open today</span>
            </aside>
          </div>

          <footer className="hero__footer">
            <div className="hero__diary-row">
              <p className="hero__diary">
                문제 정의에서 인터페이스 구현까지, 하나의 경험 흐름으로
                연결하는 작업 기록입니다.
              </p>
              <HeroResumeBtn placement="footer" />
            </div>
            <p className="hero__diary-meta">NO. 2026-04 · SEOUL</p>

            <nav className="hero__continue" aria-label="포트폴리오 바로가기">
              <a
                className="hero__continue-link hero__continue-link--primary"
                href="#case-study"
              >
                ↓ VIEW CASE STUDIES
              </a>
              <a
                className="hero__continue-link hero__continue-link--secondary"
                href="#about"
              >
                ABOUT
              </a>
              <span className="hero__continue-sep" aria-hidden="true">
                ·
              </span>
              <a className="hero__continue-link" href="#archive">
                ARCHIVE
              </a>
              <span className="hero__continue-sep" aria-hidden="true">
                ·
              </span>
              <a
                className="hero__continue-link hero__continue-link--contact"
                href="#contact"
              >
                CONTACT
              </a>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
