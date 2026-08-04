import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setSmoother } from "../lib/smoothScroll";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export function useSmoothScroll(enabled: boolean) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !wrapperRef.current || !contentRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: reduced ? 0 : 1.2,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });
    setSmoother(smoother);

    // Layout settles a beat after mount (fonts, images) — refresh once it does.
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      setSmoother(null);
      smoother.kill();
    };
  }, [enabled]);

  return { wrapperRef, contentRef };
}
