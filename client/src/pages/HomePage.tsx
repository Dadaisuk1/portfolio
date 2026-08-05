import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhotoPanel } from "../components/PhotoPanel";
import { Nav } from "../components/Nav";
import { BackToTop } from "../components/BackToTop";
import { ContactModal } from "../components/ContactModal";
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
  // Stays mounted a beat longer than heroExpanded so the Nav panel can play
  // its ease-out exit before actually leaving the DOM.
  const [navRendered, setNavRendered] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  useSmoothScroll(!loading);

  // Nav mounting/unmounting changes page height — keep GSAP's cached
  // measurements in sync so scroll math doesn't go stale. Tied to
  // navRendered (not heroExpanded) since that's when the DOM actually
  // changes, i.e. once the exit transition has finished.
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [navRendered]);

  const openNav = () => {
    setNavRendered(true);
    setHeroExpanded(true);
  };
  const closeNav = () => setHeroExpanded(false);

  // The hero is the only place nav lives — surface a way back once it's
  // scrolled out of view, since there's otherwise no persistent nav.
  useEffect(() => {
    if (loading || !heroRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom top",
      onEnter: () => setShowBackToTop(true),
      onLeaveBack: () => setShowBackToTop(false),
    });
    return () => trigger.kill();
  }, [loading]);

  return (
    <>
      <div inert={loading}>
        <section
          ref={heroRef}
          className="flex flex-col split:h-screen split:flex-row"
        >
          <PhotoPanel
            currentFrame={hoveredFrame ?? 0}
            totalFrames={TOTAL_FRAMES}
            collapsed={!heroExpanded}
            onExpand={openNav}
          />
          {navRendered && (
            <Nav
              open={heroExpanded}
              onExited={() => setNavRendered(false)}
              onFrameHover={setHoveredFrame}
              onCollapse={closeNav}
              onOpenContact={() => setContactModalOpen(true)}
            />
          )}
        </section>

        <main>
          <Work />
          <Skills />
          <Education />
          <Certifications />
        </main>

        <Footer onOpenContact={() => setContactModalOpen(true)} />
      </div>

      <BackToTop
        visible={showBackToTop}
        onNavigate={() => setShowBackToTop(false)}
      />
      <ContactModal
        isOpen={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />
    </>
  );
}
