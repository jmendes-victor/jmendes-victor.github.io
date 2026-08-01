import Reveal from "../ui/Reveal";
import Magnetic from "../ui/Magnetic";
import SplitText from "../ui/SplitText";
import { profile } from "../../data/site";

/**
 * Bloco escuro no fim: fecha a página e é o que dá função à inversão de cor
 * da navbar (o design original dela previa isso).
 *
 * É a única seção que inverte, então é aqui que o site "vira" — por isso ela
 * ganha o tipo de cartaz e o único elemento magnético da página.
 */
export default function Contact() {
  return (
    <section
      id="contato"
      className="panel panel-dark gutter relative z-10 py-24 md:py-32"
    >
      <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-4">
        <h2 className="type-mono">Contato</h2>
        <span className="type-mono text-[var(--fg-soft)]">{profile.availability}</span>
      </div>

      {/* O convite vai grande; o e-mail em si vem depois, menor. Antes o e-mail
          era o maior elemento da seção — endereço de e-mail é informação de
          serviço, não manchete. */}
      <div className="mt-8 overflow-hidden md:mt-10">
        <h3 className="type-mega text-[var(--fg)]">
          <SplitText text="Vamos conversar" inView justify="start" stagger={0.03} duration={1.1} />
        </h3>
      </div>

      <Reveal className="mt-14 md:mt-20">
        <Magnetic className="inline-block">
          <a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            className="group inline-block max-w-full"
          >
            <span className="type-headline block break-all transition-colors duration-300 group-hover:text-accent">
              {profile.email}
            </span>
            {/* fio que se retrai da direita para a esquerda no hover */}
            <span className="mt-3 block h-px w-full origin-left bg-[var(--line)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-0 motion-reduce:transition-none" />
          </a>
        </Magnetic>
      </Reveal>
    </section>
  );
}
