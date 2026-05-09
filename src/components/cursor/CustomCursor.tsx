import { useEffect, useMemo, useRef, useState } from "react";
import defaultCursor from "../../assets/cursor/Default-cousor.svg";
import hoverCursor from "../../assets/cursor/Hover-cousor.svg";
import "./CustomCursor.scss";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  ".clickable",
  ".site-nav__item",
  ".site-nav__link",
  ".project-card",
  ".project-card__link",
  ".project-card__action-button",
  ".archive-memo-card",
  ".archive-memo-card__open",
  ".archive-board__cell",
  ".archive-modal__backdrop",
  ".archive-modal__close",
  ".archive-record__more",
  ".case-study-page__next-card",
  ".resume-download-button",
  ".project-filters__pill",
  "[data-interactive='true']",
].join(", ");

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return finePointer && !prefersReducedMotion;
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [rotation, setRotation] = useState(-14);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const prevPointRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setEnabled(canUseCustomCursor());

    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = () => setEnabled(canUseCustomCursor());
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-enabled");

    const onMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      const dx = x - prevPointRef.current.x;
      const dynamicTilt = Math.max(-8, Math.min(8, dx * 0.35));
      setRotation(-14 + dynamicTilt);

      prevPointRef.current = { x, y };
      setPoint({ x, y });
      setVisible(true);

      const target = event.target as Element | null;
      setIsInteractive(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setIsPressed(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => {
      setVisible(false);
      setIsPressed(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [enabled]);

  useEffect(() => {
    if (!cursorRef.current) return;
    cursorRef.current.style.setProperty("--cursor-x", `${point.x}px`);
    cursorRef.current.style.setProperty("--cursor-y", `${point.y}px`);
    cursorRef.current.style.setProperty("--cursor-rotation", `${rotation}deg`);
  }, [point, rotation]);

  const cursorClassName = useMemo(() => {
    if (!visible) return "custom-cursor";

    return [
      "custom-cursor",
      "is-visible",
      isInteractive ? "is-hover" : "",
      isPressed ? "is-pressed" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }, [isInteractive, isPressed, visible]);

  if (!enabled) return null;

  const cursorSrc = isInteractive ? hoverCursor : defaultCursor;

  return (
    <span ref={cursorRef} className={cursorClassName} aria-hidden="true">
      <img src={cursorSrc} alt="" draggable={false} />
    </span>
  );
}
