import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * O elemento se inclina na direção do cursor quando ele chega perto.
 *
 * Vale para um alvo por página, no máximo dois. O efeito funciona porque é
 * raro: se tudo for magnético, nada parece especial e a página fica escorregadia
 * — o usuário perde a noção de onde as coisas estão de fato.
 *
 * A mola importa mais que a distância: sem ela o elemento gruda no cursor e
 * parece preso; com ela, parece atraído.
 */
export default function Magnetic({ children, strength = 0.28, className = "" }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const handleMove = (event) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    // deslocamento a partir do centro do próprio elemento
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
