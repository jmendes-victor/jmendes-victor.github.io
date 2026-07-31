import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { scrollTo } from "../hooks/useLenis";

/** Só reage a movimentos maiores que isto, senão treme com scroll fino. */
const THRESHOLD = 6;
/** Acima disto a navbar fica sempre visível (topo da página / hero). */
const TOP_ZONE = 140;

/**
 * Design original: links à esquerda, logo centralizado, links à direita.
 *
 * Duas coisas resolvem a legibilidade, e elas se complementam:
 *
 * 1. `mix-blend-mode: difference` — o conteúdo da navbar é sempre branco e o
 *    blend inverte o que estiver por baixo: sobre branco lê preto, sobre preto
 *    lê branco, e sobre um título preto no meio de fundo branco cada pedaço da
 *    letra se inverte sozinho. Nunca existe navbar da mesma cor do que passa
 *    atrás. (Por isso o logo é a variante branca: `difference` com preto
 *    devolve o próprio fundo — ele sumiria.)
 *
 * 2. Ela sai de cena ao descer e volta ao subir. Contraste garantido é uma
 *    coisa; não disputar espaço com o texto que a pessoa está lendo é outra.
 */
export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    if (Math.abs(delta) < THRESHOLD) return;
    lastY.current = y;

    if (y < TOP_ZONE) setHidden(false);
    else setHidden(delta > 0);
  });

  const handleClick = (event, href) => {
    event.preventDefault();
    setHidden(false);
    scrollTo(href);
    history.replaceState(null, "", href);
  };

  const linkClass = "transition-opacity duration-300 hover:opacity-60";

  return (
    <motion.nav
      aria-label="Principal"
      className="fixed left-0 top-0 z-50 w-full mix-blend-difference"
      style={{ padding: "20px 0" }}
      animate={{ y: hidden && !reduced ? "-110%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto flex items-center justify-between px-8 text-white">
        <div className="type-label flex gap-8">
          <a href="#projetos" onClick={(e) => handleClick(e, "#projetos")} className={linkClass}>
            Projetos
          </a>
          <a href="#sobre" onClick={(e) => handleClick(e, "#sobre")} className={linkClass}>
            Sobre
          </a>
        </div>

        <div className="select-none" style={{ pointerEvents: "none" }}>
          <img src="/img/logo/felinus-white.svg" alt="" width={42} />
        </div>

        <div className="type-label flex gap-8">
          <a href="#stack" onClick={(e) => handleClick(e, "#stack")} className={linkClass}>
            Stack
          </a>
          <a href="#contato" onClick={(e) => handleClick(e, "#contato")} className={linkClass}>
            Contato
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
