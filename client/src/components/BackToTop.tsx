import { scrollToTop } from "../lib/smoothScroll";
import { useMagnetic } from "../hooks/useMagnetic";

const MAGNETIC_OFFSET = 8;

export function BackToTop({
  visible,
  onNavigate,
}: {
  visible: boolean;
  onNavigate?: () => void;
}) {
  const ref = useMagnetic<HTMLButtonElement>(true, MAGNETIC_OFFSET);
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        scrollToTop();
        // Hide immediately rather than waiting on the ScrollTrigger boundary
        // to catch up with an animated scroll — more reliable than relying
        // on onLeaveBack firing mid-tween.
        onNavigate?.();
      }}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 bg-ink text-paper shadow-lg transition-all duration-300 hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:bottom-8 sm:right-8 cursor-pointer ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M8 13V3M3 7l5-5 5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
