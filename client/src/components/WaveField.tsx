import type { CSSProperties } from "react";

export type WaveFieldTone = "dark" | "light";

const WAVE_SRC = "/assets/static-glitch.gif";

const BLEND_MODE: Record<WaveFieldTone, CSSProperties["mixBlendMode"]> = {
  dark: "screen",
  light: "multiply",
};

/**
 * A signal texture with real per-frame motion rather than a CSS-animated
 * still: static-glitch.gif is already a looping black/white noise reel, so
 * this places it full-bleed and lets a CSS blend mode composite it against
 * whatever sits underneath — screen to lighten it onto dark surfaces,
 * multiply to darken it onto paper. Layered on a slow opacity breathing
 * cycle so the noise also fades in and out like a signal losing lock,
 * instead of flickering at full strength the whole time.
 */
export function WaveField({
  tone = "dark",
  className = "",
}: {
  tone?: WaveFieldTone;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <img
        src={WAVE_SRC}
        alt=""
        className="h-full w-full object-cover motion-safe:animate-[wave-pulse_7s_ease-in-out_infinite]"
        style={{ mixBlendMode: BLEND_MODE[tone] }}
      />
    </div>
  );
}
