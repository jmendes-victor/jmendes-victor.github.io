import { useEffect } from "react";
import useLenis from "./hooks/useLenis";
import Cursor from "./components/Cursor";
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

  useEffect(() => {
    // A animação de entrada do hero só faz sentido a partir do topo.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <main>
        <Intro />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
