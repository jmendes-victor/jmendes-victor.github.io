import { motion, useReducedMotion } from "motion/react";

// Entrada padrão dos blocos: sobe um pouco e aparece, uma vez só.
//
// `as` troca a tag: dentro de <ul> o wrapper precisa ser <li>, senão a lista
// fica com <div> por filho e os <li> viram órfãos.
export default function Reveal({ children, delay = 0, className = "", y = 24, as = "div" }) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduced ? 0.3 : 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Tag>
  );
}
