import { useState, useRef } from "react";
import { GrainFlicker } from "./GrainFlicker";
import { HalftoneReveal } from "./HalftoneReveal";
import { useMagnetic } from "../hooks/useMagnetic";
import { useIconLabelFlourish } from "../hooks/useIconLabelFlourish";

export function PhotoPanel({
  collapsed = false,
  onExpand,
}: {
  collapsed?: boolean;
  onExpand?: () => void;
}) {
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const expandRef = useMagnetic<HTMLButtonElement>(true);
  const { iconRef: menuIconRef, labelRef: menuLabelRef } = useIconLabelFlourish<
    SVGSVGElement,
    HTMLSpanElement
  >(collapsed);

  const trackPoint = (x: number, y: number) => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", `${x}px`);
    ref.current.style.setProperty("--my", `${y}px`);
  };

  const releasePoint = () => {
    setHovering(false);
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

      {/* single identity mark — a plain wordmark in the corner, no theme
          chrome attached to it */}
      <span
        aria-hidden="true"
        className="absolute left-6 top-6 font-hud text-hud tracking-[0.04em] text-paper/80 sm:left-8 sm:top-8"
      >
        iamjpxfrd
      </span>

      {/* always mounted (visibility toggled via CSS, not conditional render) so the
          magnetic pointer listeners attached on mount never get orphaned by an
          unmount/remount cycle every time the panel collapses/expands */}
      <button
        ref={expandRef}
        type="button"
        onClick={onExpand}
        inert={!collapsed}
        aria-hidden={!collapsed}
        className={`absolute right-6 top-6 flex items-center gap-2 rounded-sm border border-paper/70 bg-ink/70 px-6 py-3 shadow-[0_2px_16px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-[opacity,background-color] duration-200 hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:right-8 sm:top-8 cursor-pointer ${
          collapsed ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg
          ref={menuIconRef}
          width="16"
          height="12"
          viewBox="0 0 14 10"
          aria-hidden="true"
        >
          <path
            d="M0 1 H14 M0 5 H14 M0 9 H14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
        <span className="inline-block overflow-hidden">
          <span
            ref={menuLabelRef}
            className="inline-block font-hud text-hud uppercase tracking-[0.08em] text-paper"
          >
            Menu
          </span>
        </span>
      </button>
    </div>
  );
}
