export function CornerBrackets() {
  const common = "absolute w-5 h-5 border-paper/80";
  return (
    <div className="pointer-events-none absolute inset-3 sm:inset-5">
      <span className={`${common} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${common} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${common} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${common} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}

export function RecDot({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-orange motion-safe:animate-[rec-pulse_1.6s_ease-in-out_infinite]" />
      <span className="font-hud text-tag tracking-[0.08em] text-orange uppercase">REC</span>
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
    <span className={`font-hud text-tag text-orange tracking-[0.04em] ${className}`}>
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
    <span className={`font-hud text-tag text-ash tracking-[0.04em] ${className}`}>
      FRAME {pad(current)}/{pad(total)}
    </span>
  );
}
