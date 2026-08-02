import ScrollReveal from "../ui/ScrollReveal";
import { facts, statement, profile } from "../../data/site";

// Primeira seção depois do hero. O margin-top: 100vh é o que reserva a rolagem
// do hero (que é fixed) — mexer nele quebra a entrada da página.
export default function Intro() {
  return (
    <section
      id="intro"
      className="panel panel-light gutter relative z-10 mt-[100vh] border-t border-[var(--line)] pb-32 pt-6 md:pb-48"
    >
      {/* Três colunas só a partir de sm: abaixo disso elas ficam com ~90px e
          "IA aplicada à saúde" quebra em duas ou três linhas, cada coluna
          terminando numa altura diferente. Empilhado, o rótulo vai para a
          esquerda e o valor para a direita — o mesmo par que fecha esta seção
          logo abaixo ("Abertura / 01 · 05") e que o Contato usa no topo. */}
      <dl className="grid gap-3 border-b border-[var(--rule)] pb-6 sm:grid-cols-3 sm:gap-4">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-baseline justify-between gap-4 sm:flex-col sm:items-start sm:gap-1"
          >
            <dt className="type-mono text-[var(--fg-mute)]">{fact.label}</dt>
            <dd className="type-mono text-right sm:text-left">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-28 grid gap-6 md:mt-44 md:grid-cols-12 md:gap-10">
        <span className="type-mono text-[var(--fg-mute)] md:col-span-3">
          {profile.edition}
        </span>

        <div className="md:col-span-9">
          {/* ~20ch: nesse corpo de texto, linha cheia fica difícil de acompanhar */}
          <ScrollReveal
            text={statement[0]}
            className="type-manifesto max-w-[20ch] text-balance"
          />
        </div>
      </div>

      {/* mesmo par rótulo/número dos trilhos, aqui deitado, fechando a seção */}
      <div className="mt-28 flex items-baseline justify-between border-t border-[var(--rule)] pt-4 md:mt-44">
        <span className="type-mono text-[var(--fg-mute)]">Abertura</span>
        <span className="type-mono text-[var(--fg-mute)]">01 · 05</span>
      </div>
    </section>
  );
}
