import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import {
  archiveCardRotationDeg,
  archiveColumns,
  type ArchiveColumnData,
  type ArchiveFastener,
  type ArchiveRecordCard,
} from "../../data/archiveData";
import { useImageRatio } from "../../hooks/useImageRatio";
import { useBodyScrollLock } from "../../utils/useBodyScrollLock";
import { ArchiveModal } from "./ArchiveModal";
import "./ArchiveBoard.scss";

/* -------------------------------------------------------------------------- */
/* Layout constants                                                           */
/* -------------------------------------------------------------------------- */

const CARD_W = 225;
const CARD_GAP = 27; // between cards
const SHELF_PAD_X = 30;

/** i번째 카드의 셸프 내부 절대 위치 */
function slotFor(i: number, cardId: string) {
  return {
    x: SHELF_PAD_X + i * (CARD_W + CARD_GAP),
    y: [30, 50, 35, 55][i % 4],
    rot: archiveCardRotationDeg(cardId),
  };
}

const FASTENER_LABEL: Record<ArchiveFastener, string> = {
  pin: "PINNED",
  tape: "TAPED",
  clip: "CLIPPED",
};

/* -------------------------------------------------------------------------- */
/* Fastener — pin / washi tape / paper clip                                   */
/* -------------------------------------------------------------------------- */

function Fastener({ kind, color, ghost = false }: { kind: ArchiveFastener; color: string; ghost?: boolean }) {
  if (kind === "pin") {
    return (
      <span
        className={`archive-pin__fastener archive-pin__fastener--pin${ghost ? " is-ghost" : ""}`}
        style={ghost ? undefined : ({ "--pin-color": color } as CSSProperties)}
        aria-hidden="true"
      />
    );
  }
  if (kind === "tape") {
    return (
      <span
        className={`archive-pin__fastener archive-pin__fastener--tape${ghost ? " is-ghost" : ""}`}
        style={ghost ? undefined : ({ "--tape-color": `${color}55` } as CSSProperties)}
        aria-hidden="true"
      />
    );
  }
  return (
    <svg
      className={`archive-pin__fastener archive-pin__fastener--clip${ghost ? " is-ghost" : ""}`}
      width="28"
      height="40"
      viewBox="0 0 28 40"
      aria-hidden="true"
    >
      <path
        d="M8 4 C 4 4, 4 14, 8 14 L 20 14 C 24 14, 24 24, 20 24 L 10 24 C 6 24, 6 32, 10 32 L 18 32"
        stroke="currentColor"
        strokeWidth={ghost ? 2 : 2.2}
        strokeDasharray={ghost ? "3 3" : undefined}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Single pinned card                                                         */
/* -------------------------------------------------------------------------- */

type PinnedCardProps = {
  card: ArchiveRecordCard;
  slotIndex: number;
  fastener: ArchiveFastener;
  accentColor: string;
  isHovered: boolean;
  isOpen: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  onOpen: () => void;
};

function PinnedCard({
  card,
  slotIndex,
  fastener,
  accentColor,
  isHovered,
  isOpen,
  onHover,
  onLeave,
  onOpen,
}: PinnedCardProps) {
  const slot = slotFor(slotIndex, card.id);
  const primaryTag = card.tags[0];
  const { variant, onLoad, imgRef } = useImageRatio();
  const style = {
    left: slot.x,
    top: slot.y,
    width: CARD_W,
    height: "auto",
    transform: `rotate(${slot.rot}deg)`,
    zIndex: isHovered || isOpen ? 10 : 1,
    "--pin-accent": accentColor,
    "--pin-rot": `${slot.rot}deg`,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={[
        "archive-pin",
        isHovered ? "is-hovered" : "",
        isOpen ? "is-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      onPointerEnter={onHover}
      onPointerLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onOpen}
      aria-label={`${card.title} — 노트 펼쳐 보기`}
    >
      <Fastener kind={fastener} color={accentColor} />

      <span className="archive-pin__matte">
        <span className={`archive-pin__image-wrap archive-pin__image-wrap--${variant}`}>
          <img
            ref={imgRef}
            className="archive-pin__image"
            src={card.mainImage}
            alt={card.imageAlt}
            loading="lazy"
            decoding="async"
            draggable={false}
            onLoad={onLoad}
          />
        </span>
        <span className="archive-pin__sticky" aria-hidden="true">
          {card.memo}
        </span>
        <span className="archive-pin__caption">
          <span className="archive-pin__caption-title">{card.title}</span>
          {primaryTag ? <span className="archive-pin__tag">{primaryTag}</span> : null}
          <span className="archive-pin__caption-meta">{card.year}</span>
        </span>
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* "Coming soon" placeholder                                                  */
/* -------------------------------------------------------------------------- */

function ComingSoonSlot({ slotIndex, fastener }: { slotIndex: number; fastener: ArchiveFastener }) {
  const slot = slotFor(slotIndex, `coming-soon-${slotIndex}`);
  const style = {
    left: slot.x,
    top: slot.y,
    width: CARD_W,
    height: "auto",
    transform: `rotate(${slot.rot}deg)`,
    "--pin-rot": `${slot.rot}deg`,
  } as CSSProperties;
  return (
    <div className="archive-pin archive-pin--coming-soon" style={style} aria-label="곧 추가될 예정">
      <Fastener kind={fastener} color="" ghost />
      <div className="archive-pin__ghost-paper">
        <div className="archive-pin__dots" aria-hidden="true">
          <span /> <span /> <span />
        </div>
        <p className="archive-pin__ghost-hand">
          곧 추가될
          <br />
          예정이에요
        </p>
        <p className="archive-pin__ghost-meta">COMING SOON</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Category tab                                                               */
/* -------------------------------------------------------------------------- */

type TabProps = {
  column: ArchiveColumnData;
  active: boolean;
  onClick: () => void;
};

function CategoryTab({ column, active, onClick }: TabProps) {
  return (
    <button
      type="button"
      className={`archive-tab${active ? " is-active" : ""}`}
      onClick={onClick}
      role="tab"
      aria-selected={active}
      aria-controls={`archive-shelf-${column.id}`}
      id={`archive-tab-${column.id}`}
    >
      <span className="archive-tab__label">{column.columnTitle}</span>
      <span className="archive-tab__korean">{column.columnKorean}</span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Main board                                                                 */
/* -------------------------------------------------------------------------- */

const NATIVE_SCROLL_MQ = "(max-width: 63.99rem)";

export function ArchiveBoard() {
  const [activeId, setActiveId] = useState<string>(archiveColumns[0]!.id);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [useNativeScroll, setUseNativeScroll] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(NATIVE_SCROLL_MQ).matches : false,
  );

  const activeColumn = useMemo(
    () => archiveColumns.find((c) => c.id === activeId) ?? archiveColumns[0]!,
    [activeId],
  );

  /* ---------- drag-to-scroll ---------- */
  const shelfRef = useRef<HTMLDivElement | null>(null);
  const [shelfW, setShelfW] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const didDragRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, startDragX: 0 });

  useEffect(() => {
    const mq = window.matchMedia(NATIVE_SCROLL_MQ);
    const syncNativeScroll = () => setUseNativeScroll(mq.matches);
    syncNativeScroll();
    mq.addEventListener("change", syncNativeScroll);
    return () => mq.removeEventListener("change", syncNativeScroll);
  }, []);

  useEffect(() => {
    if (!shelfRef.current) return;
    const ro = new ResizeObserver(() => setShelfW(shelfRef.current?.clientWidth ?? 0));
    ro.observe(shelfRef.current);
    setShelfW(shelfRef.current.clientWidth);
    return () => ro.disconnect();
  }, []);

  // reset scroll when category changes
  useEffect(() => {
    setDragX(0);
  }, [activeId]);

  const totalSlots = activeColumn.cards.length + (activeColumn.showComingSoon ? 1 : 0);
  const innerWidth = SHELF_PAD_X + (totalSlots - 1) * (CARD_W + CARD_GAP) + CARD_W + SHELF_PAD_X;
  const overflows = shelfW > 0 && innerWidth > shelfW;
  const useDragScroll = overflows && !useNativeScroll;
  const maxScroll = useDragScroll ? shelfW - innerWidth : 0;
  const clamp = useCallback(
    (v: number) => Math.max(maxScroll, Math.min(0, v)),
    [maxScroll],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!useDragScroll) return;
    if (e.button !== 0) return;
    setDragging(true);
    didDragRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY, startDragX: dragX };
    // NOTE: setPointerCapture is intentionally NOT called here.
    // Calling it during pointerdown suppresses all compatibility mouse events
    // (mouseup, click), which prevents button onClick handlers from firing.
    // Capture is set lazily in onPointerMove once the drag threshold is crossed.
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 4 && Math.abs(dx) > Math.abs(dy)) {
      if (!didDragRef.current) {
        // Capture only on the first frame past threshold so drag stays smooth
        // even when pointer leaves the shelf.
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* noop */ }
      }
      didDragRef.current = true;
    }
    if (!didDragRef.current) return;
    setDragX(clamp(dragStartRef.current.startDragX + dx));
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    // clear didDrag on the next tick so the same gesture's click is suppressed
    window.setTimeout(() => {
      didDragRef.current = false;
    }, 0);
  };

  /* ---------- modal nav ---------- */
  const openCard = (i: number) => {
    if (didDragRef.current) return;
    setOpenIdx(i);
  };
  const closeModal = () => setOpenIdx(null);
  const navigateRel = (delta: number) =>
    setOpenIdx((curr) => {
      if (curr === null) return curr;
      const n = activeColumn.cards.length;
      return (curr + delta + n) % n;
    });

  useBodyScrollLock(openIdx !== null);

  return (
    <div className="archive-board">
      {/* Tabs */}
      <div className="archive-board__tabs" role="tablist" aria-label="아카이브 카테고리">
        {archiveColumns.map((col) => (
          <CategoryTab
            key={col.id}
            column={col}
            active={col.id === activeId}
            onClick={() => setActiveId(col.id)}
          />
        ))}
        <p className="archive-board__fastener-hint">{FASTENER_LABEL[activeColumn.fastener]}</p>
      </div>

      {/* Shelf */}
      <div
        ref={shelfRef}
        className={[
          "archive-board__shelf",
          useDragScroll ? " is-scrollable" : "",
          dragging ? " is-dragging" : "",
          useNativeScroll ? " is-native-scroll" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        id={`archive-shelf-${activeColumn.id}`}
        role="tabpanel"
        aria-labelledby={`archive-tab-${activeColumn.id}`}
        onPointerDown={useDragScroll ? onPointerDown : undefined}
        onPointerMove={useDragScroll ? onPointerMove : undefined}
        onPointerUp={useDragScroll ? onPointerUp : undefined}
        onPointerCancel={useDragScroll ? onPointerUp : undefined}
      >
        <p className="archive-board__strip-nav" aria-hidden="true">
          <span className="ui-hint--desktop">← → · NAVIGATE</span>
          <span className="ui-hint--touch">SWIPE · SCROLL</span>
        </p>
        <div
          key={activeColumn.id}
          className="archive-board__track"
          style={
            useNativeScroll
              ? undefined
              : ({
                  width: innerWidth,
                  transform: `translateX(${dragX}px)`,
                  transition: dragging ? "none" : undefined,
                } as CSSProperties)
          }
        >
          {activeColumn.cards.map((card, i) => (
            <PinnedCard
              key={card.id}
              card={card}
              slotIndex={i}
              fastener={activeColumn.fastener}
              accentColor={activeColumn.accentColor}
              isHovered={!useNativeScroll && hoverIdx === i && !dragging}
              isOpen={openIdx === i}
              onHover={useNativeScroll ? undefined : () => setHoverIdx(i)}
              onLeave={
                useNativeScroll
                  ? undefined
                  : () => setHoverIdx((h) => (h === i ? null : h))
              }
              onOpen={() => openCard(i)}
            />
          ))}
          {activeColumn.showComingSoon && (
            <ComingSoonSlot
              slotIndex={activeColumn.cards.length}
              fastener={activeColumn.fastener}
            />
          )}
        </div>

        {/* fade edges */}
        {useDragScroll && dragX > maxScroll + 4 && (
          <div className="archive-board__fade archive-board__fade--right" aria-hidden="true" />
        )}
        {useDragScroll && dragX < -4 && (
          <div className="archive-board__fade archive-board__fade--left" aria-hidden="true" />
        )}

      </div>

      {/* Foot row */}
      <div className="archive-board__foot">
        <span className="archive-board__foot-group">
          <span className="ui-hint--desktop">HOVER · NOTE</span>
          <span className="ui-hint--touch">SWIPE · TAP</span>
        </span>
        <span className="archive-board__foot-group archive-board__foot-group--center">
          <span className="ui-hint--desktop">CLICK · DRAG · SCROLL</span>
          <span className="ui-hint--touch">SCROLL</span>
        </span>
        <span className="archive-board__foot-group archive-board__foot-group--end">
          <span className="ui-hint--desktop">ESC · CLOSE</span>
          <span className="ui-hint--touch">CLOSE</span>
        </span>
      </div>

      {openIdx !== null && (
        <ArchiveModal
          item={activeColumn.cards[openIdx]!}
          column={activeColumn}
          position={openIdx + 1}
          total={activeColumn.cards.length}
          onClose={closeModal}
          onPrev={() => navigateRel(-1)}
          onNext={() => navigateRel(1)}
        />
      )}
    </div>
  );
}
