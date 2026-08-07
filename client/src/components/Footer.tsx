import { profile, gmailComposeUrl } from "../data/resume";
import { LinkButton } from "./Button";
import { DecryptedText } from "./DecryptedText";
import { Linkedin, Github, Gmail } from "./icons/Social";
import { ArrowUpRight } from "./icons/ArrowUpRight";

export function Footer({ onOpenContact }: { onOpenContact?: () => void } = {}) {
  return (
    <footer className="paper-grain relative isolate border-t border-ink/10 bg-paper px-6 py-16 text-ink sm:px-14 sm:py-24">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 font-hud text-hud font-medium uppercase tracking-[0.08em] text-orange-deep">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
              aria-hidden="true"
            />
            <DecryptedText
              text="Open to internships"
              animateOn="view"
              sequential
              useOriginalCharsOnly
              revealDirection="start"
              speed={35}
              encryptedClassName="text-ash-deep"
            />
          </span>
        </div>

        <h2
          className="max-w-2xl font-display italic text-h1 text-ink"
          style={{ fontWeight: 340 }}
        >
          Let's build something together.
        </h2>

        <p className="max-w-xl font-body text-body-lg text-ink/70">
          {profile.bio}
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-4">
            <LinkButton
              href="#"
              variant="primary"
              magnetic
              onClick={(e) => {
                e.preventDefault();
                onOpenContact?.();
              }}
            >
              <Gmail className="h-4 w-auto" aria-hidden="true" />
              Email me
            </LinkButton>
            <LinkButton
              href={profile.linkedin}
              variant="ghost-dark"
              magnetic
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </LinkButton>
            <LinkButton
              href={profile.github}
              variant="ghost-dark"
              magnetic
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </LinkButton>
          </div>
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-1.5 font-hud text-tag text-ash-deep transition-colors hover:text-orange-deep"
          >
            or email {profile.email} directly
            <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-ash/25 pt-6 font-hud text-tag text-ink/70">
          <span>{profile.location}</span>
          <span>Portfolio by Darwin Darryl Jean Largoza © 2025</span>
        </div>
      </div>
    </footer>
  );
}
