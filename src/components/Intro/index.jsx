import ScrollReveal from "../ui/ScrollReveal";
import { facts, statement, profile } from "../../data/site";

/**
 * Primeira coisa depois do hero. Carrega o `margin-top: 100vh` que reserva a
 * rolagem do hero e o fio preto do topo — é ele que faz o conteúdo ler como
 * uma folha deslizando por cima, e não como mais uma seção.
 *
 * A seção existe para um parágrafo só, e por isso ele ocupa quase tudo. A
 * ficha técnica em cima é o contraponto pequeno: sem ela o manifesto flutuaria
 * sozinho no branco e perderia a referência de grade.
 *
 * O espaço vertical aqui é generoso de propósito. Este é o trecho em que a
 * folha acabou de cobrir o hero, e é onde a página tem que respirar antes de
 * começar a listar coisas.
 */
export default function Intro() {
  return (
    <section
      id="intro"
      className="panel panel-light gutter relative z-10 mt-[100vh] border-t border-[var(--line)] pb-32 pt-6 md:pb-48"
    >
      <dl className="grid grid-cols-3 gap-4 border-b border-[var(--rule)] pb-6">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt className="type-mono text-[var(--fg-mute)]">{fact.label}</dt>
            <dd className="type-mono">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-28 grid gap-6 md:mt-44 md:grid-cols-12 md:gap-10">
        <span className="type-mono text-[var(--fg-mute)] md:col-span-3">
          {profile.edition}
        </span>

        <div className="md:col-span-9">
          {/* medida curta (~20ch) para o parágrafo virar um bloco alto e
              estreito: em linha cheia, nesse corpo, o olho perde o começo da
              linha seguinte */}
          <ScrollReveal
            text={statement[0]}
            className="type-manifesto max-w-[20ch] text-balance"
          />
        </div>
      </div>

      {/* fio de fecho com o índice da seção — o mesmo par rótulo/número dos
          trilhos, aqui deitado, para a abertura terminar em vez de só parar */}
      <div className="mt-28 flex items-baseline justify-between border-t border-[var(--rule)] pt-4 md:mt-44">
        <span className="type-mono text-[var(--fg-mute)]">Abertura</span>
        <span className="type-mono text-[var(--fg-mute)]">01 — 05</span>
      </div>
    </section>
  );
}
