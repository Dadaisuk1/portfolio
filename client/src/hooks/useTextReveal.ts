import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Staggers the immediate children of the returned ref in on mount — the
 * same "developing print" motif as useDevelopReveal (blur → sharp), but as
 * an entrance rather than a scroll trigger. Meant for a pre-split
 * collection of word/line spans, not raw text.
 */
export function useTextReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 16, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.06,
        },
      );
    },
    { scope: ref },
  );

  return ref;
}
