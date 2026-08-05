export function RecDot({
  className = "",
  tone = "dark",
  size = "tag",
}: {
  className?: string;
  tone?: "dark" | "light";
  size?: "tag" | "hud" | "lg";
}) {
  const textTone = tone === "light" ? "text-orange-deep" : "text-orange";
  const dotSize =
    size === "lg" ? "h-2.5 w-2.5" : size === "hud" ? "h-2 w-2" : "h-1.5 w-1.5";
  const textSize =
    size === "lg" ? "text-hud-lg" : size === "hud" ? "text-hud" : "text-tag";
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-hidden="true">
      <span className={`${dotSize} rounded-full bg-orange`} />
      <span
        className={`font-hud ${textSize} tracking-[0.08em] uppercase ${textTone}`}
      >
        REC
      </span>
    </div>
  );
}
