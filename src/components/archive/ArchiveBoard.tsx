import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { archiveColumns } from "../../data/archiveData";
import type { ArchiveColumnData, ArchiveRecordCard } from "../../data/archiveData";
import { Reveal } from "../reveal/Reveal";
import { ArchiveModal } from "./ArchiveModal";
import "./ArchiveBoard.scss";

const STACK_MS = 550;
const STACK_EASE = "cubic-bezier(0.42, 0, 0.2, 1)";
const AUTO_ADVANCE_MS = 6200;

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
}

type Phase = "idle" | "next" | "prev";

type ArchiveColumnStackProps = {
  column: ArchiveColumnData;
  reducedMotion: boolean;
  autoPaused: boolean;
  onOpenCard: (card: ArchiveRecordCard) => void;
};

function ArchiveColumnStack({ column, reducedMotion, autoPaused, onOpenCard }: ArchiveColumnStackProps) {
  const cards = column.cards;
  const n = cards.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");

  const busyRef = useRef(false);
  const queueRef = useRef<("next" | "prev")[]>([]);
  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const { incomingIndex, slots, hideSlot2 } = useMemo(() => {
    const s0 = activeIndex;
    const s1 = (activeIndex + 1) % n;
    const s2 = (activeIndex + 2) % n;
    const incoming = phase === "prev" ? (activeIndex - 1 + n) % n : null;
    const hide = incoming !== null && incoming === s2;
    return { incomingIndex: incoming, slots: [s0, s1, s2] as const, hideSlot2: hide };
  }, [activeIndex, n, phase]);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const finishStep = useCallback(
    (direction: "next" | "prev") => {
      if (direction === "next") {
        setActiveIndex((i) => (i + 1) % n);
      } else {
        setActiveIndex((i) => (i - 1 + n) % n);
      }
      setPhase("idle");
      busyRef.current = false;
    },
    [n],
  );

  const pumpImplRef = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    pumpImplRef.current = () => {
      if (busyRef.current) return;
      const nextDir = queueRef.current.shift();
      if (!nextDir) return;

      if (reducedMotion) {
        finishStep(nextDir);
        queueRef.current = [];
        return;
      }

      busyRef.current = true;
      setPhase(nextDir === "next" ? "next" : "prev");

      clearTimer();
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
        finishStep(nextDir);
        pumpImplRef.current();
      }, STACK_MS);
    };
  }, [clearTimer, finishStep, reducedMotion]);

  const pumpQueue = useCallback(() => {
    pumpImplRef.current();
  }, []);

  const requestStep = useCallback(
    (direction: "next" | "prev") => {
      if (n <= 1) return;
      if (reducedMotion) {
        finishStep(direction);
        return;
      }
      queueRef.current.push(direction);
      pumpQueue();
    },
    [finishStep, n, pumpQueue, reducedMotion],
  );

  useEffect(() => {
    return () => {
      clearTimer();
      queueRef.current = [];
      busyRef.current = false;
    };
  }, [clearTimer]);

  const requestStepRef = useRef(requestStep);

  useLayoutEffect(() => {
    requestStepRef.current = requestStep;
  });

  useEffect(() => {
    if (n <= 1 || reducedMotion || autoPaused) return;
    const id = window.setInterval(() => {
      requestStepRef.current("next");
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [n, reducedMotion, autoPaused, column.id]);

  const interactionLocked = phase !== "idle" && !reducedMotion;
  const headingId = `archive-col-${column.id}`;

  const stackClassName = [
    "archive-deck__stack",
    "archive-column__stack",
    phase === "next" ? "archive-deck__stack--anim-next" : "",
    phase === "prev" ? "archive-deck__stack--anim-prev" : "",
    hideSlot2 && phase === "prev" ? "archive-deck__stack--three-prev" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const stackStyle = {
    "--archive-deck-duration": `${STACK_MS}ms`,
    "--archive-deck-ease": STACK_EASE,
  } as CSSProperties;

  const currentCard = cards[activeIndex]!;

  return (
    <section className="archive-column" aria-labelledby={headingId}>
      <div className="archive-column__header">
        <h3 className="archive-column__title" id={headingId} style={{ color: column.accentColor }}>
          {column.columnTitle}
        </h3>
        <p className="archive-column__count" aria-live="polite">
          <span className="archive-deck__visually-hidden">{column.columnTitle} 기록 </span>
          {String(activeIndex + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </p>
      </div>

      <div
        className={stackClassName}
        style={stackStyle}
        role="region"
        aria-roledescription="기록 카드 더미"
        aria-labelledby={headingId}
      >
        {phase === "prev" && incomingIndex !== null ? (
          <div
            className="archive-deck__card archive-deck__card--incoming archive-column__card"
            style={
              {
                "--deck-accent": cards[incomingIndex]!.accentColor,
                "--deck-accent-soft": `${cards[incomingIndex]!.accentColor}33`,
              } as CSSProperties
            }
          >
            <span className="archive-deck__pin" aria-hidden="true" />
            <span className="archive-deck__card-surface" aria-hidden="true" />
            <span className="archive-deck__thumb-wrap archive-deck__thumb-wrap--solo">
              <img
                className="archive-deck__thumb archive-deck__thumb--base"
                src={cards[incomingIndex]!.mainImage}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
          </div>
        ) : null}

        {slots.map((cardIdx, slot) => {
          if (phase === "prev" && hideSlot2 && slot === 2) return null;
          const card = cards[cardIdx]!;
          const isTop = slot === 0;
          return (
            <button
              key={card.id}
              type="button"
              className={[
                "archive-deck__card",
                "archive-column__card",
                `archive-deck__card--slot-${slot}`,
                isTop ? "archive-deck__card--top" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  "--deck-accent": card.accentColor,
                  "--deck-accent-soft": `${card.accentColor}33`,
                } as CSSProperties
              }
              onClick={() => onOpenCard(card)}
              disabled={!isTop || interactionLocked}
              aria-label={`${card.title} 기록 크게 보기`}
            >
              <span className="archive-deck__pin" aria-hidden="true" />
              <span className="archive-deck__card-surface" aria-hidden="true" />
              <span className="archive-deck__thumb-wrap archive-deck__thumb-wrap--solo">
                <img
                  className="archive-deck__thumb archive-deck__thumb--base"
                  src={card.mainImage}
                  alt={isTop ? `${card.title} 기록 썸네일` : ""}
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </button>
          );
        })}
      </div>

      <p className="archive-column__caption">{currentCard.memo}</p>

      <nav className="archive-column__nav" aria-label={`${column.columnTitle} 기록 넘기기`}>
        <button
          type="button"
          className="archive-deck__btn archive-deck__btn--prev archive-column__btn"
          onClick={() => requestStep("prev")}
          disabled={n <= 1 || interactionLocked}
        >
          이전
        </button>
        <button
          type="button"
          className="archive-deck__btn archive-deck__btn--next archive-column__btn"
          onClick={() => requestStep("next")}
          disabled={n <= 1 || interactionLocked}
        >
          다음
        </button>
      </nav>
    </section>
  );
}

export function ArchiveBoard() {
  const reducedMotion = usePrefersReducedMotion();
  const [modalCard, setModalCard] = useState<ArchiveRecordCard | null>(null);

  useEffect(() => {
    if (!modalCard) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyTouch = document.body.style.touchAction;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouch;
    };
  }, [modalCard]);

  return (
    <div className="archive-record">
      <div className="archive-columns">
        {archiveColumns.map((column, columnIndex) => (
          <Reveal
            key={column.id}
            delay={40}
            staggerIndex={columnIndex}
            staggerMs={115}
            durationMs={770}
          >
            <ArchiveColumnStack
              column={column}
              reducedMotion={reducedMotion}
              autoPaused={Boolean(modalCard)}
              onOpenCard={setModalCard}
            />
          </Reveal>
        ))}
      </div>

      {modalCard ? (
        <ArchiveModal key={modalCard.id} item={modalCard} onClose={() => setModalCard(null)} />
      ) : null}
    </div>
  );
}
