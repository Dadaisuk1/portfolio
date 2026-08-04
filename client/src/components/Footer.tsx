import { profile } from "../data/resume";
import { LinkButton } from "./Button";
import { RecDot } from "./Hud";
import { useDevelopReveal } from "../hooks/useDevelopReveal";

export function Footer() {
  const ref = useDevelopReveal<HTMLElement>();
  return (
    <footer
      ref={ref}
      className="paper-grain border-t border-ink/10 bg-paper px-6 py-16 text-ink sm:px-14 sm:py-24"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <div className="flex items-center gap-4">
          <RecDot tone="light" />
          <span className="font-hud text-tag uppercase tracking-[0.08em] text-ink/70">
            Open to internships
          </span>
        </div>

        <h2 className="max-w-2xl font-display italic text-h1 text-ink" style={{ fontWeight: 340 }}>
          Let's build something together.
        </h2>

        <div className="flex flex-wrap gap-4">
          <LinkButton href={`mailto:${profile.email}`} variant="primary">
            Email me
          </LinkButton>
          <LinkButton href={profile.linkedin} variant="ghost-dark" target="_blank" rel="noreferrer">
            LinkedIn
          </LinkButton>
          <LinkButton href={profile.github} variant="ghost-dark" target="_blank" rel="noreferrer">
            GitHub
          </LinkButton>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-ash/25 pt-6 font-hud text-tag text-ink/70">
          <span>{profile.location}</span>
          <span>{profile.email}</span>
          <span>{profile.phone}</span>
        </div>
      </div>
    </footer>
  );
}
