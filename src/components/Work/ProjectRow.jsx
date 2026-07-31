import { motion, useReducedMotion } from "motion/react";
import SplitText from "../ui/SplitText";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Uma linha do índice. Nada de card — mas duas linhas, não uma: em cima
 * número/título/disciplina/ano, embaixo resumo e stack. É a densidade que
 * separa um índice de uma lista de links.
 *
 * Nada aqui muda de altura no hover de propósito: linha que cresce empurra as
 * de baixo, o cursor cai fora dela e o estado pisca.
 *
 * `dimmed` é o que dá foco: sem apagar as outras, o hover não lê.
 */
export default function ProjectRow({ project, index, dimmed, onEnter }) {
  const reduced = useReducedMotion();
  const Row = project.href ? "a" : "div";
  const linkProps = project.href
    ? { href: project.href, target: "_blank", rel: "noreferrer" }
    : {};

  const number = String(index + 1).padStart(2, "0");
  const delay = index * 0.08;

  return (
    <li className="group" onPointerEnter={onEnter}>
      <Row
        {...linkProps}
        data-cursor={project.href ? "link" : undefined}
        className={`block py-7 transition-opacity duration-500 md:py-9 ${
          dimmed ? "opacity-25" : "opacity-100"
        }`}
      >
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="type-mono w-8 shrink-0 text-ink/40 transition-colors duration-300 group-hover:text-accent md:w-12">
            {number}
          </span>

          <h3 className="type-index flex-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
            <SplitText
              text={project.title}
              inView
              justify="start"
              delay={delay}
              stagger={0.03}
              duration={1}
            />
          </h3>

          <span className="type-mono hidden shrink-0 text-ink/50 md:block">
            {project.discipline}
          </span>

          <span className="type-mono w-12 shrink-0 text-right text-ink/50 md:w-16">
            {project.year}
          </span>
        </div>

        {/* pl casa com a coluna do número (w-8+gap-4 / w-12+gap-8) */}
        <motion.div
          className="mt-3 flex flex-col gap-1 pl-12 md:flex-row md:items-baseline md:justify-between md:gap-8 md:pl-20"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: delay + 0.25 }}
        >
          {/* caixa normal: é frase, não rótulo — em caixa alta vira ruído */}
          <p className="type-mono max-w-xl normal-case tracking-normal text-ink/45 transition-colors duration-300 group-hover:text-ink/70">
            {project.summary}
          </p>

          <span className="type-mono flex shrink-0 items-center gap-3 text-ink/45 transition-colors duration-300 group-hover:text-ink/70">
            {project.role} — {project.stack.join(" · ")}
            {project.href && (
              <span className="inline-block -translate-x-1 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100">
                ↗
              </span>
            )}
          </span>
        </motion.div>
      </Row>

      {/* o fio se desenha da esquerda quando a linha entra na tela */}
      <motion.span
        className="block h-px w-full origin-left bg-rule transition-colors duration-500 group-hover:bg-accent"
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1, ease: EASE, delay }}
      />
    </li>
  );
}
