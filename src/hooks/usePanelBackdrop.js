import { useEffect } from "react";

const PAPER = "#ffffff";
const INK = "#0a0a0a";

// Espelha no fundo do body a divisão dos painéis que estão na tela.
//
// Serve à calha da barra de rolagem, que é o único lugar onde esse fundo
// aparece: ela fica fora do viewport de layout, as seções param antes dela e
// nenhum elemento a alcança — nem position: fixed com right: 0, porque o bloco
// contentor do fixed já desconta a barra. Só o canvas do documento pinta ali.
//
// Daí o gradiente em vez de uma cor: com paradas duras nas fronteiras medidas,
// a calha ganha a mesma divisa da tela, no mesmo pixel, e passa a ler como
// transparente. Transparente de verdade não é possível — não há nada atrás
// para transparecer.
//
// Sem IntersectionObserver pelo mesmo motivo do useSectionTracker: o hero é
// position: fixed e nunca sai da tela. Ele também fica fora da medição, senão
// cobriria a viewport inteira o tempo todo; o vão que ele deixa acima do
// primeiro painel entra como claro, que é a cor dele.
export default function usePanelBackdrop() {
  useEffect(() => {
    // ordem do DOM já é a ordem visual, então as faixas saem em sequência
    const panels = Array.from(document.querySelectorAll(".panel")).filter(
      (el) => getComputedStyle(el).position !== "fixed",
    );
    if (!panels.length) return;

    let frame = 0;
    let last = "";

    const measure = () => {
      frame = 0;
      const height = window.innerHeight;
      const bands = [];
      let edge = 0;

      for (const panel of panels) {
        const rect = panel.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= height) continue;

        // arredondar segura o texto do gradiente parado enquanto a fronteira
        // não anda um pixel inteiro, o que corta a maioria das reescritas
        const top = Math.max(0, Math.round(rect.top));
        const bottom = Math.min(height, Math.round(rect.bottom));

        if (top > edge) bands.push(`${PAPER} ${edge}px ${top}px`);
        const color = panel.classList.contains("panel-dark") ? INK : PAPER;
        bands.push(`${color} ${top}px ${bottom}px`);
        edge = bottom;
      }

      if (edge < height) bands.push(`${PAPER} ${edge}px ${height}px`);

      const image = `linear-gradient(${bands.join(",")})`;
      // com um painel só na tela o texto não muda de um frame para o outro, e
      // pular a escrita evita repintar a viewport inteira à toa
      if (image === last) return;
      last = image;
      document.body.style.backgroundImage = image;
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
  }, []);
}
