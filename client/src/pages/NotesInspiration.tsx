import { useState } from "react";
import { Link } from "react-router-dom";
import { RecDot } from "../components/Hud";

const categories = [
  { id: "icons", label: "Icons" },
  { id: "typography", label: "Typography" },
  { id: "color", label: "Color" },
  { id: "inspiration", label: "Inspiration" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

export function NotesInspiration() {
  const [active, setActive] = useState<CategoryId>("icons");
  const activeLabel = categories.find((c) => c.id === active)?.label ?? "";

  return (
    <div className="min-h-screen bg-ink px-6 py-16 text-paper sm:px-14">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-hud text-tag uppercase tracking-[0.08em] text-ash transition-colors hover:text-orange"
          >
            <span aria-hidden="true">←</span> Back
          </Link>
          <div className="flex items-center gap-4">
            <RecDot />
            <span className="font-hud text-tag uppercase tracking-[0.08em] text-ash">
              Viewfinder / Notes &amp; Inspiration
            </span>
          </div>
        </div>

        <div>
          <span className="font-hud text-hud text-orange">[05]</span>
          <h1 className="mt-4 font-display text-h1 text-paper" style={{ fontWeight: 580 }}>
            Notes &amp; Inspiration
          </h1>
          <p className="mt-4 max-w-xl font-body text-body-lg text-paper/70">
            The sites and tools I reach for when building UI — icons, type, color, and the
            occasional rabbit hole. Being curated.
          </p>
        </div>

        <nav aria-label="Categories" className="flex flex-wrap gap-2 border-b border-ash/25 pb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActive(category.id)}
              aria-current={active === category.id ? "page" : undefined}
              className={`rounded-full border px-4 py-2 font-hud text-tag uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                active === category.id
                  ? "border-orange bg-orange text-ink"
                  : "border-ash/40 text-ash hover:border-orange hover:text-orange"
              }`}
            >
              {category.label}
            </button>
          ))}
        </nav>

        <div className="flex min-h-[240px] flex-col items-start justify-center gap-2 rounded-md border border-dashed border-ash/30 px-8 py-16">
          <span className="font-hud text-tag uppercase tracking-[0.08em] text-orange">
            Coming soon
          </span>
          <p className="max-w-md font-body text-body text-paper/60">
            Curated {activeLabel.toLowerCase()} links are on the way.
          </p>
        </div>
      </div>
    </div>
  );
}
