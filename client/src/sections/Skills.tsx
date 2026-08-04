import { currentlyExpanding, techStack } from "../data/resume";
import { techIcons } from "../components/icons/techIconMap";
import { useDevelopReveal } from "../hooks/useDevelopReveal";

export function Skills() {
  const ref = useDevelopReveal<HTMLElement>();
  return (
    <section ref={ref} id="skills" className="bg-ink px-6 py-16 text-paper sm:px-14 sm:py-24">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-ash/20 pb-7 sm:flex-row sm:items-baseline">
          <div className="flex flex-col gap-2">
            <span className="font-hud text-tag uppercase tracking-[0.08em] text-orange">
              [02] Tech Stack
            </span>
            <h2 className="font-display text-h2 text-paper" style={{ fontWeight: 580 }}>
              Tools &amp; Technologies
            </h2>
          </div>
          <p className="max-w-[340px] shrink-0 font-body text-body text-ash sm:text-right">
            AWS-certified, adaptable across stacks, comfortable in Agile teams.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {techStack.map((group) => (
            <div key={group.label} className="flex flex-col gap-4">
              <span className="font-hud text-tag font-medium uppercase tracking-[0.08em] text-orange">
                {group.label}
              </span>
              <div className="flex flex-col gap-3">
                {group.items.map((item) => {
                  const Icon = techIcons[item.icon];
                  return (
                    <div key={item.name} className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span
                        className="font-display text-body text-paper"
                        style={{ fontWeight: 460 }}
                      >
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-baseline gap-3 border-t border-ash/15 pt-6 sm:flex-row">
          <span className="shrink-0 font-hud text-tag uppercase tracking-[0.08em] text-orange-muted">
            Currently expanding
          </span>
          <span className="text-sm text-ash">{currentlyExpanding}</span>
        </div>
      </div>
    </section>
  );
}
