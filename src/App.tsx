import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { PhotoPanel } from "./components/PhotoPanel";
import { Nav } from "./components/Nav";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";
import { Education } from "./sections/Education";
import { Contact } from "./sections/Contact";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      <main className="flex flex-col split:flex-row">
        <PhotoPanel />
        <div className="flex-1">
          <Nav />
          <Work />
          <About />
          <Skills />
          <Education />
        </div>
      </main>
      <Contact />
    </>
  );
}

export default App;
