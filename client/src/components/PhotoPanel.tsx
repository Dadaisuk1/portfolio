import { useState, useRef } from "react";
import { CornerBrackets, FrameCounter, RecDot, Timestamp } from "./Hud";
import { GrainFlicker } from "./GrainFlicker";

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

  return (
    <div
      ref={ref}
      className={`grain relative h-[70vh] shrink-0 overflow-hidden split:h-screen ${
        collapsed ? "w-full" : "w-full split:w-[45%]"
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        if (ref.current) {
          ref.current.style.setProperty("--mx", "-999px");
          ref.current.style.setProperty("--my", "-999px");
        }
      }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ref.current.style.setProperty("--mx", `${x}px`);
        ref.current.style.setProperty("--my", `${y}px`);
      }}
      style={{
        // initialize CSS vars used by the spotlight mask
        ["--mx" as any]: "-999px",
        ["--my" as any]: "-999px",
      }}
    >
      <div className="absolute inset-0 bg-gray-800" />
      {/* spotlight image layer - revealed only inside the radial mask at mouse */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 transition-opacity duration-150"
          style={{
            // primary: /assets/me.jpg, fallback to existing /assets/cit.png if me.jpg missing
            backgroundImage: "url('/assets/me.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitMaskImage:
              "radial-gradient(circle 14rem at var(--mx) var(--my), black 0%, transparent 60%)",
            maskImage:
              "radial-gradient(circle 14rem at var(--mx) var(--my), black 0%, transparent 60%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      </div>
      <GrainFlicker active={hovering} />

      <CornerBrackets />
      <RecDot className="absolute left-6 top-6 sm:left-8 sm:top-8" />
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
