import { useCallback, useEffect, useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useRevealReady } from "./RevealReadyContext";
import "./Reveal.scss";

type RevealAs = "div" | "li" | "section" | "article";

export type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealAs;
  children: ReactNode;
  /** 기본 지연(ms), stagger와 합산됨 */
  delay?: number;
  staggerIndex?: number;
  /** stagger 단계 간격(ms), 섹션당 80~120 권장 */
  staggerMs?: number;
  /** 전환 시간(ms), 650~850 권장 */
  durationMs?: number;
  once?: boolean;
};

const DEFAULT_STAGGER_MS = 100;
const DEFAULT_DURATION_MS = 720;

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function attachRevealObserver(
  node: Element,
  setVisible: (v: boolean) => void,
  once: boolean,
) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;

      if (entry.isIntersecting) {
        setVisible(true);
        if (once) observer.unobserve(entry.target);
        return;
      }

      if (!once) setVisible(false);
    },
    {
      threshold: 0.17,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  observer.observe(node);
  return () => observer.disconnect();
}

export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  staggerIndex = 0,
  staggerMs = DEFAULT_STAGGER_MS,
  durationMs = DEFAULT_DURATION_MS,
  once = true,
  style,
  ...props
}: RevealProps) {
  const revealReady = useRevealReady();
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  const handleRef = useCallback((element: HTMLElement | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    if (!revealReady || !node) {
      return;
    }

    return attachRevealObserver(node, setIsVisible, once);
  }, [node, once, revealReady]);

  const totalDelay = delay + staggerIndex * staggerMs;
  const revealStyle = {
    ...style,
    "--reveal-delay": `${totalDelay}ms`,
    "--reveal-duration": `${durationMs}ms`,
  } as CSSProperties;

  const revealClassName = ["reveal", isVisible ? "reveal--visible" : "", className].filter(Boolean).join(" ");

  if (as === "li") {
    return (
      <li {...props} ref={handleRef} className={revealClassName} style={revealStyle} data-reveal>
        {children}
      </li>
    );
  }

  if (as === "section") {
    return (
      <section {...props} ref={handleRef} className={revealClassName} style={revealStyle} data-reveal>
        {children}
      </section>
    );
  }

  if (as === "article") {
    return (
      <article {...props} ref={handleRef} className={revealClassName} style={revealStyle} data-reveal>
        {children}
      </article>
    );
  }

  return (
    <div {...props} ref={handleRef} className={revealClassName} style={revealStyle} data-reveal>
      {children}
    </div>
  );
}

export type UseScrollRevealOptions = {
  once?: boolean;
};

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { once = true } = options;
  const revealReady = useRevealReady();
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  const ref = useCallback((element: HTMLElement | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    if (!revealReady || !node) {
      return;
    }

    return attachRevealObserver(node, setIsVisible, once);
  }, [node, once, revealReady]);

  return { ref, isVisible };
}
