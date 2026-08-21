export const EASE_EDITORIAL = "cubic-bezier(0.22, 1, 0.36, 1)";
export const EASE_MICRO = "cubic-bezier(0.33, 1, 0.68, 1)";

export const DURATION = {
  micro: 0.2,
  ui: 0.34,
  editorial: 0.65,
  hero: 1.1,
  sequence: 1.6,
} as const;

export const STAGGER = 0.09;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Directional step transition — used by the order concierge between steps. */
export function swapStep(
  outEl: HTMLElement | null,
  inEl: HTMLElement | null,
  dir: "forward" | "back",
  done?: () => void
) {
  if (prefersReducedMotion()) {
    if (outEl) outEl.style.display = "none";
    if (inEl) inEl.style.display = "block";
    done?.();
    return;
  }
  const d = dir === "back" ? -1 : 1;
  const dur = 380;
  if (outEl) {
    outEl.style.transition = `opacity ${dur / 2}ms ${EASE_MICRO}, transform ${dur / 2}ms ${EASE_MICRO}`;
    outEl.style.opacity = "0";
    outEl.style.transform = `translateX(${-16 * d}px)`;
  }
  window.setTimeout(() => {
    if (outEl) {
      outEl.style.display = "none";
      outEl.style.transform = "none";
    }
    if (inEl) {
      inEl.style.display = "block";
      inEl.style.opacity = "0";
      inEl.style.transform = `translateX(${16 * d}px)`;
      inEl.style.transition = `opacity ${dur}ms ${EASE_EDITORIAL}, transform ${dur}ms ${EASE_EDITORIAL}`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          inEl.style.opacity = "1";
          inEl.style.transform = "none";
        });
      });
    }
    done?.();
  }, dur / 2);
}

/** Stagger a group of already-visible elements — used after a click, not a scroll. */
export function enterStagger(els: HTMLElement[], step = 55) {
  if (prefersReducedMotion()) return;
  els.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = `opacity ${DURATION.ui * 1000}ms ${EASE_EDITORIAL}, transform ${DURATION.ui * 1000}ms ${EASE_EDITORIAL}`;
    window.setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "none";
    }, 60 + i * step);
  });
}
