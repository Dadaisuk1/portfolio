import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { useMagnetic } from "../hooks/useMagnetic";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-sm font-hud font-medium text-tag uppercase tracking-[0.06em] border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

const variants = {
  primary:
    "bg-orange border-orange text-ink hover:bg-transparent hover:text-orange-deep",
  ghost: "bg-transparent border-paper text-paper hover:bg-paper hover:text-ink",
  "ghost-dark":
    "bg-transparent border-ink text-ink hover:bg-ink hover:text-paper",
};

type Variant = keyof typeof variants;

export function Button({
  variant = "primary",
  magnetic = false,
  forceMagnetic = false,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  magnetic?: boolean;
  forceMagnetic?: boolean;
}) {
  const ref = useMagnetic<HTMLButtonElement>(
    magnetic,
    undefined,
    forceMagnetic,
  );
  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function LinkButton({
  variant = "primary",
  magnetic = false,
  forceMagnetic = false,
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  magnetic?: boolean;
  forceMagnetic?: boolean;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(
    magnetic,
    undefined,
    forceMagnetic,
  );
  return (
    <a
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
