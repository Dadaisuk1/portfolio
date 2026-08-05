import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LoadingScreen } from "./components/LoadingScreen";
import { HomePage } from "./pages/HomePage";
import { NotesInspiration } from "./pages/NotesInspiration";
import { NotFound } from "./pages/NotFound";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [loadedPathname, setLoadedPathname] = useState(location.pathname);

  // Re-arm the loading screen on every route change, not just first mount.
  // Setting state directly in the render body (React's sanctioned way to
  // sync state to a changed prop/value) rather than in an effect means the
  // overlay is already showing in the same commit the new route's page
  // mounts underneath it — no one-frame flash of the unstyled destination.
  if (location.pathname !== loadedPathname) {
    setLoadedPathname(location.pathname);
    if (!loading) setLoading(true);
  }

  return (
    <>
      {loading && (
        <LoadingScreen
          onDone={() => {
            // Belt-and-suspenders alongside main.tsx's initial reset: the
            // loading screen's own ~3s runway is enough time for images and
            // web fonts to shift layout above the fold, and this is the
            // first moment Lenis/ScrollTrigger take over — so re-assert top
            // before they start reading scroll position as ground truth.
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
            setLoading(false)
          }}
        />
      )}

      <Routes>
        <Route path="/" element={<HomePage loading={loading} />} />
        <Route path="/notes" element={<NotesInspiration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
