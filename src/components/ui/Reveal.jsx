import { motion, useReducedMotion } from "motion/react";

/** Entrada padrão das seções: sobe um pouco e aparece, uma única vez. */
export default function Reveal({ children, delay = 0, className = "", y = 24 }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduced ? 0.3 : 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
