import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STAGGER_STEP = 0.05;
const MAX_STAGGER_DELAY = 0.3;

/**
 * Scales and fades each item in as it crosses into view, then reverses the
 * same tween when it scrolls back out — unlike the site's one-shot "develop"
 * reveals, this replays every time an item re-enters, the way React Bits'
 * AnimatedList drives its rows off `useInView({ triggerOnce: false })`. Built
 * on a ScrollTrigger per item instead of the `motion` package, since GSAP +
 * Lenis is already this site's scroll-motion engine (see design.md §08).
 */
export function useScrollScaleReveal<T extends HTMLElement>(childSelector?: string) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const targets = childSelector
        ? ref.current.querySelectorAll(childSelector)
        : ref.current.children;

      gsap.utils.toArray(targets).forEach((el, i) => {
        gsap.fromTo(
          el as Element,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            delay: Math.min(i * STAGGER_STEP, MAX_STAGGER_DELAY),
            ease: "power2.out",
            transformOrigin: "50% 50%",
            scrollTrigger: {
              trigger: el as Element,
              start: "top 88%",
              end: "bottom 12%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return ref;
}
