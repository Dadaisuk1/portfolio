import { profile } from "../data/resume";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-6 py-24 sm:px-14">
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
