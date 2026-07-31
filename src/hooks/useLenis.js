import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

let instance = null;

/** Altura ocupada pela navbar fixa. */
const NAV_OFFSET = 88;

export function getLenis() {
  return instance;
}

/** Rola até um seletor respeitando o smooth scroll (e quem pediu menos movimento). */
export function scrollTo(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // desconta a navbar fixa, senão o topo da seção para embaixo dela
  const offset = -NAV_OFFSET;

  if (instance && !reduced) {
    instance.scrollTo(target, { offset, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }
}

export default function useLenis() {
  useEffect(() => {
    // Smooth scroll é enfeite: quem pediu menos movimento fica no scroll nativo.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, lerp: 0.08 });
    instance = lenis;

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, []);
}
