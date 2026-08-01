import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";
import Marquee from "../ui/Marquee";
import { stack } from "../../data/site";

export default function Stack() {
  const total = stack.reduce((n, g) => n + g.items.length, 0);
  // A faixa mostra tudo de uma vez; as linhas abaixo é que dizem o que é o quê.
  const all = stack.flatMap((group) => group.items);

  return (
    <section id="stack" className="panel panel-light gutter relative z-10 pb-24 md:pb-32">
      <SectionHead
        label="Stack"
        title="Ferramenta"
        meta={`(${String(total).padStart(2, "0")})`}
      />

      {/* full-bleed: a faixa sai do gutter e encosta nas duas bordas da tela.
          Presa à coluna de texto ela pareceria um carrossel; sangrando, lê como
          fita passando por trás da página. */}
      <Marquee
        items={all}
        className="mt-16 -mx-6 border-y border-[var(--rule)] py-6 md:mt-24 md:-mx-10 xl:-mx-14"
      />

      <div className="mt-16 md:mt-20">
        {stack.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05}>
            <div className="grid grid-cols-1 gap-3 border-b border-[var(--rule)] py-6 md:grid-cols-12 md:items-baseline md:gap-10">
              <span className="type-mono text-[var(--fg-mute)] md:col-span-3">{group.group}</span>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-9">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="type-mono normal-case tracking-normal text-[var(--fg-soft)] transition-colors duration-300 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
