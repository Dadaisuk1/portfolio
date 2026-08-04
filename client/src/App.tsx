import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { PhotoPanel } from "./components/PhotoPanel";
import { Nav } from "./components/Nav";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";
import { Education } from "./sections/Education";
import { Contact } from "./sections/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

const TOTAL_FRAMES = 5;

function App() {
  const [loading, setLoading] = useState(true);
  const [hoveredFrame, setHoveredFrame] = useState<number | null>(null);
  const { wrapperRef, contentRef } = useSmoothScroll(!loading);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef} inert={loading}>
          <section className="flex flex-col split:h-screen split:flex-row">
            <PhotoPanel
              currentFrame={hoveredFrame ?? 0}
              totalFrames={TOTAL_FRAMES}
            />
            <Nav onFrameHover={setHoveredFrame} />
          </section>

          <main>
            <Work />
            <About />
            <Skills />
            <Education />
          </main>

          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
