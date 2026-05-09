import { useEffect, useMemo, useRef, useState } from "react";
import type { ArchiveItem } from "../../data/archiveData";
import "./ArchiveModal.scss";

type ArchiveModalProps = {
  item: ArchiveItem;
  onClose: () => void;
};

function buildPreviewImages(item: ArchiveItem): string[] {
  const raw = [item.mainImage, ...(item.detailImages ?? [])];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of raw) {
    if (!seen.has(u)) {
      seen.add(u);
      out.push(u);
    }
  }
  return out;
}

export function ArchiveModal({ item, onClose }: ArchiveModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previewImages = useMemo(() => buildPreviewImages(item), [item.mainImage, item.detailImages]);
  const [selectedSrc, setSelectedSrc] = useState(item.mainImage);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus();
  }, [item.id]);

  useEffect(() => {
    setSelectedSrc(item.mainImage);
  }, [item.id, item.mainImage]);

  const heroAlt =
    selectedSrc === item.mainImage ? item.imageAlt : `${item.title} 기록 이미지`;

  return (
    <div className="archive-modal" role="dialog" aria-modal="true" aria-labelledby={`archive-modal-title-${item.id}`}>
      <button
        type="button"
        className="archive-modal__backdrop"
        aria-label="아카이브 상세 닫기"
        onClick={onClose}
      />
      <div className="archive-modal__sheet">
        <div className="archive-modal__body">
          <div className="archive-modal__hero">
            <figure className="archive-modal__visual">
              <img
                className="archive-modal__image"
                src={selectedSrc}
                alt={heroAlt}
                loading="eager"
                decoding="async"
              />
            </figure>
          </div>

          <div className="archive-modal__aside">
            <header className="archive-modal__intro">
              <p className="archive-modal__label" style={{ color: item.accentColor }}>
                {item.category}
              </p>
              <h2 className="archive-modal__title" id={`archive-modal-title-${item.id}`}>
                {item.title}
              </h2>
              <p className="archive-modal__meta archive-modal__meta--year">{item.year}</p>
            </header>

            <p className="archive-modal__memo">{item.memo}</p>

            <ul className="archive-modal__tags" aria-label="태그">
              {item.tags.map((tag, i) => (
                <li key={`${item.id}-tag-${i}`} className="archive-modal__tag">
                  {tag}
                </li>
              ))}
            </ul>

            {previewImages.length > 0 ? (
              <div className="archive-modal__thumbs" aria-label="미리보기 이미지 선택">
                {previewImages.map((src, i) => {
                  const isActive = src === selectedSrc;
                  return (
                    <button
                      key={`${item.id}-preview-${i}`}
                      type="button"
                      className={[
                        "archive-modal__thumb",
                        isActive ? "archive-modal__thumb--active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => setSelectedSrc(src)}
                      aria-label={i === 0 ? "대표 이미지 보기" : `기록 이미지 ${i} 선택`}
                      aria-pressed={isActive}
                    >
                      <img src={src} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="archive-modal__footer">
          <button ref={closeRef} type="button" className="archive-modal__close" onClick={onClose}>
            닫기 · Esc
          </button>
        </div>
      </div>
    </div>
  );
}
