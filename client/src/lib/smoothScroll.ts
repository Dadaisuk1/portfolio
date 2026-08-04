import type { ScrollSmoother } from "gsap/ScrollSmoother";

let smoother: ScrollSmoother | null = null;

export function setSmoother(instance: ScrollSmoother | null) {
  smoother = instance;
}

export function scrollToTarget(target: string | Element) {
  if (smoother) {
    smoother.scrollTo(target, true, "top top");
    return;
  }

  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
