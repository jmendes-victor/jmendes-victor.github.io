import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

// Acende o texto palavra por palavra conforme a página rola. Diferente do
// <Reveal />, que dispara uma vez só quando o bloco entra na tela, aqui o
// progresso da animação é o progresso da rolagem.
//
// As palavras partem de 0.18 e não de zero: com opacidade zero o parágrafo
// aparece quebrado antes de animar e some de vez para quem chega por link âncora.
const DIM = 0.18;

export default function ScrollReveal({ text, className = "" }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  // termina em "end 0.55" para a última palavra acender com o parágrafo ainda
  // na tela, e não no instante em que ele sai por cima
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });

  const words = text.split(" ");

  if (reduced) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} start={i / words.length} step={1 / words.length}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({ progress, start, step, children }) {
  // cada palavra ocupa duas fatias em vez de uma, de forma que elas se
  // sobreponham: sem isso acende uma por vez, igual legenda de karaokê
  const opacity = useTransform(progress, [start, start + step * 2], [DIM, 1]);

  return (
    <>
      <motion.span style={{ opacity }} className="inline-block will-change-[opacity]">
        {children}
      </motion.span>{" "}
    </>
  );
}
