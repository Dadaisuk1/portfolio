import { useEffect, type RefObject } from "react";

/**
 * Escape key or a mousedown outside every ref in `excludeRefs` calls
 * `onDismiss`. Shared by Nav's full-viewport panel and ContactModal's popover
 * — Nav has no separate trigger to exclude (its own Menu button goes inert
 * while open), so it passes just its panel ref; ContactModal excludes both
 * its panel and its always-visible trigger button.
 */
export function useDismissOnOutsideOrEscape(
  active: boolean,
  excludeRefs: RefObject<HTMLElement | null>[],
  onDismiss: () => void,
) {
  useEffect(() => {
    if (!active) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (excludeRefs.some((ref) => ref.current?.contains(target))) return;
      onDismiss();
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, onDismiss]);
}
