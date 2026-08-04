import { useEffect, useState } from "react";

const BAR_DURATION_MS = 2600;
const FLASH_DURATION_MS = 280;

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [flashing, setFlashing] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);

    const barTime = mql.matches ? 0 : BAR_DURATION_MS;
    const flashTime = mql.matches ? 0 : FLASH_DURATION_MS;

    const flashTimer = setTimeout(() => setFlashing(true), barTime);
    const doneTimer = setTimeout(() => onDone(), barTime + flashTime);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-ink">
      <div
        className="relative h-28 w-40"
        style={{ perspective: "600px" }}
        aria-hidden="true"
      >
        <div
          className={`relative h-full w-full rounded-md border-2 border-ash/40 bg-ink-blue ${
            reduced ? "" : "motion-safe:animate-[camera-spin_7s_linear_infinite]"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange/70 bg-ink" />
          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-blue" />
          <div className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-orange motion-safe:animate-[rec-pulse_1.6s_ease-in-out_infinite]" />
          <div className="absolute -top-3 left-5 h-4 w-10 rounded-t-sm bg-ink-blue border-2 border-b-0 border-ash/40" />
        </div>
      </div>

      <div className="flex w-56 flex-col items-center gap-3">
        <span className="font-hud text-tag uppercase tracking-[0.08em] text-ash">
          Developing
        </span>
        <div className="h-[2px] w-full overflow-hidden bg-ash/25">
          <div
            className="h-full bg-orange"
            style={{
              animation: reduced
                ? "none"
                : `developing-bar ${BAR_DURATION_MS}ms ease-out forwards`,
              width: reduced ? "100%" : undefined,
            }}
          />
        </div>
      </div>

      {flashing && (
        <div
          className="fixed inset-0 z-[60] bg-paper"
          style={{
            animation: reduced
              ? "none"
              : `shutter-flash ${FLASH_DURATION_MS}ms ease-out forwards`,
            opacity: reduced ? 0 : undefined,
          }}
        />
      )}
    </div>
  );
}
