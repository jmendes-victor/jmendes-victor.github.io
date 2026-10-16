import { useId, useState } from "react";
import Reveal from "../ui/Reveal";

// As colunas da tabela, compartilhadas pelo cabeçalho e pelas linhas. Stack só
// aparece no lg: no md as 12 colunas ficam com ~35px e ela quebraria em três
// linhas. Abaixo do md vira cartão: ano e "+" em cima, título, tipo.
const COL = {
  year: "md:col-span-2 lg:col-span-1",
  title: "md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-2",
  type: "md:col-span-3 md:col-start-9 lg:col-span-2 lg:col-start-7",
  stack: "lg:col-span-3 lg:col-start-9",
};

// sem o "grid": o cabeçalho precisa de hidden md:grid, e os dois juntos brigam
const GRID = "grid-cols-[1fr_auto] gap-x-4 md:grid-cols-12 md:gap-x-6 lg:gap-x-10";

// Sistemas de cliente: sem link e sem imagem, então a linha é compacta e o
// resumo abre por baixo dela. Um aberto por vez.
export default function Archive({ items }) {
  const [open, setOpen] = useState(null);

  const first = items.at(-1)?.year;
  const last = items[0]?.year;

  return (
    <div className="mt-32 md:mt-48">
      <div className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] pb-4">
        <h3 className="type-mono">Sistemas para clientes</h3>
        <span className="type-mono shrink-0 text-[var(--fg-soft)]">
          {first}-{last} · ({String(items.length).padStart(2, "0")})
        </span>
      </div>

      <Reveal className="mt-10 md:mt-14">
        <p className="type-statement max-w-[44ch] text-pretty text-[var(--fg-soft)]">
          Sistemas de gestão que rodaram em produção. São internos de cada cliente, por isso não
          têm link público.
        </p>
      </Reveal>

      <div
        aria-hidden="true"
        className={`${GRID} type-mono mt-16 hidden pb-4 text-[var(--fg-mute)] md:mt-20 md:grid`}
      >
        <span className={COL.year}>Ano</span>
        <span className={COL.title}>Projeto</span>
        <span className={COL.type}>Tipo</span>
        <span className={`hidden lg:block ${COL.stack}`}>Stack</span>
      </div>

      <ul className="mt-12 border-b border-[var(--rule)] md:mt-0">
        {items.map((project, i) => (
          <Row
            key={project.slug}
            project={project}
            index={i}
            open={open === project.slug}
            onToggle={() => setOpen((cur) => (cur === project.slug ? null : project.slug))}
          />
        ))}
      </ul>
    </div>
  );
}

function Row({ project, index, open, onToggle }) {
  const id = useId();

  return (
    <Reveal
      as="li"
      delay={index * 0.06}
      className="group border-t border-[var(--rule)] transition-colors duration-500 hover:border-[var(--line)]"
    >
      <h4>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className={`grid ${GRID} w-full items-baseline gap-y-3 py-6 text-left md:py-8`}
        >
          <span className={`type-mono text-[var(--fg-mute)] ${COL.year}`}>{project.year}</span>

          <span
            className={`type-headline col-span-2 row-start-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 motion-reduce:transition-none md:row-start-1 ${COL.title}`}
          >
            {project.title}
          </span>

          <span
            className={`type-mono col-span-2 row-start-3 text-[var(--fg-soft)] md:row-start-1 ${COL.type}`}
          >
            {project.discipline}
          </span>

          <span className={`type-mono hidden text-[var(--fg-soft)] lg:row-start-1 lg:block ${COL.stack}`}>
            {project.stack.join(" · ")}
          </span>

          {/* SVG pelo mesmo motivo do Sobre: decoração fora da conta de
              contraste. Fechado gira no hover; aberto vira um "×". */}
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className={`col-start-2 row-start-1 size-3 self-center justify-self-end transition-all duration-500 motion-reduce:transition-none md:col-start-12 ${
              open
                ? "rotate-45 fill-[var(--fg)]"
                : "fill-[var(--fg-faint)] group-hover:rotate-90 group-hover:fill-[var(--fg)]"
            }`}
          >
            <path d="M5.2 0h1.6v12H5.2z" />
            <path d="M0 5.2h12v1.6H0z" />
          </svg>
        </button>
      </h4>

      {/* 0fr → 1fr anima a altura até o conteúdo sem medir nada em JS; o
          inert tira o resumo fechado do tab e do leitor de tela */}
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        inert={!open}
        className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={`grid gap-8 pb-8 transition-opacity duration-500 md:grid-cols-12 md:gap-x-6 md:pb-10 lg:gap-x-10 ${
              open ? "opacity-100 delay-150" : "opacity-0"
            }`}
          >
            <p className={`type-statement text-pretty text-[var(--fg-soft)] ${COL.title}`}>
              {project.summary}
            </p>

            <dl className="md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9">
              <div className="flex items-baseline justify-between gap-6 border-t border-[var(--rule)] py-3">
                <dt className="type-mono text-[var(--fg-mute)]">Papel</dt>
                <dd className="type-mono text-right">{project.role}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-t border-[var(--rule)] py-3 lg:hidden">
                <dt className="type-mono text-[var(--fg-mute)]">Stack</dt>
                <dd className="type-mono text-right">{project.stack.join(" · ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
