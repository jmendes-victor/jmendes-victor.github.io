import { useLayoutEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

const WIDTH = 380;
const HEIGHT = 260;
/** Distância do cursor. Positivo = o card nasce abaixo e à direita dele. */
const GAP = 28;

/**
 * A imagem do projeto que segue o cursor pelo índice.
 *
 * Dois elementos aninhados de propósito: no Motion, `x` e `translateX` são a
 * mesma propriedade, então o deslocamento de -50% precisa morar num nó
 * separado do que carrega a mola.
 */
export default function HoverPreview({ project, x, y }) {
  // Deslocado do cursor em vez de centrado nele: centrado, o card tapa
  // justamente o título da linha que a pessoa está apontando. O min prende o
  // card dentro da viewport quando o cursor chega perto da borda.
  const offsetX = useTransform(x, (v) => Math.min(v + GAP, window.innerWidth - WIDTH - GAP));
  const offsetY = useTransform(y, (v) => Math.min(v + GAP, window.innerHeight - HEIGHT - GAP));

  const springX = useSpring(offsetX, { stiffness: 260, damping: 32, mass: 0.5 });
  const springY = useSpring(offsetY, { stiffness: 260, damping: 32, mass: 0.5 });
  const wasVisible = useRef(false);

  // Ao aparecer, planta a mola onde o cursor já está. `jump` tem que ser na
  // mola, não no valor de origem: mexer na origem é justamente o que faz a
  // mola *animar* até lá — e ela viria arrastando desde o canto da tela.
  useLayoutEffect(() => {
    if (project && !wasVisible.current) {
      springX.jump(offsetX.get());
      springY.jump(offsetY.get());
    }
    wasVisible.current = Boolean(project);
  }, [project, springX, springY, offsetX, offsetY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="origin-top-left overflow-hidden"
        style={{ width: WIDTH, height: HEIGHT }}
        animate={{ opacity: project ? 1 : 0, scale: project ? 1 : 0.92 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {project && (
          // key no slug: cada projeto entra com a própria revelação
          <motion.div
            key={project.slug}
            className="h-full w-full"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {project.image ? (
              <img src={project.image} alt="" className="h-full w-full object-cover" />
            ) : (
              // preto, e não o violeta de destaque: o preview passa por baixo
              // da navbar, e `difference` sobre violeta devolveria verde-limão
              <div className="flex h-full w-full flex-col justify-between bg-ink p-5 text-paper">
                <div className="flex items-baseline justify-between border-b border-paper/20 pb-3">
                  <span className="type-mono">{project.discipline}</span>
                  <span className="type-mono text-paper/50">{project.year}</span>
                </div>
                <div>
                  <span className="type-headline block">{project.title}</span>
                  <span className="type-mono mt-2 block text-paper/50">
                    {project.stack.join(" · ")}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
