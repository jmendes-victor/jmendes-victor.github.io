import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import useLenis from "./hooks/useLenis";
import CustomCursor from "./components/CustomerCursor";
import { useState, useEffect } from "react";

export default function App() {
  useLenis();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Projects />
    </>
  );
}
