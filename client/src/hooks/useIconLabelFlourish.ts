import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Menu and Close live as two separate always-swapping buttons (PhotoPanel's
 * magnetic Menu trigger, Nav's own Close trigger) rather than one persistent
 * DOM node, so they can't literally cross-fade their own label like a single
 * toggle would. This hook gives each one a matching icon-rotate + masked
 * label-slide reaction to its own visibility flipping, so the handoff between
 * them reads as one continuous control passing itself along. Skips the first
 * render so mount doesn't replay the transition for whichever side starts
 * visible.
 */
export function useIconLabelFlourish<
  TIcon extends HTMLElement | SVGSVGElement,
  TLabel extends HTMLElement,
>(visible: boolean) {
  const iconRef = useRef<TIcon>(null);
  const labelRef = useRef<TLabel>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    const icon = iconRef.current;
    const label = labelRef.current;
    if (!icon || !label) return;

    gsap.killTweensOf([icon, label]);
    const tl = gsap.timeline();

    if (visible) {
      gsap.set(label, { yPercent: 120 });
      gsap.set(icon, { rotate: -90, opacity: 0, scale: 0.6 });
      tl.to(
        icon,
        { rotate: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power4.out" },
        0.1,
      ).to(label, { yPercent: 0, duration: 0.5, ease: "power4.out" }, 0.14);
    } else {
      tl.to(label, { yPercent: -130, duration: 0.26, ease: "power3.in" }, 0).to(
        icon,
        { rotate: 90, opacity: 0, duration: 0.24, ease: "power3.in" },
        0,
      );
    }
  }, [visible]);

  return { iconRef, labelRef };
}
