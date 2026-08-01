import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Revela um texto palavra por palavra conforme a página rola.
 *
 * Diferente do <Reveal />, que dispara uma vez quando o bloco entra na tela:
 * aqui o progresso da leitura *é* o progresso da rolagem. Quem lê controla o
 * ritmo, e o texto obriga a desacelerar no trecho em que ele aparece — que é
 * exatamente o que se quer de um parágrafo que a pessoa deveria ler em vez de
 * passar batido.
 *
 * As palavras não saem de opacidade zero. Começam apagadas mas legíveis: um
 * parágrafo que nasce invisível parece quebrado nos milissegundos antes de
 * animar, e some por completo para quem chega pelo meio da página com um link
 * âncora.
 */
const DIM = 0.18;

export default function ScrollReveal({ text, className = "" }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  // Termina em "end 0.55" e não no fim da viewport: a última palavra precisa
  // acender enquanto o parágrafo ainda está confortavelmente na tela, não no
  // instante em que ele sai por cima.
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
  // Cada palavra acende ao longo de duas fatias, não de uma: com fatias que
  // não se sobrepõem a frente de acendimento fica dura, uma palavra de cada
  // vez, como legenda de karaokê. Sobrepondo, vira uma onda.
  const opacity = useTransform(progress, [start, start + step * 2], [DIM, 1]);

  return (
    <>
      <motion.span style={{ opacity }} className="inline-block will-change-[opacity]">
        {children}
      </motion.span>{" "}
    </>
  );
}
