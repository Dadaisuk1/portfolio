import { profile } from "../data/resume";
import { useDevelopReveal } from "../hooks/useDevelopReveal";

export function About() {
  const ref = useDevelopReveal<HTMLElement>();
  return (
    <section ref={ref} id="about" className="px-6 py-24 sm:px-14">
      <div className="mb-10 flex items-center gap-4">
        <span className="font-hud text-hud text-orange">[03]</span>
        <h2 className="font-display text-h2 text-paper" style={{ fontWeight: 580 }}>
          UI/UX Design
        </h2>
      </div>
      <p className="max-w-3xl font-body text-body-lg leading-relaxed text-paper/80">
        {profile.summary}
      </p>
    </section>
  );
}
