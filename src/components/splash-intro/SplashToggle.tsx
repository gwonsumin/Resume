import type { RefObject } from "react";
import toggleFill from "../../assets/SplashToggle/toggle-fill.svg";
import toggleStem from "../../assets/SplashToggle/toggle-stem.svg";

export type SplashTogglePhase = "off" | "filling" | "exiting";

type SplashToggleProps = {
  phase: SplashTogglePhase;
  reducedMotion: boolean;
  onActivate: () => void;
  toggleRef?: RefObject<HTMLButtonElement | null>;
};

const SHELL_LABEL = "포트폴리오 입장하기";

function ToggleShellFrame({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={177}
      height={376}
      viewBox="0 0 177 376"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="7.5"
        y="7.5"
        width="162"
        height="361"
        rx="81"
        fill="none"
        stroke="currentColor"
        strokeWidth="15"
        strokeLinejoin="round"
        strokeLinecap="round"
        paintOrder="stroke fill"
      />
    </svg>
  );
}

export function SplashToggle({ phase, reducedMotion, onActivate, toggleRef }: SplashToggleProps) {
  const isInteractive = phase === "off";

  return (
    <div className={`splash-toggle splash-toggle--${phase}${reducedMotion ? " splash-toggle--reduced" : ""}`}>
      <button
        ref={toggleRef}
        type="button"
        className="splash-toggle__control"
        onClick={onActivate}
        disabled={!isInteractive}
        aria-label={SHELL_LABEL}
      >
        <span className="splash-toggle__glow" aria-hidden />
        <span className="splash-toggle__pill">
          <span className="splash-toggle__clip">
            <span className="splash-toggle__well" />
            <span className="splash-toggle__liquid">
              <span className="splash-toggle__liquid-body">
                <img
                  src={toggleFill}
                  className="splash-toggle__liquid-fill-img"
                  alt=""
                  width={147}
                  height={346}
                />
                {phase === "filling" && !reducedMotion ? (
                  <svg
                    className="splash-toggle__liquid-wave"
                    viewBox="0 0 400 24"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      className="splash-toggle__liquid-wave-path"
                      fill="var(--splash-toggle-liquid, #e15b47)"
                      d="M0 12c27-5 53 5 80 0s53-5 80 0 53 5 80 0 53-5 80 0 53 5 80 0v14H0z"
                    />
                  </svg>
                ) : null}
              </span>
            </span>
          </span>
          <span className="splash-toggle__stem">
            <img src={toggleStem} className="splash-toggle__stem-img" alt="" width={85} height={89} />
          </span>
          <ToggleShellFrame className="splash-toggle__shell splash-toggle-shell" />
        </span>
      </button>
    </div>
  );
}
