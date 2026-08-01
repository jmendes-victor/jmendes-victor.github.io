import { useCallback, useEffect, useState } from "react";
import useLenis from "./hooks/useLenis";
import usePanelBackdrop from "./hooks/usePanelBackdrop";
import Cursor from "./components/Cursor";
import Preloader from "./components/ui/Preloader";
import Grain from "./components/ui/Grain";
import Rails from "./components/ui/Rails";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Work from "./components/Work";
import About from "./components/About";
import Stack from "./components/Stack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useLenis();
  usePanelBackdrop();

  // o hero só começa a escrever o nome depois que a cortina sobe
  const [ready, setReady] = useState(false);
  const handleDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Preloader onDone={handleDone} />
      <Cursor />
      <Rails />
      <Navbar start={ready} />
      <Hero start={ready} />
      <main>
        <Intro />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Grain />
    </>
  );
}
