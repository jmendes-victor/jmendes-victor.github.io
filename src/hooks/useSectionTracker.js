import { useEffect, useState } from "react";

// Retorna o índice da seção visível.
//
// Sem IntersectionObserver porque o hero é position: fixed e nunca sai da tela,
// o que quebraria o observer. Aqui comparamos o topo de cada seção com uma linha
// da viewport, a 40% da altura (com 50% a troca acontece tarde demais).
const LINE = 0.4;

export default function useSectionTracker(sections) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!sections.length) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * LINE;

      // vale a última seção cujo topo já passou da linha
      let next = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= line) next = i;
      }

      setIndex((prev) => (prev === next ? prev : next));
    };

    // o Lenis emite scroll a cada rAF; agendar o frame evita medir duas vezes
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
