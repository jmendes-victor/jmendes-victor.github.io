import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import SplitText from "./SplitText";

/**
 * Cabeçalho de seção na escala de cartaz.
 *
 * O que faz a referência parecer cara não é o tamanho da fonte, é a *diferença*
 * entre o maior e o menor elemento da página. Lá o corpo de texto é minúsculo e
 * o título tem 700px — quem olha entende a hierarquia antes de ler qualquer
 * palavra. O rótulo mono aqui em cima é justamente o contraponto pequeno.
 *
 * O título desliza um pouco no sentido contrário ao scroll enquanto passa. É
 * pouco de propósito: parallax forte em tipo grande vira enjoo, e o efeito só
 * precisa sugerir que o título está num plano diferente do resto.
 */
export default function SectionHead({ label, title, meta }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Simétrico em torno de zero, e não de 0% a -6%: com o deslocamento sempre
  // negativo o título passa a maior parte do tempo à esquerda do gutter e o
  // `overflow-hidden` corta a primeira letra — o que lê como defeito, não como
  // recorte proposital. Assim ele cruza o zero no meio da passagem, que é
  // exatamente quando está sendo lido, e só sangra nas pontas.
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <div ref={ref} className="relative">
      {/* fio + metadados: a linha técnica que ancora o título gigante */}
      <div className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-4">
        <h2 className="type-mono">{label}</h2>
        {meta && <span className="type-mono shrink-0 text-[var(--fg-soft)]">{meta}</span>}
      </div>

      {/* overflow-hidden porque o título é maior que a coluna de propósito:
          ele encosta nas margens e o excesso é cortado, como na referência */}
      <div className="mt-8 overflow-hidden md:mt-10">
        {/* Sem numeração aqui de propósito: os trilhos de margem já mostram
            "02 · 05" o tempo todo. Repetir ao lado do título só produzia um
            "/05" solto no ar, e o número da esquerda ainda era cortado pelo
            `overflow-hidden` que o próprio título exige. */}
        <motion.h3 className="type-mega text-[var(--fg)]" style={reduced ? undefined : { x }}>
          <SplitText text={title} inView justify="start" stagger={0.035} duration={1.1} />
        </motion.h3>
      </div>
    </div>
  );
}
