import { useCallback, useEffect, useState } from "react";
import useLenis from "./hooks/useLenis";
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

  // O hero só escreve o nome depois que a cortina sobe. Sem isso a animação
  // de letra por letra acontece atrás dela e ninguém vê.
  const [ready, setReady] = useState(false);
  const handleDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    // A animação de entrada do hero só faz sentido a partir do topo.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Preloader onDone={handleDone} />
      <Cursor />
      <Rails />
      <Navbar />
      <Hero start={ready} />
      <main>
        <Intro />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
      {/* por último e por cima de tudo, menos da cortina */}
      <Grain />
    </>
  );
}
