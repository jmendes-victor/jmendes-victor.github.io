import { motion, AnimatePresence } from "motion/react";
import useSectionTracker from "../../hooks/useSectionTracker";
import { sections } from "../../data/site";

/**
 * Os trilhos de margem: dois fios verticais colados nas bordas, com o nome da
 * seção atual de um lado e o contador do outro.
 *
 * É o detalhe que mais faz um site parecer "de estúdio" pelo custo que tem.
 * O motivo é que ele emoldura a página inteira: some a sensação de que o
 * conteúdo está solto num fundo branco infinito e aparece a de que existe uma
 * área impressa, com margem, como numa página de revista.
 *
 * `mix-blend-difference` pelo mesmo motivo da navbar — os trilhos atravessam a
 * seção clara e a escura sem precisar saber em qual estão.
 *
 * Puramente decorativo: `aria-hidden` + `pointer-events: none`. O rótulo já
 * existe como <h2> dentro de cada seção, então repetir aqui só geraria ruído
 * para leitor de tela.
 */
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
        {/* A troca de rótulo é a única coisa que se move aqui; sem o
            AnimatePresence ela piscaria de um texto para o outro.
            `mode="wait"` encadeia saída e entrada, então a duração precisa ser
            curta: a 0,45s cada, uma rolagem rápida atravessa três seções antes
            do rótulo acabar de trocar e ele fica pendurado atrás do contador
            do outro lado da tela, que muda na hora. */}
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

/**
 * Um fio vertical com o texto rotacionado no meio, e o fio partido em dois para
 * o texto não passar por cima dele.
 *
 * `writing-mode: vertical-rl` em vez de `rotate(90deg)`: rotacionar deixaria a
 * caixa do texto deitada e o `flex` não conseguiria centralizar. Do lado
 * esquerdo some um `rotate(180deg)` para o texto subir, que é a convenção de
 * lombada — à direita ele desce.
 */
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
