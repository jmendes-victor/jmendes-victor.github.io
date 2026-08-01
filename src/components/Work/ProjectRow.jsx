import { motion, useReducedMotion } from "motion/react";
import SplitText from "../ui/SplitText";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Uma linha do índice. Nada de card — mas duas linhas, não uma: em cima
 * número/título/disciplina/ano, embaixo resumo e stack. É a densidade que
 * separa um índice de uma lista de links.
 *
 * O hover inverte a linha: uma faixa da cor do texto varre por baixo e o
 * conteúdo passa a ler na cor do fundo. Três decisões dentro disso:
 *
 * 1. A varredura *atravessa*: entra pela esquerda e sai pela direita, em vez
 *    de voltar por onde veio. Um preenchimento que recua desfaz o gesto; um
 *    que continua no mesmo sentido lê como algo passando por baixo da linha.
 *    O truque é que `transform-origin` não é transicionado — ele troca na
 *    hora. Em repouso a origem é a direita, no hover é a esquerda: entrando,
 *    a faixa cresce a partir da esquerda; saindo, a origem já saltou para a
 *    direita e ela encolhe para lá.
 *
 * 2. O texto não troca de cor: ele usa `mix-blend-difference` e se inverte
 *    sozinho onde a faixa passou por baixo. Trocar a cor no hover não funciona
 *    aqui — a cor muda na linha inteira de uma vez, enquanto a faixa a cobre
 *    progressivamente, então o pedaço ainda não coberto escurece sobre o fundo
 *    escuro e some por um instante. O blend não tem esse problema porque é
 *    resolvido pixel a pixel: a inversão acompanha exatamente a borda da
 *    faixa, e nenhuma duração precisa bater com nenhuma outra.
 *
 * 3. Nada muda de altura. Linha que cresce empurra as de baixo, o cursor cai
 *    fora dela e o estado pisca.
 *
 * `dimmed` é o que dá foco: sem apagar as outras, a inversão sozinha não
 * separa a linha apontada do resto da lista.
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
    <li
      // `isolate` cria o contexto de empilhamento: sem ele o -z-10 da faixa
      // furaria a linha e iria parar atrás do fundo da própria seção.
      className="group relative isolate"
      onPointerEnter={onEnter}
    >
      {/* A faixa que varre por baixo de tudo. O inset negativo a faz sangrar
          para fora do gutter e encostar nas bordas da tela — presa à coluna de
          texto ela pareceria um botão, sangrando lê como faixa. */}
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

        {/* pl casa com a coluna do número (w-8+gap-4 / w-12+gap-8) */}
        <motion.div
          className="mt-3 flex flex-col gap-1 pl-12 md:flex-row md:items-baseline md:justify-between md:gap-8 md:pl-20"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.8, ease: EASE, delay: delay + 0.25 }}
        >
          {/* caixa normal: é frase, não rótulo — em caixa alta vira ruído */}
          <p className="type-mono max-w-xl normal-case tracking-normal text-[var(--fg-mute)]">
            {project.summary}
          </p>

          <span className="type-mono flex shrink-0 items-center gap-3 text-[var(--fg-mute)]">
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
        className="block h-px w-full origin-left bg-[var(--rule)]"
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1, ease: EASE, delay }}
      />
    </li>
  );
}
