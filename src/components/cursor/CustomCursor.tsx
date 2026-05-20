import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
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
  ".archive-deck__card",
  ".archive-modal__thumb",
  ".archive-modal__backdrop",
  ".archive-modal__close",
  ".archive-record__more",
  ".case-study-page__next-card",
  ".project-filters__pill",
  "[data-interactive='true']",
].join(", ");

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return finePointer && !prefersReducedMotion;
}

function subscribeCustomCursorEligible(onStoreChange: () => void) {
  const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onChange = () => onStoreChange();
  mqFine.addEventListener("change", onChange);
  mqReduced.addEventListener("change", onChange);
  return () => {
    mqFine.removeEventListener("change", onChange);
    mqReduced.removeEventListener("change", onChange);
  };
}

function applyCursorTransform(node: HTMLSpanElement, x: number, y: number, rotation: number) {
  node.style.setProperty("--cursor-x", `${x}px`);
  node.style.setProperty("--cursor-y", `${y}px`);
  node.style.setProperty("--cursor-rotation", `${rotation}deg`);
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribeCustomCursorEligible, canUseCustomCursor, () => false);
  const [visible, setVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const prevPointRef = useRef({ x: 0, y: 0 });
  const isInteractiveRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-enabled");

    const onMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      const dx = x - prevPointRef.current.x;
      const rotation = -14 + Math.max(-8, Math.min(8, dx * 0.35));
      prevPointRef.current = { x, y };

      const node = cursorRef.current;
      if (node) {
        applyCursorTransform(node, x, y, rotation);
      }

      setVisible(true);

      const target = event.target as Element | null;
      const nextInteractive = Boolean(target?.closest(INTERACTIVE_SELECTOR));
      if (nextInteractive !== isInteractiveRef.current) {
        isInteractiveRef.current = nextInteractive;
        setIsInteractive(nextInteractive);
      }
    };

    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setIsPressed(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => {
      setVisible(false);
      setIsPressed(false);
      isInteractiveRef.current = false;
      setIsInteractive(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
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
