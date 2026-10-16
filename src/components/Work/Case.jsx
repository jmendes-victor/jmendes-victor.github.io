import Reveal from "../ui/Reveal";
import SplitText from "../ui/SplitText";
import RollText from "../ui/RollText";
import Figure from "./Figure";
import { MoraDiagram, PneumoniaDiagram } from "./diagrams";

const DRAWINGS = {
  mora: MoraDiagram,
  "pneumonia-cnn": PneumoniaDiagram,
};

// Um projeto de pesquisa em destaque: texto de um lado, esquema do outro.
//
// No lg os dois dividem a linha (5 + 7 colunas) e os lados alternam a cada
// case; o col-start explícito faz a troca sem mudar a ordem do DOM, que segue
// texto antes da figura para o leitor de tela e para o telefone, onde empilha.
// O texto é sticky porque a figura é mais alta que ele.
export default function Case({ project, index }) {
  const number = String(index + 1).padStart(2, "0");
  const flip = index % 2 === 1;
  const Drawing = DRAWINGS[project.slug];

  const details = [
    ["Papel", project.role],
    ["Stack", project.stack.join(" · ")],
    ["Ano", project.year],
  ];

  return (
    <article className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div
        className={`lg:sticky lg:top-28 lg:col-span-5 lg:row-start-1 lg:self-start ${
          flip ? "lg:col-start-8" : "lg:col-start-1"
        }`}
      >
        <div className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-4">
          <span className="type-mono">{number}</span>
          <span className="type-mono text-right text-[var(--fg-soft)]">{project.discipline}</span>
        </div>

        <h3 className="type-case mt-8 md:mt-10">
          <SplitText text={project.title} inView justify="start" stagger={0.03} duration={1} />
        </h3>

        <Reveal delay={0.15} className="mt-6 md:mt-8">
          <p className="type-statement max-w-[38ch] text-pretty text-[var(--fg-soft)]">
            {project.summary}
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-10 md:mt-12">
          <dl className="border-t border-[var(--rule)]">
            {details.map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-6 border-b border-[var(--rule)] py-3"
              >
                <dt className="type-mono text-[var(--fg-mute)]">{label}</dt>
                <dd className="type-mono text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.35} className="mt-10">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="group inline-block"
          >
            <span className="type-mono flex items-center gap-3 transition-colors duration-300 group-hover:text-accent-soft">
              <RollText>{project.cta}</RollText>
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none">
                ↗
              </span>
            </span>
            {/* mesmo fio do e-mail no Contato: recolhe no hover */}
            <span className="mt-2 block h-px w-full origin-left bg-[var(--line)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-0 motion-reduce:transition-none" />
          </a>
        </Reveal>
      </div>

      <div className={`lg:col-span-7 lg:row-start-1 ${flip ? "lg:col-start-1" : "lg:col-start-6"}`}>
        <Figure number={number} figure={project.figure}>
          {(shown) => <Drawing show={shown} />}
        </Figure>
      </div>
    </article>
  );
}
