import { useEffect, useState } from "react";
import { useMotionValue } from "motion/react";
import ProjectRow from "./ProjectRow";
import HoverPreview from "./HoverPreview";
import RollText from "../ui/RollText";
import { projects, socials } from "../../data/site";

export default function Work() {
  const [active, setActive] = useState(null);
  const [canHover, setCanHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

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

  const handleMove = (event) => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  const handleEnter = (index) => (event) => {
    if (!canHover) return;
    // Posiciona antes de mostrar: `pointerenter` chega antes do primeiro
    // `pointermove`, então sem isto o preview nasceria em (0,0).
    x.set(event.clientX);
    y.set(event.clientY);
    setActive(index);
  };

  const handleLeave = () => setActive(null);

  const github = socials.find((item) => item.label === "GitHub");
  const firstYear = projects.at(-1)?.year;
  const lastYear = projects[0]?.year;

  return (
    <section
      id="projetos"
      className="gutter relative z-10 bg-paper pb-24 pt-24 md:pb-32 md:pt-32"
    >
      <div className="flex items-baseline justify-between gap-6 border-b border-ink pb-4">
        <h2 className="type-mono">Projetos selecionados</h2>
        <span className="type-mono shrink-0 text-ink/50">
          {firstYear}—{lastYear} · ({String(projects.length).padStart(2, "0")})
        </span>
      </div>

      <ul onPointerMove={canHover ? handleMove : undefined} onPointerLeave={handleLeave}>
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
          <span className="type-mono text-ink/45 transition-colors duration-300 group-hover:text-ink">
            Todo o resto está nos repositórios
          </span>
          <span className="type-mono flex shrink-0 items-center gap-2 transition-colors duration-300 group-hover:text-accent">
            <RollText>GitHub</RollText>
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none">
              ↗
            </span>
          </span>
        </a>
      )}

      {canHover && (
        <HoverPreview project={active === null ? null : projects[active]} x={x} y={y} />
      )}
    </section>
  );
}
