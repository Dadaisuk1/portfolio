import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const DEFAULT_MAX_OFFSET = 12;
const PULL_STRENGTH = 0.4;

/**
 * Cursor-follow "magnetic" pull, bounded to maxOffset px and eased back to
 * rest on mouseleave. No-ops under reduced motion or on touch-only devices,
 * where there's no persistent cursor to follow.
 */
export function useMagnetic<T extends HTMLElement>(
  enabled: boolean,
  maxOffset = DEFAULT_MAX_OFFSET,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const quickX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const quickY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      quickX(gsap.utils.clamp(-maxOffset, maxOffset, relX * PULL_STRENGTH));
      quickY(gsap.utils.clamp(-maxOffset, maxOffset, relY * PULL_STRENGTH));
    };

    const handleLeave = () => {
      quickX(0);
      quickY(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, maxOffset]);

  return ref;
}
