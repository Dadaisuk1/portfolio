import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Reveals a section the way a print emerges in the developing tray: it starts
 * dim, desaturated, and slightly soft, then clarifies into full focus. Ties
 * the scroll reveal to the same "developing" idea as the loading sequence
 * instead of a generic fade-and-rise.
 */
export function useDevelopReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 28, filter: "blur(6px) saturate(0.5)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px) saturate(1)",
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref },
  );

  return ref;
}
