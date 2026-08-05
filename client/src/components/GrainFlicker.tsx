import { useEffect, useId, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

const FLICKER_INTERVAL_MS = 120;

/**
 * Film-grain overlay that re-rolls its noise pattern every ~120ms while
 * `active`, by swapping the feTurbulence seed instead of animating a static
 * texture. Falls back to a single still frame under reduced motion.
 */
export function GrainFlicker({ active }: { active: boolean }) {
  const filterId = `grain-${useId().replace(/:/g, "")}`;
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100));

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) return;

    const interval = setInterval(() => {
      setSeed(Math.floor(Math.random() * 100));
    }, FLICKER_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-150"
      style={{ opacity: active ? 0.13 : 0, mixBlendMode: "overlay" }}
      aria-hidden="true"
    >
      <filter id={filterId}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves={2}
          seed={seed}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  );
}
