import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/resume";
import { LinkButton } from "./Button";
import { Spinner } from "./Spinner";
import { scrollToTarget } from "../lib/smoothScroll";
import { useMagnetic } from "../hooks/useMagnetic";
import { useDismissOnOutsideOrEscape } from "../hooks/useDismissOnOutsideOrEscape";
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
  onCollapse,
  onOpenContact,
}: {
  open?: boolean;
  onExited?: () => void;
  onCollapse?: () => void;
  onOpenContact?: () => void;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [entered, setEntered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
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

  // This is a full-viewport takeover, not an incidental popover — the page
  // underneath shouldn't scroll or be reachable by keyboard while it's up.
  // Locking only <html> (document.scrollingElement) isn't enough: once html
  // can no longer scroll, the browser hands the scrollbar to <body> instead
  // (it still has overflow content and an auto/visible overflow-y from the
  // base styles), so the lock has to cover both to actually hold still.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  // Send focus into the panel the moment it opens — the button that
  // triggered it (PhotoPanel's Menu button) goes inert as part of the same
  // transition and would otherwise drop focus to <body>.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  // Floating-overlay behavior: click outside the card or press Escape to
  // close, matching ContactModal's existing pattern elsewhere in this app.
  // Only wired up while open — the Menu button that reopens it is hidden
  // (opacity-0 pointer-events-none) whenever Nav is open, so there's no
  // trigger element to exclude here the way ContactModal has to.
  useDismissOnOutsideOrEscape(open, [rootRef], () => onCollapse?.());

  // Tab is trapped inside the panel so the background page — which stays in
  // the DOM and un-inert below the fold — never picks up focus while this is
  // meant to be the only thing on screen.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !rootRef.current) return;
      const focusables = rootRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

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
      className={`paper-grain !absolute inset-0 z-20 flex min-w-0 flex-col justify-center gap-6 overflow-y-hidden bg-paper px-6 py-10 text-ink transition-opacity split:right-0 split:left-auto split:w-[45%] split:border-l split:border-ink/10 split:px-14 split:py-12 split:shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.45)] ${
        open ? "" : "pointer-events-none"
      } ${
        entered
          ? `opacity-100 ${ENTER_TRANSITION}`
          : `opacity-0 ${EXIT_TRANSITION}`
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
        <ul className="flex flex-col">
          {items.map((item, index) => {
            const isRoute = item.href.startsWith("/");
            const dimmed = hoveredIndex !== null && hoveredIndex !== index;
            const rowContent = (
              <>
                <span
                  className={`font-hud text-tag uppercase tracking-[0.08em] transition-colors duration-300 ease-out group-hover:text-orange-deep group-focus-visible:text-orange-deep ${
                    dimmed ? "text-ash-deep" : "text-orange"
                  }`}
                >
                  [{item.frame}]
                </span>
                <span
                  className={`font-display text-h3 tracking-tight transition-colors duration-300 ease-out group-hover:text-orange-deep group-focus-visible:text-orange-deep lg:text-h2 ${
                    dimmed ? "text-ash-deep" : "text-ink"
                  }`}
                  style={{ fontWeight: 460 }}
                >
                  {item.label}
                </span>
              </>
            );
            const rowProps = {
              className:
                "group flex items-center gap-3 py-5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-deep",
              onMouseEnter: () => setHoveredIndex(index),
              onMouseLeave: () => setHoveredIndex(null),
              onFocus: () => setHoveredIndex(index),
              onBlur: () => setHoveredIndex(null),
            };
            return (
              <li key={item.frame} className="border-b border-ash/25">
                {isRoute ? (
                  <Link
                    to={item.href}
                    onClick={() => onCollapse?.()}
                    {...rowProps}
                  >
                    {rowContent}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onCollapse?.();
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
            onCollapse?.();
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
