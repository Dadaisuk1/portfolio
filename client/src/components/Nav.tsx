import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/resume";
import { RecDot } from "./Hud";
import { LinkButton } from "./Button";
import { scrollToTarget } from "../lib/smoothScroll";
import { useTextReveal } from "../hooks/useTextReveal";

const DOWNLOAD_FEEDBACK_MS = 700;

function Spinner() {
  return (
    <svg className="h-4 w-4 shrink-0 animate-spin" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.25" />
      <path d="M14.5 8a6.5 6.5 0 0 0-6.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const items = [
  { frame: "01", label: "Featured Work", href: "#work" },
  { frame: "02", label: "Tech Stack", href: "#skills" },
  { frame: "03", label: "Notes & Inspiration", href: "/notes" },
  { frame: "04", label: "Education", href: "#education" },
  { frame: "05", label: "Credentials", href: "#certifications" },
] as const;

const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

const roleWords = profile.role.split(" ");

export function Nav({
  onFrameHover,
  onCollapse,
}: {
  onFrameHover?: (frame: number | null) => void;
  onCollapse?: () => void;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const headlineRef = useTextReveal<HTMLHeadingElement>();

  return (
    <div className="paper-grain relative flex min-w-0 flex-col justify-center gap-10 bg-paper px-6 py-16 text-ink split:min-h-screen split:flex-1 split:px-14">
      <button
        type="button"
        onClick={onCollapse}
        className="absolute right-6 top-6 flex items-center gap-2 rounded-sm border border-ink px-4 py-2.5 transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-deep sm:right-8 sm:top-8"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1 1 L9 9 M9 1 L1 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span className="font-hud text-tag uppercase tracking-[0.08em]">Close</span>
      </button>

      <div>
        <div className="mb-4 flex items-center gap-4">
          <RecDot tone="light" />
          <span className="font-hud text-tag uppercase tracking-[0.08em] text-ink/70">
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
          {profile.name} — building interfaces end-to-end, from Figma to
          production React.
        </p>
      </div>

      <nav aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const isRoute = item.href.startsWith("/");
            const rowContent = (
              <>
                <span className="font-hud text-hud text-orange-deep">[{item.frame}]</span>
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
                "group flex items-center gap-4 py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-deep hover:text-orange-deep",
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
          download
          aria-busy={isDownloading}
          onClick={() => {
            setIsDownloading(true);
            window.setTimeout(() => setIsDownloading(false), DOWNLOAD_FEEDBACK_MS);
          }}
        >
          {isDownloading ? (
            <>
              <Spinner />
              Downloading…
            </>
          ) : (
            "Download Resume ↓"
          )}
        </LinkButton>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        {socials.map((social, i) => (
          <Fragment key={social.label}>
            {i > 0 && <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-ash" aria-hidden="true" />}
            <a
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="font-hud text-tag uppercase tracking-[0.08em] text-ash-deep transition-colors hover:text-orange-deep"
            >
              {social.label}
            </a>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
