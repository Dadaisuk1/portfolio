import { projects } from "../data/resume";
import { useDevelopReveal } from "../hooks/useDevelopReveal";

export function Work() {
  const ref = useDevelopReveal<HTMLElement>();
  return (
    <section ref={ref} id="work" className="mx-auto max-w-[1400px] px-6 py-24 sm:px-14">
      <div className="mb-10 flex items-center gap-4">
        <span className="font-hud text-hud text-orange">[01]</span>
        <h2 className="font-display text-h2 text-paper" style={{ fontWeight: 580 }}>
          Work
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="grain flex flex-col gap-4 rounded-md border border-ash/20 bg-ink-blue p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-hud text-tag text-orange">FRAME {project.frame}/04</span>
                <h3
                  className="mt-2 font-display text-h3 text-paper"
                  style={{ fontWeight: 460 }}
                >
                  {project.name}
                </h3>
                <p className="mt-1 font-hud text-tag uppercase tracking-[0.06em] text-ash">
                  {project.tagline}
                </p>
              </div>
              <span className="shrink-0 font-hud text-tag text-ash">{project.period}</span>
            </div>

            <p className="font-body text-body leading-relaxed text-paper/75">
              {project.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-teal px-3 py-1 font-hud text-tag uppercase tracking-[0.06em] text-paper/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
