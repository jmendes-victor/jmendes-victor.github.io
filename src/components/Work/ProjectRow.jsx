import { motion, useReducedMotion } from "motion/react";
import SplitText from "../ui/SplitText";

const EASE = [0.16, 1, 0.3, 1];

// Uma linha do índice de projetos. No hover, uma faixa varre por baixo do
// conteúdo e a linha inteira inverte. Dois detalhes que parecem enfeite mas não são:
//
// - o transform-origin não entra na transition, ele troca na hora: origem à
//   direita em repouso e à esquerda no hover faz a faixa entrar por um lado e
//   sair pelo outro, em vez de voltar por onde veio.
// - o texto inverte via mix-blend-difference em vez de trocar de cor no hover.
//   Trocar a cor pinta a linha toda de uma vez, enquanto a faixa a cobre aos
//   poucos, e o trecho descoberto some contra o fundo. O blend resolve pixel a
//   pixel e acompanha a borda da faixa sozinho.
//
// Nada aqui pode mudar de altura, senão a lista empurra e o hover pisca.
export default function ProjectRow({ project, index, dimmed, onEnter }) {
  const reduced = useReducedMotion();

  const Row = project.href ? "a" : "div";
  const linkProps = project.href
    ? { href: project.href, target: "_blank", rel: "noreferrer" }
    : {};

  const number = String(index + 1).padStart(2, "0");
  const delay = index * 0.08;

  return (
    <li
      // isolate cria o contexto de empilhamento; sem ele o -z-10 da faixa a
      // manda para trás do fundo da seção e ela some
      className="group relative isolate"
      onPointerEnter={onEnter}
    >
      {/* faixa do hover; o inset negativo a leva até as bordas da tela */}
      <span
        aria-hidden="true"
        className="absolute inset-x-[-1.5rem] inset-y-0 -z-10 origin-right scale-x-0 bg-[var(--fg)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100 motion-reduce:transition-none md:inset-x-[-2.5rem]"
      />

      <Row
        {...linkProps}
        data-cursor={project.href ? "link" : undefined}
        className={`block py-7 mix-blend-difference transition-opacity duration-500 md:py-9 ${
          dimmed ? "opacity-40" : "opacity-100"
        }`}
      >
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="type-mono w-8 shrink-0 text-[var(--fg-mute)] md:w-12">
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

          <span className="type-mono hidden shrink-0 text-[var(--fg-soft)] md:block">
            {project.discipline}
          </span>

          <span className="type-mono w-12 shrink-0 text-right text-[var(--fg-soft)] md:w-16">
            {project.year}
          </span>
        </div>

        {/* o pl alinha com a coluna do número (w-8+gap-4 / w-12+gap-8) */}
        <motion.div
          className="mt-3 flex flex-col gap-1 pl-12 md:flex-row md:items-baseline md:justify-between md:gap-8 md:pl-20"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: delay + 0.25 }}
        >
          {/* caixa normal aqui: é frase, não rótulo */}
          <p className="type-mono max-w-xl normal-case tracking-normal text-[var(--fg-mute)]">
            {project.summary}
          </p>

          <span className="type-mono flex shrink-0 items-center gap-3 text-[var(--fg-mute)]">
            {project.role} / {project.stack.join(" · ")}
            {project.href && (
              <span className="inline-block -translate-x-1 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100">
                ↗
              </span>
            )}
          </span>
        </motion.div>
      </Row>

      {/* fio que separa as linhas, desenhado da esquerda ao entrar na tela */}
      <motion.span
        className="block h-px w-full origin-left bg-[var(--rule)]"
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1, ease: EASE, delay }}
      />
    </li>
  );
}
