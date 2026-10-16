import { useEffect, useState } from "react";
import Banner from "./Banner";
import Reveal from "../ui/Reveal";
import RollText from "../ui/RollText";
import { scrollTo } from "../../hooks/useLenis";
import { facts, opening, profile } from "../../data/site";

const clock = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Recife",
});

// Primeira seção depois do hero: o letreiro e, embaixo, apresentação, ficha
// técnica e o atalho para o trabalho. O margin-top: 100vh é o que reserva a
// rolagem do hero (que é fixed) — mexer nele quebra a entrada da página.
export default function Intro() {
  const handleClick = (event) => {
    event.preventDefault();
    scrollTo("#projetos");
    history.replaceState(null, "", "#projetos");
  };

  const details = [
    ...facts,
    {
      label: "Status",
      value: (
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping bg-accent opacity-60" />
            <span className="relative size-1.5 bg-accent" />
          </span>
          {profile.availability}
        </span>
      ),
    },
  ];

  return (
    <section
      id="intro"
      className="panel panel-light gutter relative z-10 mt-[100vh] border-t border-[var(--line)] pb-24 pt-6 md:pb-32"
    >
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="type-mono">Abertura</h2>
        <span className="type-mono text-right text-[var(--fg-soft)]">
          {profile.location} · <LocalTime />
        </span>
      </div>

      <Banner lines={opening.lines} className="mt-20 md:mt-32" />

      {/* No lg: apresentação e atalho à esquerda, ficha à direita ocupando as
          duas linhas. A ordem do DOM (texto, ficha, atalho) é a do telefone. */}
      <div className="mt-16 grid gap-y-12 border-t border-[var(--rule)] pt-8 md:mt-24 lg:grid-cols-12 lg:gap-x-10 lg:pt-10">
        <Reveal className="lg:col-span-6 lg:row-start-1">
          <p className="type-statement max-w-[36ch] text-pretty">{opening.lede}</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <dl>
            {details.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-6 border-b border-[var(--rule)] py-3"
              >
                <dt className="type-mono text-[var(--fg-mute)]">{item.label}</dt>
                <dd className="type-mono text-right">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-6 lg:row-start-2 lg:self-end">
          <a href="#projetos" onClick={handleClick} data-cursor="link" className="group inline-block">
            <span className="type-mono flex items-center gap-3 transition-colors duration-300 group-hover:text-accent">
              <RollText>Ver trabalho</RollText>
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5 motion-reduce:transition-none">
                ↓
              </span>
            </span>
            {/* mesmo fio dos links dos cases: recolhe no hover */}
            <span className="mt-2 block h-px w-full origin-left bg-[var(--line)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-0 motion-reduce:transition-none" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// Hora de Pernambuco, não a de quem visita. A cada 15 s basta para virar o
// minuto a tempo sem acordar a página à toa.
function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  return <time dateTime={now.toISOString()}>{clock.format(now)}</time>;
}
