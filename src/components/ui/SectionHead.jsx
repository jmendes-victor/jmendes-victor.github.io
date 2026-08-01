import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import SplitText from "./SplitText";

// Rótulo pequeno + fio + título grande. Usado por Work, About e Stack.
export default function SectionHead({ label, title, meta }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // parallax leve, simétrico em torno de zero. De 0% a -6% o título passaria a
  // maior parte do tempo deslocado para a esquerda e o overflow-hidden comeria a
  // primeira letra; assim ele cruza o zero bem no meio da passagem.
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <div ref={ref} className="relative">
      {/* rótulo e metadados, separados do título pelo fio */}
      <div className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-4">
        <h2 className="type-mono">{label}</h2>
        {meta && <span className="type-mono shrink-0 text-[var(--fg-soft)]">{meta}</span>}
      </div>

      {/* o título é maior que a coluna e o overflow-hidden corta o que sobra */}
      <div className="mt-8 overflow-hidden md:mt-10">
        <motion.h3 className="type-mega text-[var(--fg)]" style={reduced ? undefined : { x }}>
          <SplitText text={title} inView justify="start" stagger={0.035} duration={1.1} />
        </motion.h3>
      </div>
    </div>
  );
}
