import { motion, useReducedMotion } from "motion/react";

// Faixa em loop infinito.
//
// A lista é duplicada e animada de 0 a -50%: quando a primeira cópia sai, a
// segunda está exatamente onde a primeira começou e o loop reinicia sem emenda.
// Duas cópias bastam, desde que cada uma seja mais larga que a viewport.
//
// O pr-* precisa ser sempre igual ao gap-*: com 2N itens o gap gera 2N-1 vãos e
// o padding da direita é o vão que falta. Sem ele a lista não mede o dobro exato
// de uma cópia, o -50% para no lugar errado e a faixa engasga a cada volta.
export default function Marquee({ items, duration = 28, className = "" }) {
  const reduced = useReducedMotion();

  // com reduced motion a lista fica parada
  if (reduced) {
    return (
      <ul className={`flex flex-wrap gap-x-8 gap-y-2 ${className}`}>
        {items.map((item) => (
          <li key={item} className="type-headline">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.ul
        className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {/* a segunda cópia vai com aria-hidden: o leitor de tela já leu a primeira */}
        {[...items, ...items].map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="type-headline whitespace-nowrap text-[var(--fg-soft)] transition-colors duration-300 hover:text-accent"
          >
            {item}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
