import { CornerBrackets, FrameCounter, RecDot, Timestamp } from "./Hud";
import { profile } from "../data/resume";

export function PhotoPanel() {
  return (
    <div className="grain relative h-[70vh] w-full shrink-0 overflow-hidden bg-gradient-to-br from-ink-blue via-teal/40 to-ink split:sticky split:top-0 split:h-screen split:w-[45%]">
      <CornerBrackets />
      <RecDot className="absolute left-6 top-6 sm:left-8 sm:top-8" />
      <Timestamp className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8" />
      <FrameCounter className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8" />

      <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
        {/* Replace this placeholder with a real photo of yourself */}
        <p className="font-hud text-tag uppercase tracking-[0.16em] text-paper/50">
          {profile.name}
          <br />
          viewfinder
        </p>
      </div>
    </div>
  );
}
