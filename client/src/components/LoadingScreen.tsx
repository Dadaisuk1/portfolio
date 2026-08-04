import { useEffect, useState, type CSSProperties } from "react";
import { WaveDotField } from "./WaveDotField";

const BAR_DURATION_MS = 2600;
const IRIS_DURATION_MS = 650;
const TOTAL_DEV_FRAMES = 12;

function pad3(n: number) {
  return String(n).padStart(3, "0");
}

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"developing" | "shutter">("developing");
  const [irisOpen, setIrisOpen] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setPercent(100);
      setPhase("shutter");
      setIrisOpen(true);
      onDone();
      return;
    }

    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / BAR_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPercent(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const shutterTimer = setTimeout(() => setPhase("shutter"), BAR_DURATION_MS);
    const doneTimer = setTimeout(onDone, BAR_DURATION_MS + IRIS_DURATION_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(shutterTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  // Two rAFs so the closed (0px) mask paints before the transition to the
  // open state is triggered — otherwise React/CSS can coalesce them and the
  // iris would just pop open instead of animating.
  useEffect(() => {
    if (phase !== "shutter" || irisOpen) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setIrisOpen(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [phase, irisOpen]);

  if (phase === "shutter") {
    const maskGradient =
      "radial-gradient(circle at 50% 50%, transparent var(--iris-r), black calc(var(--iris-r) + 2px))";
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-paper"
        style={
          {
            "--iris-r": irisOpen ? "100vmax" : "0px",
            transition: `--iris-r ${IRIS_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
            WebkitMaskImage: maskGradient,
            maskImage: maskGradient,
          } as CSSProperties
        }
      >
        <span
          className="absolute left-6 top-6 font-hud text-tag uppercase tracking-[0.08em] text-ink sm:left-10 sm:top-10"
          aria-hidden="true"
        >
          Viewfinder
        </span>
        <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
          <g fill="none" className="stroke-ink" style={{ opacity: 0.18 }}>
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="60" />
            <circle cx="100" cy="100" r="30" />
          </g>
          <circle cx="100" cy="100" r="4" className="fill-orange" />
        </svg>
      </div>
    );
  }

  const currentFrame = Math.max(1, Math.ceil((percent / 100) * TOTAL_DEV_FRAMES));

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-ink">
      <WaveDotField tone="dark" className="-z-10" />
      <span
        className="absolute left-6 top-6 font-hud text-tag uppercase tracking-[0.08em] text-paper sm:left-10 sm:top-10"
        aria-hidden="true"
      >
        Viewfinder
      </span>

      <div style={{ perspective: "600px" }} aria-hidden="true">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="motion-safe:animate-[camera-spin_7s_linear_infinite]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <circle cx="60" cy="60" r="58" fill="none" className="stroke-teal" style={{ opacity: 0.5 }} />
          <rect x="24" y="42" width="72" height="52" rx="6" fill="none" className="stroke-paper" strokeWidth="2" />
          <rect x="46" y="30" width="28" height="14" rx="3" fill="none" className="stroke-paper" strokeWidth="2" />
          <circle cx="60" cy="70" r="18" fill="none" className="stroke-orange" strokeWidth="2" />
          <circle cx="60" cy="70" r="7" className="fill-orange" />
          <circle cx="82" cy="50" r="3" className="fill-paper" />
        </svg>
      </div>

      <div className="flex w-56 flex-col items-center gap-3" role="status">
        <span className="font-hud text-tag uppercase tracking-[0.08em] text-ash">
          Developing
        </span>
        <div className="h-[2px] w-full overflow-hidden bg-ash/25">
          <div className="h-full bg-orange" style={{ width: `${percent}%` }} />
        </div>
        <div className="flex w-full justify-between">
          <span className="font-hud text-tag tracking-[0.04em] text-ash">{percent}%</span>
          <span className="font-hud text-tag tracking-[0.04em] text-ash">
            FRAME {pad3(currentFrame)}/{pad3(TOTAL_DEV_FRAMES)}
          </span>
        </div>
      </div>
    </div>
  );
}
