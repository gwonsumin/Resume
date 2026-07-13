const SUSPEND_CLASS = "scroll-snap-suspended";
const FALLBACK_MS = 900;

/**
 * CSS scroll-snap on <html> can intercept a programmatic smooth scroll
 * and settle at the nearest snap point instead of the intended target
 * (e.g. nav "Archive" stopping at "About"). Suspend snapping for the
 * duration of the scroll, then restore it once the scroll settles.
 */
export function suspendScrollSnap() {
  const root = document.documentElement;
  root.classList.add(SUSPEND_CLASS);

  let done = false;
  const resume = () => {
    if (done) return;
    done = true;
    root.classList.remove(SUSPEND_CLASS);
    window.removeEventListener("scrollend", resume);
  };

  window.addEventListener("scrollend", resume, { once: true });
  window.setTimeout(resume, FALLBACK_MS);
}
