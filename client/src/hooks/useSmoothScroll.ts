import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    // Layout settles a beat after mount (fonts, images) — refresh once it does.
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
    };
  }, [enabled]);
}
