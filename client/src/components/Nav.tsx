import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/resume";
// import { RecDot } from "./Hud";
import { LinkButton } from "./Button";
import { Spinner } from "./Spinner";
import { scrollToTarget } from "../lib/smoothScroll";
import { useTextReveal } from "../hooks/useTextReveal";
import { useMagnetic } from "../hooks/useMagnetic";
import { Linkedin, Github, Gmail } from "./icons/Social";
import { LinkIcon } from "./icons/LinkIcon";
import { Download } from "./icons/Download";

const DOWNLOAD_FEEDBACK_MS = 700;

// Ease-out on the way in (a confident, slightly slower arrival), ease-in on
// the way out (quicker — an exit shouldn't make the visitor wait). Nav now
// floats as an overlay above a photo panel that never resizes, so this only
// ever has to animate opacity/transform — no more syncing against a sibling's
// width transition.
const ENTER_TRANSITION = "duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
const EXIT_TRANSITION = "duration-[220ms] ease-[cubic-bezier(0.4,0,1,1)]";

const items = [
  { frame: "01", label: "Featured Work", href: "#work" },
  { frame: "02", label: "Tech Stack", href: "#skills" },
  { frame: "03", label: "Education", href: "#education" },
  { frame: "04", label: "Credentials", href: "#certifications" },
] as const;

const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: "#" },
  { label: "Resources", href: "/notes" },
];

const roleWords = profile.role.split(" ");

export function Nav({
  open = true,
  onExited,
  onFrameHover,
  onCollapse,
  onOpenContact,
}: {
  open?: boolean;
  onExited?: () => void;
  onFrameHover?: (frame: number | null) => void;
  onCollapse?: () => void;
  onOpenContact?: () => void;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [entered, setEntered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const headlineRef = useTextReveal<HTMLHeadingElement>();
  const closeRef = useMagnetic<HTMLButtonElement>(true);

  // Mount already in the closed pose, then flip to entered on the next
  // frame so the browser has a prior style to transition away from.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    if (!open) setEntered(false);
  }, [open]);

  // Floating-overlay behavior: click outside the card or press Escape to
  // close, matching ContactModal's existing pattern elsewhere in this app.
  // Only wired up while open — the Menu button that reopens it is hidden
  // (opacity-0 pointer-events-none) whenever Nav is open, so there's no
  // trigger element to exclude here the way ContactModal has to.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCollapse?.();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      onCollapse?.();
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onCollapse]);

  return (
    <div
      ref={rootRef}
      inert={!open}
      onTransitionEnd={(e) => {
        if (
          e.target === rootRef.current &&
          e.propertyName === "opacity" &&
          !open
        ) {
          onExited?.();
        }
      }}
      className={`paper-grain !absolute inset-4 z-20 flex min-w-0 flex-col justify-center gap-6 overflow-y-hidden rounded-sm border border-ink/10 bg-paper px-6 py-10 text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] transition-[opacity,transform] split:inset-y-6 split:right-10 split:left-auto split:w-[45%] split:px-14 split:py-12 ${
        open ? "" : "pointer-events-none"
      } ${
        entered
          ? `translate-x-0 scale-100 opacity-100 ${ENTER_TRANSITION}`
          : `translate-x-3 scale-[0.98] opacity-0 ${EXIT_TRANSITION}`
      }`}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onCollapse}
        className="absolute right-6 top-6 flex items-center gap-2 rounded-sm border border-ink px-5 py-3 cursor-pointer transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-deep sm:right-8 sm:top-8"
      >
        <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true">
          <path
            d="M1 1 L9 9 M9 1 L1 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
        <span className="font-hud text-hud uppercase tracking-[0.08em]">
          Close
        </span>
      </button>

      <div>
        <div className="mb-4 flex items-center gap-4">
          <span className="font-hud text-hud font-medium uppercase tracking-[0.08em] text-ink/80">
            Open to internships
          </span>
        </div>
        <h1
          ref={headlineRef}
          className="font-display italic text-hero text-ink"
          style={{ fontWeight: 340 }}
        >
          {roleWords.map((word, i) => (
            <span
              key={word + i}
              className="inline-block"
              style={{ marginRight: i < roleWords.length - 1 ? "0.25em" : 0 }}
            >
              {word}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-md font-body text-body-lg text-ink/70">
          {profile.name} — takes Figma to shipped, production React, end to end.
          The result: a frontend hire who ships real features, not prototypes.
        </p>
      </div>

      <nav aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const isRoute = item.href.startsWith("/");
            const rowContent = (
              <>
                <span className="font-hud text-hud text-orange-deep">
                  [{item.frame}]
                </span>
                <span
                  className="font-display text-h3 text-ink group-hover:text-orange-deep group-focus-visible:text-orange-deep"
                  style={{ fontWeight: 580 }}
                >
                  {item.label}
                </span>
              </>
            );
            const rowProps = {
              className:
                "group flex items-center gap-4 py-4 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-deep hover:text-orange-deep",
              onMouseEnter: () => onFrameHover?.(Number(item.frame)),
              onMouseLeave: () => onFrameHover?.(null),
              onFocus: () => onFrameHover?.(Number(item.frame)),
              onBlur: () => onFrameHover?.(null),
            };
            return (
              <li key={item.frame} className="border-b border-ash/25">
                {isRoute ? (
                  <Link to={item.href} {...rowProps}>
                    {rowContent}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(item.href);
                    }}
                    {...rowProps}
                  >
                    {rowContent}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-wrap gap-4">
        <LinkButton
          href="#work"
          variant="primary"
          magnetic
          forceMagnetic
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget("#work");
          }}
        >
          View Featured Work
        </LinkButton>
        <LinkButton
          href={profile.resumeUrl}
          variant="ghost-dark"
          magnetic
          forceMagnetic
          download
          aria-busy={isDownloading}
          onClick={() => {
            setIsDownloading(true);
            window.setTimeout(
              () => setIsDownloading(false),
              DOWNLOAD_FEEDBACK_MS,
            );
          }}
        >
          <span className="grid">
            <span
              aria-hidden={isDownloading}
              className={`col-start-1 row-start-1 flex items-center gap-2 transition-opacity ${
                isDownloading ? "opacity-0" : "opacity-100"
              }`}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </span>
            <span
              aria-hidden={!isDownloading}
              className={`col-start-1 row-start-1 flex items-center gap-2 transition-opacity ${
                isDownloading ? "opacity-100" : "opacity-0"
              }`}
            >
              <Spinner />
              Downloading…
            </span>
          </span>
        </LinkButton>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        {socials.map((social, i) => (
          <Fragment key={social.label}>
            {i > 0 && (
              <span
                className="h-[3px] w-[3px] shrink-0 rounded-full bg-ash"
                aria-hidden="true"
              />
            )}
            {social.label === "Email" ? (
              <button
                type="button"
                onClick={() => onOpenContact?.()}
                className="flex items-center gap-1.5 font-hud text-tag uppercase tracking-[0.08em] text-ash-deep transition-colors hover:text-orange-deep cursor-pointer"
              >
                <Gmail className="h-3.5 w-auto" aria-hidden="true" />
                {social.label}
              </button>
            ) : social.label === "Resources" ? (
              <Link
                to={social.href}
                className="flex items-center gap-1 font-hud text-tag uppercase tracking-[0.08em] text-ash-deep transition-colors hover:text-orange-deep"
              >
                {social.label}
                <LinkIcon className="h-3 w-3" aria-hidden="true" />
              </Link>
            ) : (
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 font-hud text-tag uppercase tracking-[0.08em] text-ash-deep transition-colors hover:text-orange-deep"
              >
                {social.label === "GitHub" ? (
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {social.label}
              </a>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
