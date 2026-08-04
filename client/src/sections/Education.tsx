import { certifications, education, languages } from "../data/resume";
import { useDevelopReveal } from "../hooks/useDevelopReveal";

export function Education() {
  const ref = useDevelopReveal<HTMLElement>();
  return (
    <section ref={ref} id="education" className="px-6 py-24 sm:px-14">
      <div className="mb-10 flex items-center gap-4">
        <span className="font-hud text-hud text-orange">[04]</span>
        <h2 className="font-display text-h2 text-paper" style={{ fontWeight: 580 }}>
          Education
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div>
          <h3 className="mb-4 font-hud text-tag uppercase tracking-[0.08em] text-ash">
            Degree
          </h3>
          <p className="font-display text-h3 text-paper" style={{ fontWeight: 460 }}>
            {education.degree}
          </p>
          <p className="mt-2 font-body text-body text-paper/70">{education.school}</p>
          <p className="mt-1 font-hud text-tag text-ash">{education.period}</p>
        </div>

        <div>
          <h3 className="mb-4 font-hud text-tag uppercase tracking-[0.08em] text-ash">
            Certifications
          </h3>
          <ul className="flex flex-col gap-3">
            {certifications.map((cert) => (
              <li key={cert.name} className="flex flex-col">
                <span className="font-body text-body text-paper/85">{cert.name}</span>
                <span className="font-hud text-tag text-ash">{cert.date}</span>
              </li>
            ))}
          </ul>
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
    </section>
  );
}
