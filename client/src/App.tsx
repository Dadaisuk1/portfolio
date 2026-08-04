import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingScreen } from "./components/LoadingScreen";
import { HomePage } from "./pages/HomePage";
import { NotesInspiration } from "./pages/NotesInspiration";

function App() {
  const [loading, setLoading] = useState(true);

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
      </Routes>
    </>
  );
}

export default App;
