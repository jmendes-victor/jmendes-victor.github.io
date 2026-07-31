import SplitText from "../ui/SplitText";
import { profile } from "../../data/site";

/**
 * Mantido do design original: nome revelado letra a letra, com a função à
 * esquerda e a edição à direita alinhadas às bordas do nome.
 *
 * É `position: fixed` — não rola. O conteúdo passa por cima dele, e o espaço
 * de rolagem do hero é o `margin-top` da folha de conteúdo (<Sheet />).
 */
export default function Hero() {
  return (
    <section
      id="topo"
      className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden bg-paper px-6"
    >
      <div className="flex w-full max-w-full flex-col items-center sm:w-fit">
        {/* margem negativa em em: o SplitText usa leading 1.15 nas letras (para
            não cortar acento), então sem isto a legenda ficaria mais longe do
            nome do que estava no design original */}
        <h1 className="type-display -mb-[0.12em] text-ink">
          <SplitText text={profile.name} delay={0.5} stagger={0.05} duration={1.3} />
        </h1>

        <div className="mt-1 flex w-full items-baseline justify-between gap-4 sm:gap-8">
          <p className="type-hero-label text-ink">
            <SplitText
              text={profile.role}
              direction="down"
              delay={0.75}
              stagger={0.012}
              duration={0.9}
              justify="start"
            />
          </p>
          <p className="type-hero-label text-ink">
            <SplitText
              text={profile.edition}
              direction="down"
              delay={0.9}
              stagger={0.012}
              duration={0.9}
              justify="start"
            />
          </p>
        </div>
      </div>
    </section>
  );
}
