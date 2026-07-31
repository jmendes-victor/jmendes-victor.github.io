import Reveal from "../ui/Reveal";
import { statement, experience } from "../../data/site";

export default function About() {
  return (
    <section
      id="sobre"
      className="gutter relative z-10 bg-paper py-24 md:py-32"
    >
      <div className="flex items-baseline justify-between border-b border-ink pb-4">
        <h2 className="type-mono">Sobre</h2>
        <span className="type-mono text-ink/50">(01)</span>
      </div>

      {/* Grid suíço: rótulo na coluna estreita, texto na larga. */}
      <div className="mt-12 grid gap-8 md:grid-cols-12 md:gap-10">
        <span className="type-mono text-ink/40 md:col-span-3">Abordagem</span>
        <Reveal className="md:col-span-9 lg:col-span-7">
          <p className="type-statement text-pretty">{statement[1]}</p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12 md:gap-10">
        <span className="type-mono text-ink/40 md:col-span-3">Trajetória</span>

        <ul className="md:col-span-9">
          {experience.map((item, i) => (
            <Reveal key={`${item.company}-${i}`} delay={i * 0.06}>
              <li className="grid grid-cols-1 gap-1 border-t border-rule py-5 sm:grid-cols-12 sm:items-baseline sm:gap-4">
                <span className="type-mono sm:col-span-5">{item.role}</span>
                <span className="type-mono text-ink/50 sm:col-span-4">{item.company}</span>
                <span className="type-mono text-ink/40 sm:col-span-3 sm:text-right">
                  {item.period}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
