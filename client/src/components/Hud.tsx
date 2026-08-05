export function StaticGrain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' fill='%23000' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        animation: "grain-shift 0.5s steps(1) infinite",
      }}
    />
  );
}

export function ScanLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
        backgroundSize: "100% 3px",
        animation: "scanlines 8s linear infinite",
      }}
    />
  );
}

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
