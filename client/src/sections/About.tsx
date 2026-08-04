import { profile } from "../data/resume";
import { useDevelopReveal } from "../hooks/useDevelopReveal";

export function About() {
  const ref = useDevelopReveal<HTMLElement>();
  return (
    <section ref={ref} id="about" className="px-6 py-24 sm:px-14">
      <div className="mb-10 flex items-center gap-4">
        <span className="font-hud text-hud text-orange">[02]</span>
        <h2 className="font-display text-h2 text-paper" style={{ fontWeight: 580 }}>
          About
        </h2>
      </div>
      <p className="max-w-3xl font-body text-body-lg leading-relaxed text-paper/80">
        {profile.summary}
      </p>
    </section>
  );
}
