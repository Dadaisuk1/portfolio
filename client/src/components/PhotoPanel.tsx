import { useState } from "react";
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

  return (
    <div
      className={`grain relative h-[70vh] shrink-0 overflow-hidden split:h-screen ${
        collapsed ? "w-full" : "w-full split:w-[45%]"
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 155deg, oklab(20.8% -0.015 -0.017) 0%, oklab(42.3% -0.051 -0.046) 48%, oklab(30.2% 0.020 0.017) 78%, oklab(40.7% 0.084 0.048) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at 30% 25% in oklab, oklab(65.8% 0.143 0.133 / 16%) 0%, oklab(0% 0 0 / 0%) 45%), radial-gradient(circle farthest-corner at 50% 100% in oklab, oklab(0% 0 0 / 55%) 0%, oklab(0% 0 0 / 0%) 60%)",
        }}
      />
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
          className="absolute right-6 top-6 flex items-center gap-2 rounded-sm border border-paper/60 px-4 py-2.5 transition-colors hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:right-8 sm:top-8"
        >
          <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
            <path d="M0 1 H14 M0 5 H14 M0 9 H14" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="font-hud text-tag uppercase tracking-[0.08em] text-paper">
            Menu
          </span>
        </button>
      )}
    </div>
  );
}
