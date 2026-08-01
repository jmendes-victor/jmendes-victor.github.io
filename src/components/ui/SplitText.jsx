import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

const segmenter =
  typeof Intl !== "undefined" && Intl.Segmenter
    ? new Intl.Segmenter("pt", { granularity: "grapheme" })
    : null;

// Quebra em grafemas e não em code points: por code point, o "ã" de "João" vira
// "a" + til em máscaras separadas e o til anima solto.
function toGraphemes(word) {
  const normalized = word.normalize("NFC");
  return segmenter
    ? [...segmenter.segment(normalized)].map((entry) => entry.segment)
    : [...normalized];
}

// Revela o texto letra por letra, cada uma subindo (ou descendo) por trás de uma
// máscara. A quebra em palavras vem antes da quebra em letras, o que mantém a
// quebra de linha entre palavras.
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

  // no hero anima na montagem; em listas longas, só quando a linha entra na tela
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
            // leading 1.15 e não 1: a caixa precisa caber o glifo inteiro
            // (acento do "Ã" em cima, perna do "j" embaixo) ou a máscara corta.
            // É também o que faz o translateY(100%) esconder a letra por inteiro.
            //
            // O px/-mx alarga só a área de corte, sem mexer no layout: a máscara
            // tem a largura do avanço da letra, mas o letter-spacing negativo
            // dos títulos (até -0.045em) encolhe esse avanço para dentro da
            // tinta e o overflow-hidden come a direita do glifo — some um pedaço
            // do "S" de MENDES. 0.08em cobre a pior sobra medida na Anton.
            <span
              key={c}
              className="-mx-[0.08em] inline-block overflow-hidden px-[0.08em] leading-[1.15]"
            >
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
