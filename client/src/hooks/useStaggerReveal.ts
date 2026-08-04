import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-triggered staggered blur-to-sharp reveal — same motif as
 * useDevelopReveal, but for a group of items instead of one section, and
 * without the y-shift (items sit in a grid, not a print sliding into view).
 * Pass childSelector to target nested items instead of direct children
 * (e.g. icon rows inside grid-column wrapper divs).
 */
export function useStaggerReveal<T extends HTMLElement>(childSelector?: string) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        console.log(
          "🎬 useStaggerReveal: Animations skipped (prefers-reduced-motion: reduce)",
          ref.current,
        );
        return;
      }

      const targets = childSelector
        ? ref.current.querySelectorAll(childSelector)
        : ref.current.children;

      console.log("🎬 useStaggerReveal: Starting stagger animation on", targets.length, "items");
      gsap.fromTo(
        targets,
        { opacity: 0, filter: "blur(6px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref },
  );

  return ref;
}
