export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
