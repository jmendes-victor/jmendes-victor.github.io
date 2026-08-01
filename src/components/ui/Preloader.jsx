import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { getLenis } from "../../hooks/useLenis";

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 1700;

/**
 * Cortina de entrada com contador 00 → 100.
 *
 * Serve para uma coisa só: dar ao hero um instante de silêncio antes de ele
 * escrever o nome. Sem isso a animação de letra por letra começa junto com o
 * primeiro paint e ninguém vê o começo dela.
 *
 * O contador não mede carregamento de verdade — seria mentira fingir uma barra
 * de progresso num site que já está todo em memória. Ele é uma contagem
 * honesta de tempo, e por isso é curta.
 */
export default function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // quem pediu menos movimento entra direto no site
    if (reduced) {
      setOpen(false);
      onDone();
      return;
    }

    // trava o scroll enquanto a cortina está de pé, senão dá para rolar às
    // cegas por trás dela e chegar no meio da página. Precisa parar o Lenis
    // também: ele escuta o wheel e rola sozinho, então `overflow: hidden`
    // no body não o impediria.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    const finish = () => {
      setCount(100);
      setOpen(false);
      // avisa agora, não no `onExitComplete`: o hero precisa estar escrevendo
      // o nome enquanto a cortina sobe. Esperar o fim da saída deixaria um
      // segundo de tela vazia entre uma coisa e outra.
      onDone();
    };

    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const progress = Math.min((now - start) / DURATION, 1);
      // desacelera no fim: contador linear parece travado nos últimos números
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * 100));

      if (progress < 1) frame = requestAnimationFrame(tick);
      else finish();
    });

    // Trava de segurança. O navegador congela o rAF em aba de fundo, então uma
    // página aberta em nova guia ficaria presa atrás da cortina para sempre —
    // e o `setTimeout`, que continua correndo, é o que garante que o site
    // sempre abre. Não substitui o rAF: ele é quem dá a contagem suave.
    const failsafe = setTimeout(finish, DURATION + 600);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(failsafe);
      document.body.style.overflow = previous;
      getLenis()?.start();
    };
  }, [reduced, onDone]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-end bg-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE }}
        >
          {/* o contador senta na mesma margem do resto do site, e não
              centralizado: alinhado à grade ele já apresenta o gutter */}
          <div className="gutter flex items-end justify-between pb-8">
            <span className="type-mono text-paper/40">Carregando</span>
            <span className="type-display leading-none text-paper">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          {/* fio de progresso rente à borda inferior */}
          <motion.span
            className="h-px w-full origin-left bg-paper/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
