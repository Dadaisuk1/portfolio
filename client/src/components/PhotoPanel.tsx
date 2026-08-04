import { useState, useRef } from "react";
import { CornerBrackets, FrameCounter, RecDot, Timestamp } from "./Hud";
import { GrainFlicker } from "./GrainFlicker";
import { type CursorPoint } from "./WaveDotField";
import { DotGridBackground } from "./DotGridBackground";

const FALLBACK_SRC = "/assets/cit.png";

export function PhotoPanel({
  currentFrame = 0,
  totalFrames = 1,
  collapsed = false,
  onExpand,
}: {
  currentFrame?: number;
  totalFrames?: number;
  collapsed?: boolean;
  onExpand?: () => void;
}) {
  const [hovering, setHovering] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState("/assets/me.svg");
  const ref = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<CursorPoint>({ x: -9999, y: -9999, active: false });

  const trackPoint = (x: number, y: number) => {
    cursorRef.current.x = x;
    cursorRef.current.y = y;
    cursorRef.current.active = true;
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", `${x}px`);
    ref.current.style.setProperty("--my", `${y}px`);
  };

  const releasePoint = () => {
    setHovering(false);
    cursorRef.current.active = false;
    if (ref.current) {
      ref.current.style.setProperty("--mx", "-999px");
      ref.current.style.setProperty("--my", "-999px");
    }
  };

  return (
    <div
      ref={ref}
      className={`grain relative h-[70vh] shrink-0 overflow-hidden split:h-screen ${
        collapsed ? "w-full" : "w-full split:w-[45%]"
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={releasePoint}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        trackPoint(e.clientX - rect.left, e.clientY - rect.top);
      }}
      onTouchStart={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const touch = e.touches[0];
        setHovering(true);
        trackPoint(touch.clientX - rect.left, touch.clientY - rect.top);
      }}
      onTouchMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const touch = e.touches[0];
        trackPoint(touch.clientX - rect.left, touch.clientY - rect.top);
      }}
      onTouchEnd={releasePoint}
      onTouchCancel={releasePoint}
      style={{
        // initialize CSS vars used by the spotlight mask
        ["--mx" as any]: "-999px",
        ["--my" as any]: "-999px",
      }}
    >
      <div className="absolute inset-0 bg-ink-blue" />
      <DotGridBackground cursorRef={cursorRef} />
      {/* spotlight image layer - revealed only inside the radial mask at the cursor/touch point.
          The mask lives on this full-bleed wrapper (so --mx/--my line up with the cursor
          regardless of panel width); the photo itself is pinned to a height-bound square
          inside it so it's never upscaled past its native ~600px resolution, letterboxed
          by the ink-blue base layer instead of stretching edge-to-edge and turning to mush. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle 16rem at var(--mx) var(--my), black 0%, rgba(0,0,0,0.58) 25%, rgba(0,0,0,0.29) 50%, rgba(0,0,0,0.09) 75%, transparent 100%)",
          maskImage:
            "radial-gradient(circle 16rem at var(--mx) var(--my), black 0%, rgba(0,0,0,0.58) 25%, rgba(0,0,0,0.29) 50%, rgba(0,0,0,0.09) 75%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <img
          src={imgSrc}
          alt="Darwin Darryl Jean E. Largoza"
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (imgSrc !== FALLBACK_SRC) setImgSrc(FALLBACK_SRC);
          }}
          className={`absolute left-1/2 top-0 aspect-square h-full w-auto -translate-x-1/2 object-cover transition-opacity duration-150 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            filter: "sepia(0.3) saturate(0.75) contrast(1.08) brightness(0.97)",
          }}
        />
      </div>
      <GrainFlicker active={hovering} />

      {/* soft light source that tracks the cursor/touch point - a warm glow
          spreading from a single point, echoing the same gradual falloff as
          the reveal mask, rather than a hard-edged viewfinder aim-point */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-72 w-72 transition-opacity duration-300"
        style={{
          transform: "translate(calc(var(--mx) - 50%), calc(var(--my) - 50%))",
          opacity: hovering ? 1 : 0,
        }}
      >
        <div
          className="h-full w-full rounded-full motion-safe:animate-[glow-breathe_3s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, rgba(238,93,0,0.18) 0%, rgba(238,93,0,0.07) 35%, transparent 70%)",
          }}
        />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange" />
      </div>

      {/* discoverability hint - signals a hidden photo without revealing it; fades out once hovering/touching */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300"
        style={{ opacity: hovering ? 0 : 1 }}
        aria-hidden="true"
      >
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-paper/30">
          <span className="h-2 w-2 rounded-full bg-orange motion-safe:animate-[rec-pulse_1.2s_steps(1)_infinite]" />
        </span>
        <span className="font-hud text-hud uppercase tracking-[0.14em] text-paper/50">
          Move or touch to develop
        </span>
      </div>

      {!collapsed && (
        <span
          className="absolute right-6 top-6 font-hud text-hud text-ash tracking-[0.04em] sm:right-8 sm:top-8"
          aria-hidden="true"
        >
          50MM · F/2.8
        </span>
      )}

      <CornerBrackets />
      <RecDot
        size="hud"
        className="absolute left-6 top-6 sm:left-8 sm:top-8"
      />
      <Timestamp className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8" />
      <FrameCounter
        current={currentFrame}
        total={totalFrames}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8"
      />

      {collapsed && (
        <button
          type="button"
          onClick={onExpand}
          className="absolute right-6 top-6 flex items-center gap-2 rounded-sm border border-paper/60 px-4 py-2.5 transition-colors hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:right-8 sm:top-8 cursor-pointer"
        >
          <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
            <path
              d="M0 1 H14 M0 5 H14 M0 9 H14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          <span className="font-hud text-tag uppercase tracking-[0.08em] text-paper">
            Menu
          </span>
        </button>
      )}
    </div>
  );
}
