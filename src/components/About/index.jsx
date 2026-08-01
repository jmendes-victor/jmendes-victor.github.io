import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";
import { statement, experience } from "../../data/site";

export default function About() {
  return (
    <section
      id="sobre"
      className="panel panel-light gutter relative z-10 py-24 md:py-32"
    >
      <SectionHead label="Sobre" title="Abordagem" />

      <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12 md:gap-10">
        <span className="type-mono text-[var(--fg-mute)] md:col-span-3">Abordagem</span>
        <Reveal className="md:col-span-9 lg:col-span-7">
          <p className="type-statement text-pretty">{statement[1]}</p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12 md:gap-10">
        <span className="type-mono text-[var(--fg-mute)] md:col-span-3">Trajetória</span>

        {/* o "+" da direita é decorativo, não abre nada */}
        <ul className="md:col-span-9">
          {experience.map((item, i) => (
            <Reveal
              key={`${item.company}-${i}`}
              as="li"
              delay={i * 0.06}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-t border-[var(--rule)] py-6 transition-colors duration-500 hover:border-[var(--line)] md:gap-8 md:py-8"
            >
              <span className="type-mono shrink-0 text-[var(--fg-mute)] transition-colors duration-300 group-hover:text-accent">
                {item.period}
              </span>

              <div className="min-w-0">
                <h4 className="type-headline transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 motion-reduce:transition-none">
                  {item.role}
                </h4>
                <span className="type-mono mt-2 block text-[var(--fg-mute)]">{item.company}</span>
              </div>

              {/* SVG e não o caractere "+": é decoração pura, e como texto ele
                  entraria na conta de contraste do Lighthouse, que não tem como
                  saber que não carrega informação nenhuma. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                className="size-3 shrink-0 fill-[var(--fg-faint)] transition-all duration-500 group-hover:rotate-90 group-hover:fill-[var(--fg)] motion-reduce:transition-none"
              >
                <path d="M5.2 0h1.6v12H5.2z" />
                <path d="M0 5.2h12v1.6H0z" />
              </svg>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
