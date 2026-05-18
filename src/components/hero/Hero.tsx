import { useEffect, useState, useSyncExternalStore } from "react";
import { useRevealReady } from "../reveal/RevealReadyContext";
import heroChr from "../../assets/images/heroChr.png";
import backIcon from "../../assets/icons/icon-back.svg";
import saveIcon from "../../assets/icons/icon-save.svg";
import tomatoSticker from "../../assets/icons/tomatoIcon-sticker-ver.svg";
import heroRoofShape from "../../assets/shapes/hero-roof-shape.svg";
import "./Hero.scss";

const RESUME_DOWNLOAD_PATH = `${import.meta.env.BASE_URL}assets/files/KwonSumin-Resume.pdf`;

const DESIGNER_NAME = "권수민";
const HERO_TYPING_LINES = [
  "사용자의 상태를 이해하고",
  "선택 가능한 흐름으로",
  "경험을 설계하는",
] as const;
const HERO_SUFFIX_TEXT = " 입니다.";

const wait = (duration: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });

/** Hero.scss 좁은 뷰포트 구간과 동일 (≤767.98px, 터치 활성 패턴 전용) */
const HERO_MOBILE_MQ = "(max-width: 47.99rem)";

function subscribeHeroMobileLayout(onStoreChange: () => void) {
  const mq = window.matchMedia(HERO_MOBILE_MQ);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getHeroMobileLayoutSnapshot() {
  return window.matchMedia(HERO_MOBILE_MQ).matches;
}

export function Hero() {
  const revealReady = useRevealReady();
  const isHeroMobileLayout = useSyncExternalStore(
    subscribeHeroMobileLayout,
    getHeroMobileLayoutSnapshot,
    () => false,
  );
  const [typedLines, setTypedLines] = useState<string[]>(["", "", ""]);
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [typedSuffix, setTypedSuffix] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [resumeUnlockedByTouch, setResumeUnlockedByTouch] = useState(false);

  const showResumeDownload = isTypingDone || (isHeroMobileLayout && resumeUnlockedByTouch);

  useEffect(() => {
    if (!revealReady) return;

    setTypedLines(["", "", ""]);
    setIsNameVisible(false);
    setTypedSuffix("");
    setIsTypingDone(false);
    setResumeUnlockedByTouch(false);

    let isCancelled = false;

    const runTyping = async () => {
      for (
        let lineIndex = 0;
        lineIndex < HERO_TYPING_LINES.length;
        lineIndex += 1
      ) {
        const currentLine = HERO_TYPING_LINES[lineIndex];

        for (
          let charIndex = 1;
          charIndex <= currentLine.length;
          charIndex += 1
        ) {
          if (isCancelled) return;
          setTypedLines((prevLines) => {
            const nextLines = [...prevLines];
            nextLines[lineIndex] = currentLine.slice(0, charIndex);
            return nextLines;
          });
          await wait(62);
        }

        if (isCancelled) return;
        await wait(lineIndex === 0 ? 250 : 175);
      }

      if (isCancelled) return;
      setIsNameVisible(true);
      await wait(165);

      for (
        let charIndex = 1;
        charIndex <= HERO_SUFFIX_TEXT.length;
        charIndex += 1
      ) {
        if (isCancelled) return;
        setTypedSuffix(HERO_SUFFIX_TEXT.slice(0, charIndex));
        await wait(65);
      }

      if (isCancelled) return;
      setIsTypingDone(true);
    };

    runTyping();

    return () => {
      isCancelled = true;
    };
  }, [revealReady]);

  return (
    <div className="hero" aria-labelledby="hero-title">
      <div className="hero__stage">
        <img
          src={heroRoofShape}
          alt=""
          aria-hidden="true"
          className="hero__roof"
        />

        <article className="hero-card" aria-labelledby="hero-title">
          <header className="hero-card__header">
            <div className="hero-card__header-left">
              <img src={backIcon} alt="" aria-hidden="true" />
              <p>State Notes</p>
            </div>
            {showResumeDownload ? (
              <a
                className="hero-card__header-right hero-card__header-right--active"
                href={RESUME_DOWNLOAD_PATH}
                download="KwonSumin-Resume.pdf"
              >
                <img src={saveIcon} alt="" aria-hidden="true" />
                <p>Resume Save</p>
              </a>
            ) : isHeroMobileLayout ? (
              <button
                type="button"
                className="hero-card__header-right hero-card__header-right--touch-latch"
                aria-label="이력서 받기 활성화"
                onClick={() => setResumeUnlockedByTouch(true)}
              >
                <img src={saveIcon} alt="" aria-hidden="true" />
                <p>Resume Save</p>
              </button>
            ) : (
              <div className="hero-card__header-right">
                <img src={saveIcon} alt="" aria-hidden="true" />
                <p>Resume Save</p>
              </div>
            )}
          </header>

          <h1 className="hero-card__title" id="hero-title">
            {typedLines.map((line, index) => (
              <span
                className={
                  index === 0
                    ? "hero-card__line hero-card__line--lead"
                    : "hero-card__line hero-card__line--body"
                }
                key={HERO_TYPING_LINES[index]}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            className={
              isNameVisible
                ? "hero-card__name hero-card__name--visible"
                : "hero-card__name"
            }
          >
            <span className="hero-card__quote">“</span>
            <span className="hero-card__name-text">{DESIGNER_NAME}</span>
            <span className="hero-card__quote">”</span>
            <span className="hero-card__name-suffix">{typedSuffix}</span>
            {isNameVisible && (
              <span className="hero-card__cursor" aria-hidden="true">
                |
              </span>
            )}
          </p>

          <p className="hero-card__role">UX/UI Designer · Frontend Developer</p>
        </article>

        <div className="hero__character">
          <img
            src={heroChr}
            alt="Hero 캐릭터 이미지"
            className="hero__character-image"
            loading="eager"
          />
        </div>

        <img
          src={tomatoSticker}
          alt=""
          aria-hidden="true"
          className="hero__tomato hero__tomato--top"
        />
        <img
          src={tomatoSticker}
          alt=""
          aria-hidden="true"
          className="hero__tomato hero__tomato--bottom"
        />
      </div>
    </div>
  );
}
