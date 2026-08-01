import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { scrollTo } from "../hooks/useLenis";

// scroll menor que isto é ignorado, senão a navbar treme
const THRESHOLD = 6;
// dentro do hero ela fica sempre visível
const TOP_ZONE = 140;

// Esconde ao descer, volta ao subir.
//
// O conteúdo é sempre branco + mix-blend-difference, o que garante contraste
// sobre qualquer fundo sem precisar saber em que seção estamos. O logo tem que
// ser a variante branca: em difference, o preto devolveria o fundo e sumiria.
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
