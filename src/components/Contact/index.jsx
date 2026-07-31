import Reveal from "../ui/Reveal";
import { profile } from "../../data/site";

/**
 * Bloco escuro no fim: fecha a página e é o que dá função à inversão de cor
 * da navbar (o design original dela previa isso).
 */
export default function Contact() {
  return (
    <section
      id="contato"
      className="gutter relative z-10 bg-ink py-24 text-paper md:py-32"
    >
      <div className="flex items-baseline justify-between border-b border-paper pb-4">
        <h2 className="type-mono">Contato</h2>
        <span className="type-mono text-paper/50">{profile.availability}</span>
      </div>

      <Reveal className="mt-14 md:mt-20">
        <a
          href={`mailto:${profile.email}`}
          data-cursor="link"
          className="group inline-block max-w-full"
        >
          <span className="type-index block break-all transition-colors duration-300 group-hover:text-accent">
            {profile.email}
          </span>
          {/* fio que se retrai da direita para a esquerda no hover */}
          <span className="mt-3 block h-px w-full origin-left bg-paper transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-0 motion-reduce:transition-none" />
        </a>
      </Reveal>
    </section>
  );
}
