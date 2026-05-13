import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SplashToggle, type SplashTogglePhase } from "./SplashToggle";
import "./SplashIntro.scss";

/** Must match --splash-fill-duration in SplashIntro.scss */
const TRANSITION_MS = 2600;
/** Must match --splash-exit-duration (or --splash-exit-duration-reduced) */
const EXIT_REVEAL_MS = 1000;
const EXIT_REVEAL_MS_REDUCED = 380;

export type SplashIntroProps = {
  onComplete: () => void;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SplashIntro({ onComplete }: SplashIntroProps) {
  const copyId = useId();
  const [reducedMotion] = useState(prefersReducedMotion);
  const [phase, setPhase] = useState<SplashTogglePhase>("off");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timersRef = useRef<{ fill?: number; exit?: number }>({});

  const finish = useCallback(() => {
    onComplete();
    requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus();
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
    toggleRef.current?.focus();
  }, [phase, reducedMotion]);

  useEffect(() => {
    document.body.classList.add("splash-intro-active");
    return () => {
      document.body.classList.remove("splash-intro-active");
      clearTimers();
    };
  }, [clearTimers]);

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
        {!reducedMotion && phase === "filling" ? (
          <svg
            className="splash-liquid-fill__wave"
            viewBox="0 0 1200 32"
            preserveAspectRatio="none"
          >
            <path
              className="splash-liquid-fill__wave-path"
              fill="var(--splash-coral, #ff785d)"
              d="M0 14c75-6 150 6 225 0s150-6 225 0 150 6 225 0 150-6 225 0 150 6 225 0v20H0z"
            />
          </svg>
        ) : null}
      </div>

      <div className="splash-intro__content">
        <SplashToggle
          phase={phase}
          reducedMotion={reducedMotion}
          onActivate={handleActivate}
          toggleRef={toggleRef}
        />

        <div id={copyId} className="splash-intro__copy">
          {phase === "off" ? (
            <>
              <h1 className="splash-intro__title">
                지금,
                <br />
                당신의 상태는
                <br />
                얼마나 선명한가요?
              </h1>
              <p className="splash-intro__hint type-caption">토글을 켜고 상태를 확인해보세요.</p>
            </>
          ) : null}
          {phase === "filling" ? (
            <p className="splash-intro__status splash-intro__status--filling" aria-live="polite">
              흐름이 선명해지는 중
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
