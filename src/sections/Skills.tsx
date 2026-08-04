import { skillGroups } from "../data/resume";
import { Tag } from "../components/Tag";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1400px] px-6 py-24 sm:px-14">
      <div className="mb-10 flex items-center gap-4">
        <span className="font-hud text-hud text-orange">[03]</span>
        <h2 className="font-display text-h2 text-paper" style={{ fontWeight: 580 }}>
          Skills
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.label} className="border-t border-ash/25 pt-4">
            <h3 className="mb-4 font-hud text-tag uppercase tracking-[0.08em] text-ash">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
