import { useEffect, useState } from "react";

/**
 * Diz qual seção está sendo lida no momento.
 *
 * Não usa IntersectionObserver de propósito: o hero é `position: fixed`, então
 * ele nunca "sai" da tela e envenenaria o observer. Medir o topo de cada seção
 * contra uma linha fixa da viewport é determinístico e não tem esse problema.
 *
 * A linha de corte fica a 40% da altura — não no meio — porque o olho lê o
 * título de uma seção nova antes dela ocupar metade da tela; com 50% o
 * contador troca tarde e parece atrasado.
 */
const LINE = 0.4;

export default function useSectionTracker(sections) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!sections.length) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * LINE;

      // a última seção cujo topo já passou da linha é a que está sendo lida
      let next = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= line) next = i;
      }

      setIndex((prev) => (prev === next ? prev : next));
    };

    // o scroll do Lenis é rAF; agendar o próprio frame evita medir duas vezes
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return index;
}
