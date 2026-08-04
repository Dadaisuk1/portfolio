import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "../lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: reduced ? 0 : 1.2,
      smoothWheel: !reduced,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    // Standard Lenis + GSAP integration: drive Lenis's raf off gsap.ticker
    // (seconds since start, so *1000 for the ms Lenis expects) instead of a
    // separate requestAnimationFrame loop, and disable GSAP's own lag
    // smoothing so it doesn't fight Lenis's easing.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Layout settles a beat after mount (fonts, images) — refresh once it does.
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(1);
      lenis.destroy();
      setLenis(null);
    };
  }, [enabled]);
}
