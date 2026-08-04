import { certifications, education, languages } from "../data/resume";

export function Education() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-14">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div>
          <h3 className="mb-4 font-hud text-tag uppercase tracking-[0.08em] text-ash">
            Education
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
