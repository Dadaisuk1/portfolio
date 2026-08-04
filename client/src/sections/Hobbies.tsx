import { hobbies } from "../data/resume";
import { Tag } from "../components/Tag";
import { useDevelopReveal } from "../hooks/useDevelopReveal";

export function Hobbies() {
  const ref = useDevelopReveal<HTMLElement>();
  return (
    <section ref={ref} id="hobbies" className="px-6 py-24 sm:px-14">
      <div className="mb-10 flex items-center gap-4">
        <span className="font-hud text-hud text-orange">[04]</span>
        <h2 className="font-display text-h2 text-paper" style={{ fontWeight: 580 }}>
          Hobbies
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {hobbies.map((hobby) => (
          <Tag key={hobby}>{hobby}</Tag>
        ))}
      </div>
    </section>
  );
}
