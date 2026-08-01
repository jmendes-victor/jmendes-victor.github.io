import { motion, useReducedMotion } from "motion/react";

/**
 * Faixa que corre para sempre.
 *
 * É a única coisa do site que se move sem o usuário pedir, e existe por isso:
 * numa página inteira de animação disparada por scroll, um elemento com vida
 * própria é o que impede a sensação de que tudo congelou quando a rolagem para.
 *
 * O truque é duplicar o conteúdo e animar de 0 a -50%: quando a primeira cópia
 * termina de sair, a segunda está exatamente onde a primeira começou, e o
 * `repeat: Infinity` reinicia sem emenda visível. Duas cópias bastam desde que
 * cada uma seja mais larga que a viewport.
 *
 * NÃO remova o `pr-*`, e mantenha-o sempre igual ao `gap-*`. Com 2N itens o
 * `gap` produz 2N-1 vãos; o padding da direita é o 2N-ésimo. Sem ele a largura
 * da lista não é o dobro exato de uma cópia, -50% para no lugar errado e a
 * faixa engasga a cada volta.
 */
export default function Marquee({ items, duration = 28, className = "" }) {
  const reduced = useReducedMotion();

  // Quem pediu menos movimento recebe a lista parada — sem faixa correndo.
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
        {/* a segunda cópia é decorativa: o leitor de tela já leu a primeira */}
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
