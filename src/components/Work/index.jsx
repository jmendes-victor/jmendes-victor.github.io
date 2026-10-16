import SectionHead from "../ui/SectionHead";
import RollText from "../ui/RollText";
import Case from "./Case";
import Archive from "./Archive";
import { projects, socials } from "../../data/site";

// Pesquisa primeiro, em cases com esquema; os sistemas de cliente depois, numa
// tabela. A divisão vem do featured em data/site.js.
export default function Work() {
  const featured = projects.filter((project) => project.featured);
  const archive = projects.filter((project) => !project.featured);

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

      <div className="mt-16 flex flex-col gap-28 md:mt-24 md:gap-40">
        {featured.map((project, i) => (
          <Case key={project.slug} project={project} index={i} />
        ))}
      </div>

      <Archive items={archive} />

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
          <span className="type-mono flex shrink-0 items-center gap-2 transition-colors duration-300 group-hover:text-accent-soft">
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
