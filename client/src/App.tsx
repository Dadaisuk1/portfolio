import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingScreen } from "./components/LoadingScreen";
import { HomePage } from "./pages/HomePage";
import { NotesInspiration } from "./pages/NotesInspiration";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <Routes>
        <Route path="/" element={<HomePage loading={loading} />} />
        <Route path="/notes" element={<NotesInspiration />} />
      </Routes>
    </>
  );
}

export default App;
