import { profile } from "../data/resume";
import { RecDot } from "./Hud";
import { scrollToTarget } from "../lib/smoothScroll";

const items = [
  { frame: "01", label: "Work", href: "#work" },
  { frame: "02", label: "About", href: "#about" },
  { frame: "03", label: "Skills", href: "#skills" },
  { frame: "04", label: "Education", href: "#education" },
  { frame: "05", label: "Contact", href: "#contact" },
];

export function Nav({
  onFrameHover,
}: {
  onFrameHover?: (frame: number | null) => void;
}) {
  return (
    <div className="paper-grain flex flex-col justify-center gap-10 bg-paper px-6 py-16 text-ink split:min-h-screen split:px-14">
      <div>
        <div className="mb-4 flex items-center gap-4">
          <RecDot tone="light" />
          <span className="font-hud text-tag uppercase tracking-[0.08em] text-ink/70">
            Open to internships
          </span>
        </div>
        <h1
          className="font-display italic text-hero text-ink"
          style={{ fontWeight: 340 }}
        >
          {profile.role}
        </h1>
        <p className="mt-6 max-w-md font-body text-body-lg text-ink/70">
          {profile.name} — building interfaces end-to-end, from Figma to
          production React.
        </p>
      </div>

      <nav aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.frame} className="border-b border-ash/25">
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(item.href);
                }}
                onMouseEnter={() => onFrameHover?.(Number(item.frame))}
                onMouseLeave={() => onFrameHover?.(null)}
                onFocus={() => onFrameHover?.(Number(item.frame))}
                onBlur={() => onFrameHover?.(null)}
                className="group flex items-center gap-4 py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-deep hover:text-orange-deep"
              >
                <span className="font-hud text-hud text-orange-deep">[{item.frame}]</span>
                <span
                  className="font-display text-h3 text-ink group-hover:text-orange-deep group-focus-visible:text-orange-deep"
                  style={{ fontWeight: 580 }}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
