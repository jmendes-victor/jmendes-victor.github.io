import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

// Monograma JM: a haste do J é também a haste esquerda do M. O viewBox é a
// caixa exata da marca, sem folga — o espaçamento fica com quem usa.
const PATH =
  "M27 0 L40 0 L56 32.55 L72 0 L85 0 L85 58 L72 58 L72 26.45 L56 59 L40 26.45 L40 58 A20 20 0 0 1 0 58 L0 38 L13 38 L13 58 A7 7 0 0 0 27 58 Z";

const W = 85;
const H = 78;

// O contorno se traça sozinho e o preenchimento sobe por baixo dele; quando o
// preenchimento chega ao topo o contorno sai de cena. Sobe de baixo para cima
// como as letras do SplitText — é a mesma gramática do resto do site.
const outline = {
  off: { pathLength: 0, opacity: 1 },
  on: {
    pathLength: 1,
    opacity: 0,
    transition: {
      pathLength: { duration: 1.15, ease: EASE },
      opacity: { duration: 0.3, delay: 1.15 },
    },
  },
};

const flood = {
  off: { scaleY: 0 },
  on: { scaleY: 1, transition: { duration: 0.75, delay: 0.55, ease: EASE } },
};

// `reveal` tem três estados de propósito:
//   undefined → marca pronta, sem animação (menu móvel, que já abre com ela)
//   false     → estado inicial, invisível (esperando a cortina do preloader)
//   true      → toca o surgimento
//
// A cor vem de currentColor, então a marca acompanha o texto do pai — é o que
// permite uma única variante servir ao mix-blend-difference da navbar e ao
// fundo escuro do menu.
export default function Logo({ size = 46, reveal, className = "" }) {
  const reduced = useReducedMotion();
  // useId devolve ":r0:", e os dois-pontos quebram o url(#…) do clip-path
  const clip = `logo-${useId().replace(/:/g, "")}`;

  const props = {
    viewBox: `0 0 ${W} ${H}`,
    width: size,
    height: Math.round((size * H) / W),
    className,
    "aria-hidden": "true",
  };

  if (reveal === undefined || reduced) {
    return (
      <svg {...props} fill="currentColor">
        <path d={PATH} />
      </svg>
    );
  }

  const state = reveal ? "on" : "off";

  return (
    <svg {...props} fill="none">
      <defs>
        <clipPath id={clip}>
          <motion.rect
            width={W}
            height={H}
            variants={flood}
            initial="off"
            animate={state}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          />
        </clipPath>
      </defs>

      <path d={PATH} fill="currentColor" clipPath={`url(#${clip})`} />

      <motion.path
        d={PATH}
        stroke="currentColor"
        strokeWidth={2}
        variants={outline}
        initial="off"
        animate={state}
      />
    </svg>
  );
}
