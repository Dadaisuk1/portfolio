import { education, languages } from "../data/resume";
import { useDevelopReveal } from "../hooks/useDevelopReveal";

export function Education() {
  const ref = useDevelopReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id="education"
      className="border-t border-ash/20 px-6 py-16 sm:px-14 sm:py-24"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <div className="flex items-center gap-4 border-b border-ash/20 pb-7">
          <span className="font-hud text-hud text-orange">[04]</span>
          <h2 className="font-display text-h2 text-paper" style={{ fontWeight: 580 }}>
            Education
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-hud text-tag uppercase tracking-[0.08em] text-ash">
              Degree
            </h3>
            <p className="font-display text-h3 text-paper" style={{ fontWeight: 460 }}>
              {education.degree}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <img src="/assets/cit.png" alt="" className="h-5 w-5 object-contain" />
              <p className="font-body text-body text-paper/70">{education.school}</p>
            </div>
            <p className="mt-1 font-hud text-tag text-ash">{education.period}</p>
          </div>

          <div>
            <h3 className="mb-4 font-hud text-tag uppercase tracking-[0.08em] text-ash">
              Languages
            </h3>
            <ul className="flex flex-col gap-2">
              {languages.map((lang) => (
                <li key={lang} className="font-body text-body text-paper/85">
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
