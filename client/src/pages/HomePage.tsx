import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhotoPanel } from "../components/PhotoPanel";
import { Nav } from "../components/Nav";
import { Work } from "../sections/Work";
import { Skills } from "../sections/Skills";
import { Education } from "../sections/Education";
import { Certifications } from "../sections/Certifications";
import { Footer } from "../components/Footer";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const TOTAL_FRAMES = 5;

export function HomePage({ loading }: { loading: boolean }) {
  const [hoveredFrame, setHoveredFrame] = useState<number | null>(null);
  const [heroExpanded, setHeroExpanded] = useState(true);
  const { wrapperRef, contentRef } = useSmoothScroll(!loading);

  // Toggling the hero mounts/unmounts the whole Nav panel, which changes
  // page height — keep GSAP's cached measurements in sync so scroll math
  // (and ScrollSmoother's width normalization) doesn't go stale.
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [heroExpanded]);

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
          <Education />
          <Certifications />
        </main>

        <Footer />
      </div>
    </div>
  );
}
