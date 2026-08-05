import { useEffect, useState, type CSSProperties } from "react";
import { HalftoneReveal } from "./HalftoneReveal";

const DURATION_MS = 2600;
const EXIT_DURATION_MS = 1200;

const IRIS_MASK =
  "radial-gradient(circle at 50% 50%, transparent var(--iris-r), black calc(var(--iris-r) + 2px))";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [percent, setPercent] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      onDone();
      return;
    }

    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPercent(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const exitTimer = setTimeout(() => setExiting(true), DURATION_MS);
    const doneTimer = setTimeout(onDone, DURATION_MS + EXIT_DURATION_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-paper"
      style={
        {
          "--iris-r": exiting ? "100vmax" : "0px",
          transition: `--iris-r ${EXIT_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          WebkitMaskImage: IRIS_MASK,
          maskImage: IRIS_MASK,
        } as CSSProperties
      }
    >
      <div
        // duration-[1200ms] here must match EXIT_DURATION_MS above —
        // Tailwind needs the literal at build time, so it can't read the JS
        // constant. Same easing curve as the iris mask so the zoom and the
        // reveal read as one motion instead of two competing ones.
        className={`relative w-full max-w-xl px-8 transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] ${
          exiting ? "scale-[1.35] duration-[1200ms]" : "scale-100 duration-0"
        }`}
        style={{ aspectRatio: "1200 / 684" }}
      >
        <HalftoneReveal
          src="/assets/asci.svg"
          inkColor="#11100b"
          paperColor="#f5f2ea"
          mode="mono"
          dotSize={1.15}
          dotDensity={55}
          angle={34}
          contrast={1.35}
          trigger="off"
          // HalftoneReveal's "sharp" pass always applies a mouse-centered
          // lens-bend + chromatic-aberration warp (right, for PhotoPanel's
          // cursor loupe). There's no cursor here, so a huge revealRadius
          // is the lever that flattens that warp to ~0 everywhere instead
          // of touching the shared shader and risking the loupe elsewhere.
          revealRadius={8}
          idleReveal={percent / 100}
          borderRadius="0px"
          className="!absolute inset-0"
        />
      </div>
      <span
        className={`font-hud text-tag uppercase tracking-[0.08em] text-ash-deep transition-opacity duration-500 ease-in ${
          exiting ? "opacity-0" : "opacity-100"
        }`}
      >
        {percent}%
      </span>
    </div>
  );
}
