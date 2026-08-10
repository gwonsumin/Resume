/** Minimal wrapper around the gtag.js tag installed in `index.html`. */

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Sends a GA4 `page_view` event for client-side (react-router) navigation. */
export function trackPageview(path: string, title?: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  })
}
