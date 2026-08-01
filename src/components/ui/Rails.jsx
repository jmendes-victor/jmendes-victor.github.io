import { motion, AnimatePresence } from "motion/react";
import useSectionTracker from "../../hooks/useSectionTracker";
import { sections } from "../../data/site";

// Dois fios verticais nas bordas da tela, com o nome da seção atual de um lado
// e o contador do outro. Some abaixo de sm.
//
// Decorativo: aria-hidden + pointer-events none. O rótulo já existe como <h2>
// dentro de cada seção, repetir aqui só duplicaria a leitura.
//
// mix-blend-difference pelo mesmo motivo da navbar: os trilhos atravessam as
// seções claras e escuras sem precisar saber em qual estão.
export default function Rails() {
  const index = useSectionTracker(sections);
  const current = sections[index];

  const total = String(sections.length).padStart(2, "0");
  const position = String(index + 1).padStart(2, "0");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden mix-blend-difference sm:block"
    >
      <Rail side="left">
        {/* mode="wait" encadeia saída e entrada, então a duração tem que ser
            curta: com algo perto de 0,45s uma rolagem rápida atravessa três
            seções antes da troca acabar e o rótulo fica atrasado em relação ao
            contador do outro lado, que muda na hora */}
        <AnimatePresence mode="wait">
          <motion.span
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="type-rail block text-white"
          >
            {current.label}
          </motion.span>
        </AnimatePresence>
      </Rail>

      <Rail side="right">
        <span className="type-rail block text-white">
          {position} <span className="opacity-40">·</span> {total}
        </span>
      </Rail>
    </div>
  );
}

// Um fio vertical partido ao meio, com o texto no vão.
//
// writing-mode: vertical-rl e não rotate(90deg) — rotacionar deixa a caixa do
// texto deitada e o flex perde a centralização. O rotate(180deg) da esquerda faz
// o texto subir, como em lombada de livro; à direita ele desce.
function Rail({ side, children }) {
  const isLeft = side === "left";

  return (
    <div
      className="absolute inset-y-0 flex w-px flex-col items-center justify-center gap-6"
      style={{ [side]: "var(--rail-inset)" }}
    >
      <span className="w-px flex-1 bg-white/25" />

      <span
        className="whitespace-nowrap"
        style={{
          writingMode: "vertical-rl",
          transform: isLeft ? "rotate(180deg)" : undefined,
        }}
      >
        {children}
      </span>

      <span className="w-px flex-1 bg-white/25" />
    </div>
  );
}
