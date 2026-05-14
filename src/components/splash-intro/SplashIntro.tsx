import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SplashToggle, type SplashTogglePhase } from "./SplashToggle";
import "./SplashIntro.scss";

/** Must match --splash-fill-duration in SplashIntro.scss */
const TRANSITION_MS = 3000;
/** Must match --splash-exit-duration (or --splash-exit-duration-reduced); 700–1000ms */
const EXIT_REVEAL_MS = 880;
const EXIT_REVEAL_MS_REDUCED = 380;

const AMBIENT_LINES = ["상태를 정리하는 중", "선명한 흐름으로 연결 중"] as const;

export type SplashIntroProps = {
  onComplete: () => void;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function WaveSvg({ className, fill, d }: { className: string; fill: string; d: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 96" preserveAspectRatio="none" aria-hidden>
      <path className="splash-liquid-fill__wave-path" fill={fill} d={d} />
    </svg>
  );
}

/** 프로그래매틱 포커스만 옮기고, :focus-visible 링은 띄우지 않음(최초 진입 시 외곽선 방지). */
function focusWithoutRing(el: HTMLElement | null | undefined) {
  if (!el) return;
  type FocusWithVisibility = (options?: FocusOptions & { focusVisible?: boolean }) => void;
  (el.focus as FocusWithVisibility).call(el, { preventScroll: true, focusVisible: false });
}

export function SplashIntro({ onComplete }: SplashIntroProps) {
  const copyId = useId();
  const [reducedMotion] = useState(prefersReducedMotion);
  const [phase, setPhase] = useState<SplashTogglePhase>("off");
  const [ambientPhrase, setAmbientPhrase] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timersRef = useRef<{ fill?: number; exit?: number }>({});

  const finish = useCallback(() => {
    onComplete();
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      const main = document.getElementById("main-content");
      if (main instanceof HTMLElement) focusWithoutRing(main);
    });
  }, [onComplete]);

  const clearTimers = useCallback(() => {
    if (timersRef.current.fill !== undefined) {
      window.clearTimeout(timersRef.current.fill);
      timersRef.current.fill = undefined;
    }
    if (timersRef.current.exit !== undefined) {
      window.clearTimeout(timersRef.current.exit);
      timersRef.current.exit = undefined;
    }
  }, []);

  useEffect(() => {
    if (phase !== "off" || reducedMotion) return;
    focusWithoutRing(toggleRef.current ?? undefined);
  }, [phase, reducedMotion]);

  useEffect(() => {
    document.body.classList.add("splash-intro-active");
    return () => {
      document.body.classList.remove("splash-intro-active");
      clearTimers();
    };
  }, [clearTimers]);

  useEffect(() => {
    if (phase !== "filling" || reducedMotion) {
      setAmbientPhrase(null);
      return;
    }
    setAmbientPhrase(AMBIENT_LINES[Math.floor(Math.random() * AMBIENT_LINES.length)]);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const ms = reducedMotion ? EXIT_REVEAL_MS_REDUCED : EXIT_REVEAL_MS;
    const exitId = window.setTimeout(finish, ms);
    timersRef.current.exit = exitId;
    return () => {
      window.clearTimeout(exitId);
    };
  }, [phase, finish, reducedMotion]);

  const handleActivate = () => {
    if (phase !== "off") return;
    if (reducedMotion) {
      setPhase("exiting");
      return;
    }
    setPhase("filling");
    timersRef.current.fill = window.setTimeout(() => {
      setPhase("exiting");
      timersRef.current.fill = undefined;
    }, TRANSITION_MS);
  };

  const showLiquidWave = !reducedMotion && (phase === "filling" || phase === "exiting");

  return (
    <div
      className={`splash-intro splash-intro--${phase}${reducedMotion ? " splash-intro--reduced" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={copyId}
      aria-hidden={phase === "exiting"}
    >
      <div className="splash-intro__bg" aria-hidden />
      <div className="splash-intro__liquid-fill splash-liquid-fill" aria-hidden>
        {showLiquidWave ? (
          <div className="splash-liquid-fill__waves">
            <WaveSvg
              className="splash-liquid-fill__wave splash-liquid-fill__wave--back"
              fill="#e15b47"
              d="M0 58 C180 36 360 78 540 52 S900 34 1200 56 L1200 160 L0 160 Z"
            />
            <WaveSvg
              className="splash-liquid-fill__wave splash-liquid-fill__wave--front"
              fill="#ff785d"
              d="M0 50 C200 72 400 30 600 52 S960 70 1200 44 L1200 160 L0 160 Z"
            />
          </div>
        ) : null}
      </div>

      <div className="splash-intro__content">
        {phase === "filling" && !reducedMotion && ambientPhrase ? (
          <p className="splash-intro__ambient" aria-live="polite">
            {ambientPhrase}
          </p>
        ) : null}

        <SplashToggle
          phase={phase}
          reducedMotion={reducedMotion}
          onActivate={handleActivate}
          toggleRef={toggleRef}
        />

        <div id={copyId} className="splash-intro__copy">
          {phase === "off" || phase === "filling" ? (
            <>
              <h1 className="splash-intro__title">
                오늘은 어떤 상태로
                <br />이 공간을 탐색하고 싶나요?
              </h1>
              <p className="splash-intro__hint type-caption">토마토를 채워 상태를 활성화합니다.</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
