import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

// Moldura dos esquemas dos cases, no formato de figura de artigo: papel
// milimetrado, marcas de registro nos cantos, quatro etapas no cabeçalho, uma
// nota por etapa no rodapé e a legenda embaixo.
//
// O cabeçalho e o rodapé são grid-cols-4 e o desenho ocupa a mesma largura com
// viewBox de 400: o centro de cada coluna cai em x = 50, 150, 250 e 350, que é
// onde os diagramas põem cada etapa. Os rótulos ficam em HTML e não dentro do
// SVG porque lá eles escalariam junto com o desenho — ilegíveis no telefone,
// enormes no desktop.
//
// children é função: recebe se a figura já entrou na tela, para o desenho
// começar depois da moldura.
export default function Figure({ number, figure, children }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const shown = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <figure>
      <div ref={ref} className="relative">
        {/* fora da moldura porque o clip-path dela cortaria as cruzes pela
            metade; elas aparecem primeiro e a moldura abre entre elas */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          initial={reduced ? false : { opacity: 0 }}
          animate={shown ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <Mark className="-left-[5px] -top-[5px]" />
          <Mark className="-right-[5px] -top-[5px]" />
          <Mark className="-bottom-[5px] -left-[5px]" />
          <Mark className="-bottom-[5px] -right-[5px]" />
        </motion.div>

        <motion.div
          className="figure-grid border border-[var(--rule)] px-4 py-5 sm:px-6 md:px-10 md:py-8"
          initial={reduced ? false : { clipPath: "inset(0% 0% 100% 0%)" }}
          animate={shown ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
        >
          <div className="type-fig flex justify-between text-[var(--fg-mute)]">
            <span>Fig. {number}</span>
            <span>Esquema</span>
          </div>

          <ol className="type-fig mt-8 grid grid-cols-4 text-center md:mt-12">
            {figure.stages.map((stage, i) => (
              <li key={stage.label}>
                <span className="block text-[var(--fg-mute)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block text-[var(--fg)]">{stage.label}</span>
              </li>
            ))}
          </ol>

          <div className="my-3 md:my-5">
            {children(shown)}
          </div>

          <ul className="type-fig grid grid-cols-4 text-center text-[var(--fg-mute)]">
            {figure.stages.map((stage) => (
              <li key={stage.label} className="px-1">
                {stage.note}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <figcaption className="mt-4 flex gap-4 md:gap-6">
        <span className="type-mono shrink-0 text-[var(--fg-soft)]">Fig. {number}</span>
        {/* caixa normal: é frase, não rótulo */}
        <span className="type-mono normal-case tracking-normal text-pretty text-[var(--fg-mute)]">
          {figure.caption}
        </span>
      </figcaption>
    </figure>
  );
}

// Mesmo "+" da trajetória no Sobre.
function Mark({ className }) {
  return (
    <svg viewBox="0 0 12 12" className={`absolute size-[9px] fill-[var(--fg-soft)] ${className}`}>
      <path d="M5.2 0h1.6v12H5.2z" />
      <path d="M0 5.2h12v1.6H0z" />
    </svg>
  );
}
