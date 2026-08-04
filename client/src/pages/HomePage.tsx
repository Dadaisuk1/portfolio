import { useState } from "react";
import { PhotoPanel } from "../components/PhotoPanel";
import { Nav } from "../components/Nav";
import { Work } from "../sections/Work";
import { About } from "../sections/About";
import { Skills } from "../sections/Skills";
import { Hobbies } from "../sections/Hobbies";
import { Education } from "../sections/Education";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const TOTAL_FRAMES = 5;

export function HomePage({ loading }: { loading: boolean }) {
  const [hoveredFrame, setHoveredFrame] = useState<number | null>(null);
  const [heroExpanded, setHeroExpanded] = useState(true);
  const { wrapperRef, contentRef } = useSmoothScroll(!loading);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef} inert={loading}>
        <section className="flex flex-col split:h-screen split:flex-row">
          <PhotoPanel
            currentFrame={hoveredFrame ?? 0}
            totalFrames={TOTAL_FRAMES}
            collapsed={!heroExpanded}
            onExpand={() => setHeroExpanded(true)}
          />
          {heroExpanded && (
            <Nav onFrameHover={setHoveredFrame} onCollapse={() => setHeroExpanded(false)} />
          )}
        </section>

        <main>
          <Work />
          <Skills />
          <About />
          <Hobbies />
          <Education />
        </main>
      </div>
    </div>
  );
}
