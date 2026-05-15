import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import "./Footer.scss";
import footerLogo from "../../assets/footer/footer-logo.svg";
import tomato0 from "../../assets/footer/footer-tamatoicon00.svg";
import tomato1 from "../../assets/footer/footer-tamatoicon01.svg";
import tomato2 from "../../assets/footer/footer-tamatoicon02.svg";
import passBarcode from "../../assets/contact/pass/barcode.svg";
import passHoverIcon from "../../assets/contact/pass/hoverIcon.svg";
import passPortfolioQr from "../../assets/contact/pass/portfolio-qr.png";
import passProfileCharacter from "../../assets/contact/pass/profile-character.svg";
import passTomatoSymbol from "../../assets/contact/pass/tomato-symbol.svg";
import passValidatedStamp from "../../assets/contact/pass/validated-stamp.svg";
import { mountFooterPhysics, type FooterPhysicsSpec } from "./footerPhysics";
import { Reveal } from "../reveal/Reveal";

type FooterProps = {
  siteTitle: string;
};

const RESUME_HREF = `${import.meta.env.BASE_URL}assets/files/KwonSumin-Resume.pdf`;

const EMAIL = "gsum212@gmail.com";
/** 카드·링크용 표기 */
const PHONE_DISPLAY = "82 + 10-8327-8238";
const PHONE_TEL = "+821083278238";
const GITHUB_HREF = "https://github.com/gwonsumin";
const INSTAGRAM_GSUM = "https://www.instagram.com/gsum_00/";
const INSTAGRAM_GCAT = "https://www.instagram.com/gcat_oo/";

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

/** 탭으로 카드 뒤집기: 좁은 뷰 또는 터치/비호버 포인터 환경에서만 (Hero 모바일과 유사) */
const FOOTER_PASS_TOUCH_FLIP_QUERIES = [
  "(max-width: 39.9375rem)",
  "(hover: none)",
  "(pointer: coarse)",
] as const;

function subscribeFooterPassTouchFlip(cb: () => void) {
  const mqs = FOOTER_PASS_TOUCH_FLIP_QUERIES.map((q) => window.matchMedia(q));
  mqs.forEach((mq) => mq.addEventListener("change", cb));
  return () => mqs.forEach((mq) => mq.removeEventListener("change", cb));
}

function getFooterPassTouchFlipSnapshot() {
  return FOOTER_PASS_TOUCH_FLIP_QUERIES.some(
    (q) => window.matchMedia(q).matches,
  );
}

function FooterNamePass() {
  const passTouchFlipMode = useSyncExternalStore(
    subscribeFooterPassTouchFlip,
    getFooterPassTouchFlipSnapshot,
    () => false,
  );
  const [touchFlipped, setTouchFlipped] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const copyEmailResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyEmailResetRef.current) clearTimeout(copyEmailResetRef.current);
    };
  }, []);

  const handleCopyEmail = useCallback(async () => {
    const ok = await copyTextToClipboard(EMAIL);
    if (!ok) return;
    setEmailCopied(true);
    if (copyEmailResetRef.current) clearTimeout(copyEmailResetRef.current);
    copyEmailResetRef.current = setTimeout(() => {
      setEmailCopied(false);
      copyEmailResetRef.current = null;
    }, 2200);
  }, []);

  const handlePassSceneClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (!passTouchFlipMode) return;
    setTouchFlipped((v) => !v);
  };

  const handlePassSceneKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if ((e.target as HTMLElement).closest("a")) return;
    e.preventDefault();
    setTouchFlipped((v) => !v);
  };

  return (
    <div className="site-footer__pass-stack">
      <div
        className={`site-footer__pass-scene${touchFlipped ? " site-footer__pass-scene--touch-flip" : ""}`}
        tabIndex={0}
        aria-label={
          passTouchFlipMode
            ? touchFlipped
              ? "SUMIN PASS 뒷면. 탭하면 앞면으로 돌아옵니다"
              : "SUMIN PASS 앞면. 카드나 빈 곳을 탭하면 뒷면이 보입니다"
            : "SUMIN PASS 연락처 카드"
        }
        onClick={handlePassSceneClick}
        onKeyDown={handlePassSceneKeyDown}
      >
        <article
          className="site-footer__pass-card"
          aria-label="SUMIN PASS — 연락처"
        >
          <div className="site-footer__pass-flip">
            <div className="site-footer__pass-face site-footer__pass-face--front">
              <span
                className="site-footer__pass-edge-hint"
                aria-hidden="true"
              >
                <img src={passHoverIcon} alt="" width={12} height={16} draggable={false} />
              </span>
              <header className="site-footer__pass-top">
                <div className="site-footer__pass-kicker-row">
                  <span className="site-footer__pass-kicker-strong">
                    STATE RECORD
                  </span>
                  <span className="site-footer__pass-kicker-no">
                    NO . 2026-UX
                  </span>
                </div>
                <div className="site-footer__pass-title-row">
                  <img
                    className="site-footer__pass-title-tomato"
                    src={passTomatoSymbol}
                    alt=""
                    width={37}
                    height={32}
                    draggable={false}
                  />
                  <h2 className="site-footer__pass-title-main">SUMIN PASS</h2>
                </div>
                <div
                  className="site-footer__pass-dash site-footer__pass-dash--rule"
                  aria-hidden="true"
                />
              </header>

              <div className="site-footer__pass-front-main">
                <div className="site-footer__pass-info-col">
                  <section className="site-footer__pass-block">
                    <h3 className="site-footer__pass-label">NAME</h3>
                    <p className="site-footer__pass-value site-footer__pass-value--lead">
                      권수민
                    </p>
                    <p className="site-footer__pass-value site-footer__pass-value--sub">
                      Sumin Kweon
                    </p>
                  </section>
                  <div
                    className="site-footer__pass-dash site-footer__pass-dash--between"
                    aria-hidden="true"
                  />

                  <section className="site-footer__pass-block">
                    <h3 className="site-footer__pass-label">ROLE</h3>
                    <p className="site-footer__pass-value site-footer__pass-value--lead">
                      UX/UI 디자이너
                    </p>
                    <p className="site-footer__pass-value site-footer__pass-value--sub">
                      프론트엔드 구현 가능
                    </p>
                  </section>
                  <div
                    className="site-footer__pass-dash site-footer__pass-dash--between"
                    aria-hidden="true"
                  />

                  <section className="site-footer__pass-block">
                    <h3 className="site-footer__pass-label">STATUS</h3>
                    <p className="site-footer__pass-value site-footer__pass-value--lead site-footer__pass-value--balance">
                      사용자의 상태를
                    </p>
                    <p className="site-footer__pass-value site-footer__pass-value--lead site-footer__pass-value--balance">
                      기록하고 설계하는 중
                    </p>
                  </section>
                  <div
                    className="site-footer__pass-dash site-footer__pass-dash--between"
                    aria-hidden="true"
                  />

                  <section className="site-footer__pass-block">
                    <h3 className="site-footer__pass-label site-footer__pass-label--accent">
                      CONTACT
                    </h3>
                    <p className="site-footer__pass-value site-footer__pass-value--lead site-footer__pass-value--tight">
                      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </p>
                    <p className="site-footer__pass-value site-footer__pass-value--lead site-footer__pass-value--tight">
                      <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
                    </p>
                  </section>
                </div>

                <div className="site-footer__pass-portrait-wrap">
                  <div className="site-footer__pass-portrait">
                    <img
                      src={passProfileCharacter}
                      alt=""
                      className="site-footer__pass-portrait-img"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              <p className="site-footer__pass-hint" aria-hidden>
                카드에 올리면 뒷면 · GitHub·이력서·IG는 하단 버튼
              </p>
            </div>

            <div
              className="site-footer__pass-face site-footer__pass-face--back"
              aria-hidden
            >
              <span
                className="site-footer__pass-edge-hint"
                aria-hidden="true"
              >
                <img src={passHoverIcon} alt="" width={12} height={16} draggable={false} />
              </span>

              <header className="site-footer__pass-top">
                <div className="site-footer__pass-kicker-row">
                  <span className="site-footer__pass-kicker-strong">
                    STATE RECORD
                  </span>
                  <span className="site-footer__pass-kicker-no">
                    ARCHIVE NO. 2026-UX
                  </span>
                </div>
                <div
                  className="site-footer__pass-dash site-footer__pass-dash--rule"
                  aria-hidden="true"
                />
              </header>

              <div className="site-footer__pass-back-mid">
                <div className="site-footer__pass-back-icon" aria-hidden="true">
                  <img
                    src={passValidatedStamp}
                    alt=""
                    width={85}
                    height={86}
                    draggable={false}
                  />
                </div>
                <div className="site-footer__pass-back-rows">
                  <div className="site-footer__pass-back-row">
                    <span className="site-footer__pass-back-key">STATUS</span>
                    <span className="site-footer__pass-back-val">
                      더 나은 흐름을 탐색하는 중
                    </span>
                  </div>
                  <div
                    className="site-footer__pass-dash site-footer__pass-dash--between"
                    aria-hidden="true"
                  />
                  <div className="site-footer__pass-back-row">
                    <span className="site-footer__pass-back-key">
                      CURRENT LOOP
                    </span>
                    <span className="site-footer__pass-back-val">
                      UX / 인터랙션 / 아카이브
                    </span>
                  </div>
                  <div
                    className="site-footer__pass-dash site-footer__pass-dash--between"
                    aria-hidden="true"
                  />
                  <div className="site-footer__pass-back-row">
                    <span className="site-footer__pass-back-key">MOOD</span>
                    <span className="site-footer__pass-back-val">
                      따뜻하고 정돈된 흐름
                    </span>
                  </div>
                  <div
                    className="site-footer__pass-dash site-footer__pass-dash--between"
                    aria-hidden="true"
                  />
                  <div className="site-footer__pass-back-row">
                    <span className="site-footer__pass-back-key">DATE</span>
                    <span className="site-footer__pass-back-val site-footer__pass-back-val--emph">
                      2026 ARCHIVE
                    </span>
                  </div>
                </div>
              </div>

              <div className="site-footer__pass-ticket">
                <div className="site-footer__pass-ticket-shell">
                  <div className="site-footer__pass-ticket-notch site-footer__pass-ticket-notch--left" aria-hidden="true" />
                  <div className="site-footer__pass-ticket-notch site-footer__pass-ticket-notch--right" aria-hidden="true" />
                  <div className="site-footer__pass-ticket-inner">
                    <div className="site-footer__pass-ticket-id">
                      <p className="site-footer__pass-passid-label">PASS ID</p>
                      <p className="site-footer__pass-passid-code">
                        2026-UX-0212
                      </p>
                      <img
                        className="site-footer__pass-barcode"
                        src={passBarcode}
                        alt=""
                        width={233}
                        height={26}
                        draggable={false}
                      />
                    </div>
                    <div
                      className="site-footer__pass-ticket-vdash"
                      aria-hidden="true"
                    />
                    <div className="site-footer__pass-ticket-qr">
                      <img
                        className="site-footer__pass-qr-img"
                        src={passPortfolioQr}
                        alt="포트폴리오 QR 코드"
                        width={72}
                        height={72}
                        draggable={false}
                      />
                      <div className="site-footer__pass-ticket-copy">
                        <p className="site-footer__pass-ticket-quote">
                          기록하고 관찰하며 더 나은 흐름을 설계합니다.
                        </p>
                        <p className="site-footer__pass-ticket-open">- OPEN RECORD</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <nav
        className="site-footer__pass-actions"
        aria-label="주요 연락처 바로가기"
      >
        <button
          type="button"
          className={`site-footer__pass-action site-footer__pass-action--copy${emailCopied ? " site-footer__pass-action--copied" : ""}`}
          onClick={handleCopyEmail}
          aria-label={
            emailCopied
              ? `Email copied: ${EMAIL}`
              : `Copy email to clipboard: ${EMAIL}`
          }
        >
          {emailCopied ? (
            "Copied"
          ) : (
            <>
              Email <span className="site-footer__pass-action-meta">copy</span>
            </>
          )}
        </button>
        <a
          className="site-footer__pass-action"
          href={GITHUB_HREF}
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>
        <a
          className="site-footer__pass-action"
          href={RESUME_HREF}
          target="_blank"
          rel="noreferrer noopener"
        >
          Resume
        </a>
        <a
          className="site-footer__pass-action"
          href={INSTAGRAM_GSUM}
          target="_blank"
          rel="noreferrer noopener"
        >
          Instagram{" "}
          <span className="site-footer__pass-action-meta">@gsum_00</span>
        </a>
        <a
          className="site-footer__pass-action site-footer__pass-action--secondary"
          href={INSTAGRAM_GCAT}
          target="_blank"
          rel="noreferrer noopener"
        >
          Instagram{" "}
          <span className="site-footer__pass-action-meta">@gcat_oo</span>
        </a>
      </nav>
    </div>
  );
}

function physicsElementVisible(el: HTMLElement) {
  const st = getComputedStyle(el);
  return (
    st.display !== "none" &&
    st.visibility !== "hidden" &&
    el.offsetParent !== null
  );
}

export function Footer({ siteTitle }: FooterProps) {
  const year = new Date().getFullYear();
  const footerPanelRef = useRef<HTMLDivElement>(null);
  const physicsContainerRef = useRef<HTMLDivElement>(null);
  const physicsLogoRef = useRef<HTMLDivElement>(null);
  const physicsTomato0Ref = useRef<HTMLDivElement>(null);
  const physicsTomato1Ref = useRef<HTMLDivElement>(null);
  const physicsTomato2Ref = useRef<HTMLDivElement>(null);
  const footerPhysicsEnterRef = useRef<HTMLDivElement>(null);
  const [footerPhysicsLive, setFooterPhysicsLive] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => {
        setFooterPhysicsLive(true);
      });
      return () => cancelAnimationFrame(id);
    }
    const sentinel = footerPhysicsEnterRef.current;
    if (!sentinel) return;
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done) return;
        const hit = entries.some((e) => e.target === sentinel && e.isIntersecting);
        if (hit) {
          done = true;
          setFooterPhysicsLive(true);
          io.disconnect();
        }
      },
      {
        /* 푸터 패널 상단이 실제 뷰포트와 겹칠 때만 (페이지 로드 직후·확장 루트로 조기 실행 방지) */
        threshold: 0,
        rootMargin: "0px",
      },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!footerPhysicsLive) return;

    let cleanup: (() => void) | undefined;
    let raf0 = 0;
    let raf1 = 0;
    let resizeDebounce: ReturnType<typeof setTimeout> | undefined;

    const tryMount = () => {
      cleanup?.();
      cleanup = undefined;

      const container = physicsContainerRef.current;
      const logoEl = physicsLogoRef.current;
      const tomatoEls = [
        physicsTomato0Ref.current,
        physicsTomato1Ref.current,
        physicsTomato2Ref.current,
      ] as (HTMLElement | null)[];

      if (!container) return;

      const specs: FooterPhysicsSpec[] = [];

      if (logoEl && physicsElementVisible(logoEl)) {
        const lw = logoEl.offsetWidth;
        const lh = logoEl.offsetHeight;
        if (lw > 0 && lh > 0)
          specs.push({ kind: "box", element: logoEl, width: lw, height: lh });
      }

      for (const el of tomatoEls) {
        if (!el || !physicsElementVisible(el)) continue;
        const tw = el.offsetWidth;
        const th = el.offsetHeight;
        if (tw <= 0 || th <= 0) continue;
        const radius = Math.max(9, Math.min(tw, th) * 0.46);
        specs.push({ kind: "circle", element: el, radius });
      }

      if (specs.length === 0) return;
      cleanup = mountFooterPhysics(container, specs);
    };

    const scheduleMount = () => {
      cancelAnimationFrame(raf0);
      cancelAnimationFrame(raf1);
      raf0 = requestAnimationFrame(() => {
        raf1 = requestAnimationFrame(tryMount);
      });
    };

    scheduleMount();

    const panel = footerPanelRef.current;
    const containerNode = physicsContainerRef.current;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(scheduleMount, 100);
    });
    if (panel) ro.observe(panel);
    if (containerNode) ro.observe(containerNode);

    return () => {
      ro.disconnect();
      clearTimeout(resizeDebounce);
      cancelAnimationFrame(raf0);
      cancelAnimationFrame(raf1);
      cleanup?.();
    };
  }, [footerPhysicsLive]);

  return (
    <footer
      id="contact"
      className="site-footer"
      aria-labelledby="contact-footer-heading"
    >
      <div ref={footerPanelRef} className="footer-shape-panel">
        <div
          ref={footerPhysicsEnterRef}
          className="footer-physics-enter-sentinel"
          aria-hidden
        />
        <div className="footer-content">
          <Reveal delay={0} staggerMs={92} durationMs={700}>
            <p className="site-footer__label" id="contact-footer-heading">
              CONTACT
            </p>
          </Reveal>

          <div className="footer-main-grid">
            <div className="footer-main-grid__col footer-main-grid__col--left">
              <Reveal delay={80} staggerMs={92} durationMs={760}>
                <FooterNamePass />
              </Reveal>
            </div>

            <div className="footer-main-grid__col footer-main-grid__col--right">
              <Reveal delay={0} staggerMs={92} durationMs={760}>
                <div className="site-footer__intro">
                  <p className="site-footer__lead">
                    <span className="site-footer__lead-line site-footer__lead-line--soft">
                      따뜻하고, 또렷하고,
                    </span>
                    <span className="site-footer__lead-line">
                      쓸모 있는 무언가를
                    </span>
                    <span className="site-footer__lead-line site-footer__lead-accent">
                      함께 만들어가요.
                    </span>
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180} staggerMs={92} durationMs={720}>
                <div className="site-footer__note-block">
                  <p className="site-footer__note">
                    © {year} {siteTitle}
                  </p>
                  <p className="site-footer__note site-footer__note--disclaimer">
                    본 프로젝트는 포트폴리오용으로 제작된 사이트입니다.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div
          ref={physicsContainerRef}
          className={`footer-tomato-layer site-footer__physics${footerPhysicsLive ? " site-footer__physics--live" : ""}`}
          aria-hidden
          data-footer-playground
        >
          <div
            ref={physicsLogoRef}
            className="site-footer__physics-item site-footer__physics-item--logo"
          >
            <img
              src={footerLogo}
              alt=""
              width={220}
              height={74}
              draggable={false}
            />
          </div>
          <div
            ref={physicsTomato0Ref}
            className="site-footer__physics-item site-footer__physics-item--tomato"
          >
            <img
              src={tomato0}
              alt=""
              width={160}
              height={144}
              draggable={false}
            />
          </div>
          <div
            ref={physicsTomato1Ref}
            className="site-footer__physics-item site-footer__physics-item--tomato"
          >
            <img
              src={tomato1}
              alt=""
              width={160}
              height={144}
              draggable={false}
            />
          </div>
          <div
            ref={physicsTomato2Ref}
            className="site-footer__physics-item site-footer__physics-item--tomato site-footer__physics-item--tomato-narrow"
          >
            <img
              src={tomato2}
              alt=""
              width={160}
              height={144}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
