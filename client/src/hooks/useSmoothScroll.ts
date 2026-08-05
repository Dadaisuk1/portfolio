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
      // Let Lenis drive its own rAF loop instead of piggybacking on
      // gsap.ticker — the manual hand-off was the flakiness: wheel-driven
      // scroll depended on that tick firing correctly every frame, while
      // lenis.scrollTo() (used by nav links / back-to-top) animates fine
      // regardless since it only needs raf to be running at all, which is
      // why clicks worked but the ambient wheel smoothing didn't.
      autoRaf: true,
      allowNestedScroll: true,
      // Recompute scroll limits live rather than relying on cached
      // ResizeObserver dimensions — this page's height shifts continuously
      // (Nav open/close transition, blur-in scroll reveals, web fonts),
      // and a stale cached limit is exactly what would make wheel scroll
      // feel stuck or partial while a one-shot scrollTo() still lands fine.
      naiveDimensions: true,
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    // Layout settles a beat after mount (fonts, images) — refresh once it does.
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      lenis.destroy();
      setLenis(null);
    };
  }, [enabled]);
}
