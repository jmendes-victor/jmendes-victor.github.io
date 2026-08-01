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
        <span className="type-mono text-[var(--fg-mute)]">01 — 05</span>
      </div>
    </section>
  );
}
