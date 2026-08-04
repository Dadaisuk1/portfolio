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

export function CornerBrackets() {
  const common = "absolute w-6 h-6 border-paper/80 sm:w-7 sm:h-7";
  return (
    <div
      className="pointer-events-none absolute inset-3 sm:inset-5"
      aria-hidden="true"
    >
      <span className={`${common} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${common} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${common} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${common} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}

const REC_BLINK = "motion-safe:animate-[rec-pulse_1.2s_steps(1)_infinite]";

export function RecDot({
  className = "",
  tone = "dark",
  size = "tag",
}: {
  className?: string;
  tone?: "dark" | "light";
  size?: "tag" | "hud";
}) {
  const textTone = tone === "light" ? "text-orange-deep" : "text-orange";
  const dotSize = size === "hud" ? "h-2 w-2" : "h-1.5 w-1.5";
  const textSize = size === "hud" ? "text-hud" : "text-tag";
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-hidden="true">
      <span className={`${dotSize} rounded-full bg-orange ${REC_BLINK}`} />
      <span
        className={`font-hud ${textSize} tracking-[0.08em] uppercase ${REC_BLINK} ${textTone}`}
      >
        REC
      </span>
    </div>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Timestamp({ className = "" }: { className?: string }) {
  const d = new Date();
  const stamp = `'${pad(d.getFullYear() % 100)} ${pad(d.getMonth() + 1)} ${pad(
    d.getDate(),
  )} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  return (
    <span
      className={`font-hud text-hud text-orange tracking-[0.04em] ${className}`}
      aria-hidden="true"
    >
      {stamp}
    </span>
  );
}

export function FrameCounter({
  current = 1,
  total = 12,
  className = "",
}: {
  current?: number;
  total?: number;
  className?: string;
}) {
  return (
    <span
      className={`font-hud text-hud text-ash tracking-[0.04em] ${className}`}
      aria-hidden="true"
    >
      FRAME {pad(current)}/{pad(total)}
    </span>
  );
}
