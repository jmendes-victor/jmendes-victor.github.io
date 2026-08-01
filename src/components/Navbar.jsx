import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { scrollTo } from "../hooks/useLenis";

// scroll menor que isto é ignorado, senão a navbar treme
const THRESHOLD = 6;
// dentro do hero ela fica sempre visível
const TOP_ZONE = 140;

const EASE = [0.16, 1, 0.3, 1];

const LINKS = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#stack", label: "Stack" },
  { href: "#contato", label: "Contato" },
];

// Esconde ao descer, volta ao subir.
//
// O conteúdo é sempre branco + mix-blend-difference, o que garante contraste
// sobre qualquer fundo sem precisar saber em que seção estamos. O logo tem que
// ser a variante branca: em difference, o preto devolveria o fundo e sumiria.
//
// Abaixo de md os quatro links não cabem ao lado do logo, então viram um menu
// em tela cheia. O overlay fica fora da nav de propósito: dentro dela o
// mix-blend-difference inverteria o painel inteiro.
export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const lastY = useRef(0);
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    if (Math.abs(delta) < THRESHOLD) return;
    lastY.current = y;

    if (y < TOP_ZONE) setHidden(false);
    else setHidden(delta > 0);
  });

  useEffect(() => {
    if (!menu) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // se a tela crescer até o desktop com o menu aberto, o overlay some pelo
    // md:hidden e o scroll ficaria travado sem nada visível para destravar
    const desktop = window.matchMedia("(min-width: 768px)");
    const close = () => desktop.matches && setMenu(false);
    desktop.addEventListener("change", close);

    return () => {
      document.body.style.overflow = previous;
      desktop.removeEventListener("change", close);
    };
  }, [menu]);

  const handleClick = (event, href) => {
    event.preventDefault();
    setMenu(false);
    setHidden(false);
    scrollTo(href);
    history.replaceState(null, "", href);
  };

  const linkClass = "transition-opacity duration-300 hover:opacity-60";

  const links = (items) =>
    items.map((item) => (
      <a
        key={item.href}
        href={item.href}
        onClick={(event) => handleClick(event, item.href)}
        className={linkClass}
      >
        {item.label}
      </a>
    ));

  return (
    <>
      <motion.nav
        aria-label="Principal"
        className="fixed left-0 top-0 z-50 w-full mix-blend-difference"
        style={{ padding: "20px 0" }}
        animate={{ y: hidden && !reduced ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="container mx-auto flex items-center justify-between px-6 text-white md:px-8">
          <div className="type-label hidden gap-8 md:flex">{links(LINKS.slice(0, 2))}</div>

          <div className="select-none" style={{ pointerEvents: "none" }}>
            <img src="/img/logo/felinus-white.svg" alt="" width={42} />
          </div>

          <div className="type-label hidden gap-8 md:flex">{links(LINKS.slice(2))}</div>

          {/* py-3 nos dois botões leva o alvo de toque aos 44px mínimos */}
          <button
            type="button"
            onClick={() => setMenu(true)}
            aria-expanded={menu}
            className="type-label -mr-2 px-2 py-3 md:hidden"
          >
            Menu
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink px-6 text-paper md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* mesma altura e margem da navbar, para o logo não saltar ao abrir */}
            <div className="flex items-center justify-between" style={{ padding: "20px 0" }}>
              <img src="/img/logo/felinus-white.svg" alt="" width={42} />
              <button
                type="button"
                onClick={() => setMenu(false)}
                className="type-label -mr-2 px-2 py-3"
              >
                Fechar
              </button>
            </div>

            <nav aria-label="Menu" className="flex flex-1 flex-col justify-center gap-4 pb-24">
              {LINKS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleClick(event, item.href)}
                  className="type-headline"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.06 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
