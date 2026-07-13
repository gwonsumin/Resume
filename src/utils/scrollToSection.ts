import { suspendScrollSnap } from "./suspendScrollSnap";

const SCROLL_OFFSET_PX = 16;

export function getHeaderHeight() {
  const header = document.querySelector(".site-header");
  return header instanceof HTMLElement ? header.offsetHeight : 0;
}

/** 헤더 높이만큼 offset을 두고 섹션으로 스크롤한다. smooth 스크롤 중에는 scroll-snap을 잠시 끈다. */
export function scrollToSection(sectionId: string, smooth = true) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const reduce =
    smooth && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const useSmooth = smooth && !reduce;

  const top =
    target.getBoundingClientRect().top +
    window.scrollY -
    getHeaderHeight() -
    SCROLL_OFFSET_PX;

  if (useSmooth) {
    suspendScrollSnap();
  }

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: useSmooth ? "smooth" : "auto",
  });
}
