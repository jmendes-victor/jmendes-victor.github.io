import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

const segmenter =
  typeof Intl !== "undefined" && Intl.Segmenter
    ? new Intl.Segmenter("pt", { granularity: "grapheme" })
    : null;

/**
 * Quebra em grafemas, não em code points: senão o "ã" de "João" vira "a" + til
 * combinante em máscaras separadas — e o til aparece solto flutuando.
 */
function toGraphemes(word) {
  const normalized = word.normalize("NFC");
  return segmenter
    ? [...segmenter.segment(normalized)].map((entry) => entry.segment)
    : [...normalized];
}

/**
 * Revela um texto letra por letra, cada uma subindo (ou descendo) por trás de
 * uma máscara. Substitui os antigos AnimatedName / AnimatedSubtitle /
 * AnimatedSubtitleEnd, que eram o mesmo componente três vezes.
 *
 * O texto é quebrado em palavras antes de virar letras, então a quebra de linha
 * acontece entre palavras — nunca no meio de uma.
 */
export default function SplitText({
  text,
  className = "",
  direction = "up",
  delay = 0,
  stagger = 0.045,
  duration = 1.2,
  justify = "center",
  inView = false,
}) {
  const reduced = useReducedMotion();
  const offset = direction === "up" ? "100%" : "-100%";

  const container = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: reduced ? 0 : stagger },
    },
  };

  const letter = {
    hidden: reduced ? { opacity: 0 } : { y: offset },
    visible: reduced
      ? { opacity: 1, transition: { duration: 0.3 } }
      : { y: 0, transition: { duration, ease: EASE } },
  };

  const words = text.split(" ");

  // No hero dispara na montagem; numa lista longa, só quando a linha entra na tela.
  const trigger = inView
    ? { whileInView: "visible", viewport: { once: true, margin: "0px 0px -15% 0px" } }
    : { animate: "visible" };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      {...trigger}
      aria-label={text}
      className={`flex flex-wrap ${
        justify === "center" ? "justify-center" : "justify-start"
      } ${className}`}
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden="true" className="inline-flex whitespace-nowrap">
          {toGraphemes(word).map((char, c) => (
            // leading 1.15 (e não 1) porque a caixa da letra precisa caber o
            // glifo inteiro — acento de "Ã" em cima, perna de "j" embaixo —
            // ou a máscara corta. É também o que garante que translateY(100%)
            // esconda a letra por completo.
            <span key={c} className="inline-block overflow-hidden leading-[1.15]">
              <motion.span
                variants={letter}
                className="inline-block leading-[1.15] will-change-transform"
              >
                {char}
              </motion.span>
            </span>
          ))}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
