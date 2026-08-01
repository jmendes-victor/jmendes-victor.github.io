import { useEffect, useState } from "react";
import ProjectRow from "./ProjectRow";
import SectionHead from "../ui/SectionHead";
import RollText from "../ui/RollText";
import { projects, socials } from "../../data/site";

export default function Work() {
  const [active, setActive] = useState(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCanHover(fine.matches && !reduced.matches);

    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  const handleEnter = (index) => () => {
    if (!canHover) return;
    setActive(index);
  };

  const github = socials.find((item) => item.label === "GitHub");
  const firstYear = projects.at(-1)?.year;
  const lastYear = projects[0]?.year;

  return (
    <section
      id="projetos"
      className="panel panel-dark gutter relative z-10 pb-24 pt-24 md:pb-32 md:pt-32"
    >
      <SectionHead
        label="Pesquisa e sistemas"
        title="Trabalho"
        meta={`${firstYear}-${lastYear} · (${String(projects.length).padStart(2, "0")})`}
      />

      <ul className="mt-16 md:mt-24" onPointerLeave={() => setActive(null)}>
        {projects.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={i}
            dimmed={active !== null && active !== i}
            onEnter={handleEnter(i)}
          />
        ))}
      </ul>

      {github && (
        <a
          href={github.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          className="group mt-10 flex items-baseline justify-between gap-6"
        >
          <span className="type-mono text-[var(--fg-mute)] transition-colors duration-300 group-hover:text-[var(--fg)]">
            O que é público está nos repositórios
          </span>
          <span className="type-mono flex shrink-0 items-center gap-2 transition-colors duration-300 group-hover:text-accent">
            <RollText>GitHub</RollText>
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none">
              ↗
            </span>
          </span>
        </a>
      )}
    </section>
  );
}
