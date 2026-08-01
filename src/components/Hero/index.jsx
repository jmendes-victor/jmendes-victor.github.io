import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import SplitText from "../ui/SplitText";
import { profile } from "../../data/site";

// Nome revelado letra a letra, com função e edição alinhadas às bordas dele.
//
// É position: fixed e não rola — o conteúdo passa por cima. Quem reserva o
// espaço de rolagem do hero é o margin-top: 100vh da Intro.
//
// `start` vem do preloader; sem ele o nome se escreveria atrás da cortina.
export default function Hero({ start = true }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // 0 → 100vh é o trecho em que o conteúdo cobre o hero
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
        {/* a margem negativa compensa o leading 1.15 que o SplitText usa para
            não cortar acento; sem ela sobra espaço demais até a legenda */}
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
