import { useState, useRef } from "react";
import { CornerBrackets, FrameCounter, RecDot, Timestamp } from "./Hud";
import { GrainFlicker } from "./GrainFlicker";
// import { WaveField } from "./WaveField";
import { HalftoneReveal } from "./HalftoneReveal";
import { type CursorPoint } from "./DotGridBackground";
import { useMagnetic } from "../hooks/useMagnetic";

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
  const ref = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<CursorPoint>({ x: -9999, y: -9999, active: false });
  const expandRef = useMagnetic<HTMLButtonElement>(true);

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
      className="grain relative h-dvh w-full overflow-hidden"
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
      {/* <div className="absolute inset-0 bg-ink" /> */}
      {/* <DotGridBackground cursorRef={cursorRef} spacing={16} dotSize={2} /> */}
      {/* wave-signal texture - the site's recurring halftone asset, placed
          full-bleed and screen-blended straight onto the dot field below so
          the panel ties into the rest of the site's texture language instead
          of standing apart in plain white. */}
      {/* <WaveField tone="dark" className="opacity-5" /> */}

      {/* halftone reveal - the photo is screened into an ink/paper halftone print by
          default (WebGL), and comes into sharp focus in a loupe around the cursor or
          touch point, echoing the darkroom "develop" motif and the discoverability
          hint below far more literally than the old CSS mask ever did. */}
      <HalftoneReveal
        src="/assets/colored.svg"
        inkColor="#11100b"
        paperColor="#f5f2ea"
        mode="mono"
        dotDensity={80}
        angle={34}
        revealRadius={0.4}
        contrast={1.1}
        edge={0.72}
        follow={0.18}
        idleReveal={0}
        borderRadius="0px"
        className="!absolute inset-0"
        style={{ contain: "layout paint" }}
      />
      <GrainFlicker active={hovering} />

      {/* lens vignette - permanent edge falloff, same optical signature as the
          fisheye bulge in the dot field: reads as glass in front of the frame
          rather than a flat color layer */}
      {/* <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.62) 100%)",
        }}
      /> */}

      {/* viewfinder reticle - concentric rangefinder rings bowed by the same
          fisheye curve as the dot field, so the "glass" reads consistent
          across both the ambient grid and its frame lines */}
      {/* <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span
          className="absolute inset-0 m-auto rounded-[46%] border border-paper/[0.07]"
          style={{ width: "128%", height: "112%" }}
        />
        <span
          className="absolute inset-0 m-auto rounded-[48%] border border-paper/[0.05]"
          style={{ width: "94%", height: "82%" }}
        />
      </div> */}

      {/* soft light source that tracks the cursor/touch point - a warm glow
          spreading from a single point, echoing the same gradual falloff as
          the reveal mask, rather than a hard-edged viewfinder aim-point */}
      {/* <div
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
      </div> */}

      <CornerBrackets size="lg" />
      <RecDot size="lg" className="absolute left-6 top-6 sm:left-8 sm:top-8" />
      <Timestamp size="lg" className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8" />
      <FrameCounter
        current={currentFrame}
        total={totalFrames}
        size="lg"
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8"
      />

      {/* always mounted (visibility toggled via CSS, not conditional render) so the
          magnetic pointer listeners attached on mount never get orphaned by an
          unmount/remount cycle every time the panel collapses/expands */}
      <button
        ref={expandRef}
        type="button"
        onClick={onExpand}
        inert={!collapsed}
        aria-hidden={!collapsed}
        className={`absolute right-6 top-6 flex items-center gap-2 rounded-sm border border-paper/70 bg-ink/70 px-5 py-3 shadow-[0_2px_16px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-[opacity,background-color] duration-200 hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:right-8 sm:top-8 cursor-pointer ${
          collapsed ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg width="16" height="12" viewBox="0 0 14 10" aria-hidden="true">
          <path
            d="M0 1 H14 M0 5 H14 M0 9 H14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
        <span className="font-hud text-hud uppercase tracking-[0.08em] text-paper">
          Menu
        </span>
      </button>
    </div>
  );
}
