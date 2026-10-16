import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import SplitText from "../ui/SplitText";

// Letreiro da abertura: linhas em Anton alternando o lado, cada uma deslizando
// no sentido oposto ao da vizinha conforme a página rola.
//
// O deslocamento é de 2,5% para cada lado, e não cabe mais: é a folga que o
// gutter tem para a linha entrar nele sem encostar nos trilhos.
export default function Banner({ lines, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <p ref={ref} className={`type-opening ${className}`}>
      {lines.map((line, i) => (
        <Line key={line.text} line={line} index={i} progress={scrollYProgress} still={reduced} />
      ))}
    </p>
  );
}

function Line({ line, index, progress, still }) {
  const right = index % 2 === 1;
  const x = useTransform(progress, [0, 1], right ? ["2.5%", "-2.5%"] : ["-2.5%", "2.5%"]);

  return (
    // O SplitText dá 1.15 de leading a cada letra para a máscara não cortar
    // acento, o que espaça demais as linhas empilhadas; o -mt devolve o
    // aperto do letreiro. A máscara de cada letra continua inteira, só passa
    // a sobrepor o vão da linha de cima, que é vazio.
    <motion.span
      style={still ? undefined : { x }}
      className={`flex items-start gap-3 md:gap-6 ${right ? "justify-end" : ""} ${
        index > 0 ? "-mt-[0.24em]" : ""
      }`}
    >
      <SplitText
        text={line.text}
        inView
        justify="start"
        delay={index * 0.08}
        stagger={0.025}
        duration={1.1}
        className={`shrink-0 ${line.outline ? "text-outline" : ""}`}
      />
      {/* O pt em em do letreiro alinha a anotação com o topo das maiúsculas.
          Ela é quem cede quando falta largura (abaixo de ~360px): quebra em
          duas linhas curtas em vez de empurrar uma palavra do letreiro. */}
      {line.note && (
        <span className="min-w-0 pt-[0.2em]">
          <span className="type-mono block text-[var(--fg-soft)]">{line.note}</span>
        </span>
      )}
    </motion.span>
  );
}
