import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTarget(target: string | Element) {
  if (lenis) {
    lenis.scrollTo(target as string | HTMLElement, { offset: 0 });
    return;
  }

  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0);
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}
