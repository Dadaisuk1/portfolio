import { projects } from "../data/resume";
import { useScrollScaleReveal } from "../hooks/useScrollScaleReveal";
import { ArrowUpRight } from "../components/icons/ArrowUpRight";

export function Work() {
  const listRef = useScrollScaleReveal<HTMLDivElement>("article");
  return (
    <section
      id="work"
      className="paper-grain relative isolate border-t border-ink/10 bg-paper px-6 py-16 text-ink sm:px-14 sm:py-24"
    >
      <div ref={listRef} className="mx-auto flex max-w-[1400px] flex-col">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-ink/12 pb-7 sm:flex-row sm:items-baseline">
          <div className="flex flex-col gap-2">
            <span className="font-hud text-tag uppercase tracking-[0.08em] text-orange">
              [01] Featured Work
            </span>
            <h2
              className="font-display text-h2 text-ink"
              style={{ fontWeight: 580 }}
            >
              Selected Projects
            </h2>
          </div>
        </div>

        {projects.map((project) => (
          <article
            key={project.name}
            className="flex flex-col gap-6 border-b border-ink/12 py-7 sm:flex-row sm:gap-8"
          >
            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-[300px]">
              <h3
                className="font-display text-h3 text-ink"
                style={{ fontWeight: 580 }}
              >
                {project.name}
              </h3>
              <p className="text-sm text-ash-deep">{project.tagline}</p>
              <p className="mt-2 font-hud text-tag uppercase tracking-[0.08em] text-teal">
                {project.meta}
              </p>
            </div>

            <div className="flex grow flex-col gap-4">
              <p className="font-body text-body leading-relaxed text-ink/85">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-orange-muted px-3 py-1 font-hud text-tag uppercase tracking-[0.08em] text-orange-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-hud text-tag uppercase tracking-[0.08em] text-ink transition-colors hover:text-orange-deep"
              >
                View
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
