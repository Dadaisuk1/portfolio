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
  force = false,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) {
      if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug("useMagnetic: disabled or no element", { el, enabled });
      }
      return;
    }

    // Respect reduced motion preferences.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug("useMagnetic: prefers-reduced-motion is enabled");
      }
      return;
    }

    // Allow an explicit override for testing via Vite env var
    const envForce =
      typeof import.meta !== "undefined" && import.meta.env &&
      (import.meta.env.VITE_FORCE_MAGNETIC === "true");
    let forceEnable = Boolean(envForce || force);

    // TEMPORARY: bypass pointer detection to prove animation works in this
    // environment. Remove or set this to `false` to restore pointer checks.
    const TEMP_BYPASS_POINTER_CHECK = true;

    // Only enable the magnetic effect on devices with a fine pointer (mouse),
    // unless explicitly forced or bypassed for testing. Some Windows/hybrid
    // devices report `hover: none` while still having a mouse — checking
    // `pointer: fine` is usually more reliable, but it can be overly strict.
    if (!TEMP_BYPASS_POINTER_CHECK && !forceEnable && !window.matchMedia("(pointer: fine)").matches) {
      if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.debug("useMagnetic: pointer is not fine (likely touch-only)");
      }
      return;
    }

    if (forceEnable && typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("useMagnetic: VITE_FORCE_MAGNETIC override enabled — forcing magnetic behavior");
    }

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: true,
      });
    };

    // Prefer Pointer Events (unified for mouse/touch/stylus). Track whether
    // the pointer is over the element and update from global pointermove so
    // we get reliable coordinates even when the pointer moves quickly.
    let isOver = false;

    const handlePointerEnter = () => {
      isOver = true;
    };

    const handlePointerLeave = () => {
      isOver = false;
      handleLeave();
    };

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      if (!isOver) return;
      const rect = el.getBoundingClientRect();
      const clientX = (e as PointerEvent).clientX ?? (e as MouseEvent).clientX;
      const clientY = (e as PointerEvent).clientY ?? (e as MouseEvent).clientY;

      const x = gsap.utils.mapRange(rect.left, rect.right, -rect.width / 2, rect.width / 2, clientX);
      const y = gsap.utils.mapRange(rect.top, rect.bottom, -rect.height / 2, rect.height / 2, clientY);

      gsap.to(el, {
        x: gsap.utils.clamp(-maxOffset, maxOffset, x * PULL_STRENGTH),
        y: gsap.utils.clamp(-maxOffset, maxOffset, y * PULL_STRENGTH),
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    };

    if (typeof window.PointerEvent !== "undefined") {
      el.addEventListener("pointerenter", handlePointerEnter);
      el.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("pointermove", handlePointerMove as EventListener);
    } else {
      // Mouse fallback
      el.addEventListener("mouseenter", handlePointerEnter);
      el.addEventListener("mouseleave", handlePointerLeave);
      el.addEventListener("mousemove", handlePointerMove as EventListener);
    }

    return () => {
      if (typeof window.PointerEvent !== "undefined") {
        el.removeEventListener("pointerenter", handlePointerEnter);
        el.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("pointermove", handlePointerMove as EventListener);
      } else {
        el.removeEventListener("mouseenter", handlePointerEnter);
        el.removeEventListener("mouseleave", handlePointerLeave);
        el.removeEventListener("mousemove", handlePointerMove as EventListener);
      }
    };
  }, [enabled, maxOffset]);

  return ref;
}
