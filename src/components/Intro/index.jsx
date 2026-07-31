import Reveal from "../ui/Reveal";
import { facts, statement } from "../../data/site";

/**
 * Primeira coisa depois do hero. Carrega o `margin-top: 100vh` que reserva a
 * rolagem do hero e o fio preto do topo — é ele que faz o conteúdo ler como
 * uma folha deslizando por cima, e não como mais uma seção.
 */
export default function Intro() {
  return (
    <section
      className="gutter relative z-10 mt-[100vh] border-t border-ink bg-paper pb-24 pt-6 md:pb-32"
    >
      <dl className="grid grid-cols-3 gap-4 border-b border-rule pb-6">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt className="type-mono text-ink/40">{fact.label}</dt>
            <dd className="type-mono">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <Reveal className="mt-20 md:mt-28">
        <p className="type-headline max-w-[22ch] text-balance">{statement[0]}</p>
      </Reveal>
    </section>
  );
}
