import { education, languages } from "../data/resume";
import { useScrollScaleReveal } from "../hooks/useScrollScaleReveal";
import { ImageWithSkeleton } from "../components/ImageWithSkeleton";
import { ArrowUpRight } from "../components/icons/ArrowUpRight";

export function Education() {
  const degreeRef = useScrollScaleReveal<HTMLDivElement>();
  const languagesRef = useScrollScaleReveal<HTMLDivElement>();
  return (
    <section
      id="education"
      className="relative isolate border-t border-ash/20 px-6 py-16 sm:px-14 sm:py-24"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-ash/20 pb-7 sm:flex-row sm:items-baseline">
          <div className="flex flex-col gap-2">
            <span className="font-hud text-tag uppercase tracking-[0.08em] text-orange">
              [03] Education
            </span>
            <h2
              className="font-display text-h2 text-paper"
              style={{ fontWeight: 580 }}
            >
              Degrees &amp; Languages
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div ref={degreeRef}>
            <h3 className="mb-4 font-hud text-tag uppercase tracking-[0.08em] text-ash">
              Degree
            </h3>
            <p
              className="font-display text-h3 text-paper"
              style={{ fontWeight: 460 }}
            >
              {education.degree}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <ImageWithSkeleton
                src="/assets/cit.png"
                alt=""
                width={20}
                height={20}
              />
              <a
                href={education.schoolUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-body text-body text-paper/70 underline-offset-2 transition-colors hover:text-paper hover:underline hover:decoration-orange"
              >
                {education.school}
                <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-1 font-hud text-tag text-ash">
              {education.period}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-ash/15 pt-6">
            <span className="font-hud text-tag uppercase tracking-[0.08em] text-ash">
              Languages
            </span>
            <div ref={languagesRef} className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-ash/30 px-3 py-1 font-hud text-tag uppercase tracking-[0.08em] text-paper/80"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
