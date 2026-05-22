import { useState, useCallback, type SyntheticEvent } from "react";

export type ImageRatioVariant = "portrait" | "landscape" | "square";

function classify(w: number, h: number): ImageRatioVariant {
  if (h === 0) return "portrait";
  const r = w / h;
  if (r > 1.2) return "landscape";
  if (r < 0.85) return "portrait";
  return "square";
}

export function useImageRatio() {
  const [variant, setVariant] = useState<ImageRatioVariant>("portrait");

  const onLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setVariant(classify(naturalWidth, naturalHeight));
  }, []);

  // Handles already-cached images where onLoad may not fire
  const imgRef = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) {
      setVariant(classify(el.naturalWidth, el.naturalHeight));
    }
  }, []);

  return { variant, onLoad, imgRef };
}
