import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { archiveColumns } from "../../data/archiveData";
import type {
  ArchiveColumnData,
  ArchiveFastener,
  ArchiveRecordCard,
} from "../../data/archiveData";
import { ArchiveModal } from "./ArchiveModal";
import "./ArchiveBoard.scss";

/* -------------------------------------------------------------------------- */
/* Layout constants                                                           */
/* -------------------------------------------------------------------------- */

const CARD_W = 225;
const CARD_H = 300;
const CARD_GAP = 27; // between cards
const SHELF_PAD_X = 30;

/** i번째 카드의 셸프 내부 절대 위치 */
function slotFor(i: number) {
  return {
    x: SHELF_PAD_X + i * (CARD_W + CARD_GAP),
    y: [30, 50, 35, 55][i % 4],
    rot: [-3, 2, -2, 3][i % 4],
  };
}

const FASTENER_LABEL: Record<ArchiveFastener, string> = {
  pin: "핀으로 고정 · pinned",
  tape: "와시테이프로 붙임 · taped",
  clip: "클립으로 끼움 · clipped",
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
  onHover: () => void;
  onLeave: () => void;
  onOpen: () => void;
};

function PinnedCard({
  card,
  slotIndex,
  fastener,
  accentColor,
  isHovered,
  onHover,
  onLeave,
  onOpen,
}: PinnedCardProps) {
  const slot = slotFor(slotIndex);
  const style: CSSProperties = {
    left: slot.x,
    top: slot.y,
    width: CARD_W,
    height: CARD_H,
    transform: `rotate(${slot.rot}deg)${isHovered ? " translateY(-6px) scale(1.03)" : ""}`,
    zIndex: isHovered ? 10 : 1,
  };

  return (
    <button
      type="button"
      className={`archive-pin${isHovered ? " is-hovered" : ""}`}
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
        <img
          className="archive-pin__image"
          src={card.mainImage}
          alt={card.imageAlt}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="archive-pin__caption">
          <span className="archive-pin__caption-title">{card.title}</span>
          <span className="archive-pin__caption-meta">{card.year}</span>
        </span>
      </span>

      <span className="archive-pin__note" aria-hidden="true">
        {card.memo}
        <span className="archive-pin__note-meta">{card.category}</span>
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* "Coming soon" placeholder                                                  */
/* -------------------------------------------------------------------------- */

function ComingSoonSlot({ slotIndex, fastener }: { slotIndex: number; fastener: ArchiveFastener }) {
  const slot = slotFor(slotIndex);
  const style: CSSProperties = {
    left: slot.x,
    top: slot.y,
    width: CARD_W,
    height: CARD_H,
    transform: `rotate(${slot.rot}deg)`,
  };
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
  const style: CSSProperties = { "--tab-color": column.accentColor } as CSSProperties;
  return (
    <button
      type="button"
      className={`archive-tab${active ? " is-active" : ""}`}
      style={style}
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

export function ArchiveBoard() {
  const [activeId, setActiveId] = useState<string>(archiveColumns[0]!.id);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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
  const dragStartRef = useRef({ x: 0, startDragX: 0 });

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
  const maxScroll = overflows ? shelfW - innerWidth : 0;
  const clamp = useCallback(
    (v: number) => Math.max(maxScroll, Math.min(0, v)),
    [maxScroll],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!overflows) return;
    if (e.button !== 0) return;
    setDragging(true);
    didDragRef.current = false;
    dragStartRef.current = { x: e.clientX, startDragX: dragX };
    // NOTE: setPointerCapture is intentionally NOT called here.
    // Calling it during pointerdown suppresses all compatibility mouse events
    // (mouseup, click), which prevents button onClick handlers from firing.
    // Capture is set lazily in onPointerMove once the drag threshold is crossed.
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    if (Math.abs(dx) > 4) {
      if (!didDragRef.current) {
        // Capture only on the first frame past threshold so drag stays smooth
        // even when pointer leaves the shelf.
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* noop */ }
      }
      didDragRef.current = true;
    }
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

  /* ---------- lock body scroll while modal open ---------- */
  useEffect(() => {
    if (openIdx === null) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [openIdx]);

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
        className={`archive-board__shelf${overflows ? " is-scrollable" : ""}${dragging ? " is-dragging" : ""}`}
        id={`archive-shelf-${activeColumn.id}`}
        role="tabpanel"
        aria-labelledby={`archive-tab-${activeColumn.id}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          key={activeColumn.id}
          className="archive-board__track"
          style={
            {
              width: innerWidth,
              transform: `translateX(${dragX}px)`,
              transition: dragging ? "none" : undefined,
            } as CSSProperties
          }
        >
          {activeColumn.cards.map((card, i) => (
            <PinnedCard
              key={card.id}
              card={card}
              slotIndex={i}
              fastener={activeColumn.fastener}
              accentColor={activeColumn.accentColor}
              isHovered={hoverIdx === i && !dragging}
              onHover={() => setHoverIdx(i)}
              onLeave={() =>
                setHoverIdx((h) => (h === i ? null : h))
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
        {overflows && dragX > maxScroll + 4 && (
          <div className="archive-board__fade archive-board__fade--right" aria-hidden="true" />
        )}
        {overflows && dragX < -4 && (
          <div className="archive-board__fade archive-board__fade--left" aria-hidden="true" />
        )}

        {/* drag hint */}
        {overflows && dragX > maxScroll + 4 && (
          <div className="archive-board__drag-hint" aria-hidden="true">
            ← DRAG
          </div>
        )}
      </div>

      {/* Foot row */}
      <div className="archive-board__foot">
        <span>HOVER · NOTE</span>
        <span>CLICK · OPEN {overflows ? "· DRAG · SCROLL" : ""}</span>
        <span>← → · NAVIGATE &nbsp;·&nbsp; ESC · CLOSE</span>
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
