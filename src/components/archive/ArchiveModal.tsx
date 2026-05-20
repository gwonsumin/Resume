import { useEffect, type CSSProperties } from "react";
import type { ArchiveColumnData, ArchiveRecordCard } from "../../data/archiveData";
import "./ArchiveModal.scss";

type ArchiveModalProps = {
  item: ArchiveRecordCard;
  column: ArchiveColumnData;
  position: number; // 1-indexed
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function ArchiveModal({
  item,
  column,
  position,
  total,
  onClose,
  onPrev,
  onNext,
}: ArchiveModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  // year stamp text — try to derive "2024" / "SPR" tokens; falls back gracefully
  const yearTokens = item.year.split(/\s+/).slice(0, 2);

  const details = item.detailImages?.length ? item.detailImages : [item.mainImage];

  return (
    <div
      className="archive-modal__backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="archive-modal__spread"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`archive-modal-title-${item.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left page — hero */}
        <section
          className="archive-modal__page archive-modal__page--left"
          aria-label="작품"
        >
          <p className="archive-modal__eyebrow" style={{ color: column.accentColor }}>
            {column.columnTitle}
          </p>
          <h2
            className="archive-modal__title"
            id={`archive-modal-title-${item.id}`}
          >
            {item.title}
          </h2>
          <p className="archive-modal__meta">
            {item.year} {item.tags.length > 0 && `· ${item.tags.join(" · ")}`}
          </p>

          <div className="archive-modal__hero-wrap">
            <img
              className="archive-modal__hero"
              src={item.mainImage}
              alt={item.imageAlt}
            />
            <div
              className="archive-modal__stamp"
              aria-hidden="true"
              style={{ borderColor: column.accentColor, color: column.accentColor }}
            >
              <span>KEPT</span>
              {yearTokens.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          <p className="archive-modal__hand">{item.memo}</p>
        </section>

        {/* Binding gutter */}
        <div className="archive-modal__binding" aria-hidden="true" />

        {/* Right page — notes */}
        <section
          className="archive-modal__page archive-modal__page--right"
          aria-label="노트와 디테일"
        >
          <p className="archive-modal__section-label">NOTES &amp; DETAILS</p>

          <p className="archive-modal__body">{item.memo}</p>

          {details.length > 0 && (
            <>
              <p className="archive-modal__section-label">DETAILS · {details.length}</p>
              <div
                className="archive-modal__details"
                style={
                  {
                    gridTemplateColumns: `repeat(${Math.min(details.length, 3)}, 1fr)`,
                  } as CSSProperties
                }
              >
                {details.map((src, i) => (
                  <div className="archive-modal__detail" key={i}>
                    <img src={src} alt={`${item.title} 디테일 ${i + 1}`} />
                  </div>
                ))}
              </div>
            </>
          )}

          {item.tags.length > 0 && (
            <>
              <p className="archive-modal__section-label">TAGS</p>
              <ul className="archive-modal__tags">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </>
          )}

          <nav className="archive-modal__nav" aria-label="작품 사이 이동">
            <button
              type="button"
              className="archive-modal__nav-btn"
              onClick={onPrev}
            >
              ← PREV
            </button>
            <p className="archive-modal__counter" aria-live="polite">
              <span style={{ color: column.accentColor }}>
                {String(position).padStart(2, "0")}
              </span>
              <span>/ {String(total).padStart(2, "0")}</span>
            </p>
            <button
              type="button"
              className="archive-modal__nav-btn archive-modal__nav-btn--filled"
              onClick={onNext}
            >
              NEXT →
            </button>
          </nav>
        </section>

        <button
          type="button"
          className="archive-modal__close"
          onClick={onClose}
          aria-label="노트 닫기"
        >
          ×
        </button>
        <span className="archive-modal__close-hint" aria-hidden="true">
          ESC · CLOSE
        </span>
      </div>
    </div>
  );
}
