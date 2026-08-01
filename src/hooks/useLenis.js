import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

let instance = null;

// altura da navbar fixa, descontada do destino do scroll
const NAV_OFFSET = 88;

export function getLenis() {
  return instance;
}

export function scrollTo(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const offset = -NAV_OFFSET;

  if (instance && !reduced) {
    instance.scrollTo(target, { offset, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }
}

export default function useLenis() {
  useEffect(() => {
    // reduced motion fica no scroll nativo do navegador
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
