import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import SplitText from "../ui/SplitText";
import { profile } from "../../data/site";

/**
 * Mantido do design original: nome revelado letra a letra, com a função à
 * esquerda e a edição à direita alinhadas às bordas do nome.
 *
 * É `position: fixed` — não rola. O conteúdo passa por cima dele, e o espaço
 * de rolagem do hero é o `margin-top` da folha de conteúdo (<Sheet />).
 *
 * O que mudou: o nome agora é tipo de display (Anton) na escala de cartaz, e
 * o bloco inteiro recua enquanto a folha sobe. Antes ele ficava parado sendo
 * encoberto, o que lia como "sumiu atrás"; recuando, lê como profundidade.
 *
 * A margem negativa é menor aqui (0.06em, não 0.12em) porque Anton tem altura
 * de x maior que a Inter: com o valor antigo a legenda encostava no nome.
 *
 * `start` vem do preloader — sem ele o nome se escreveria atrás da cortina.
 */
export default function Hero({ start = true }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // 0 → 100vh é exatamente o trecho em que a folha de conteúdo cobre o hero
  const range = typeof window === "undefined" ? [0, 800] : [0, window.innerHeight];
  const scale = useTransform(scrollY, range, [1, 0.92]);
  const opacity = useTransform(scrollY, range, [1, 0]);
  const y = useTransform(scrollY, range, [0, -60]);

  return (
    <section
      id="topo"
      className="panel panel-light fixed inset-0 z-0 flex items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        className="flex w-full max-w-full flex-col items-center sm:w-fit"
        style={reduced ? undefined : { scale, opacity, y }}
      >
        {/* margem negativa em em: o SplitText usa leading 1.15 nas letras (para
            não cortar acento), então sem isto a legenda ficaria mais longe do
            nome do que estava no design original */}
        <h1 className="type-mega -mb-[0.06em] text-[var(--fg)]">
          {start && (
            <SplitText text={profile.name} delay={0.15} stagger={0.05} duration={1.3} />
          )}
        </h1>

        <div className="mt-1 flex w-full items-baseline justify-between gap-4 sm:gap-8">
          <p className="type-hero-label text-[var(--fg)]">
            {start && (
              <SplitText
                text={profile.role}
                direction="down"
                delay={0.4}
                stagger={0.012}
                duration={0.9}
                justify="start"
              />
            )}
          </p>
          <p className="type-hero-label text-[var(--fg)]">
            {start && (
              <SplitText
                text={profile.edition}
                direction="down"
                delay={0.55}
                stagger={0.012}
                duration={0.9}
                justify="start"
              />
            )}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
