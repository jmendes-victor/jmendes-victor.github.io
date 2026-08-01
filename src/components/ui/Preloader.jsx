import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { getLenis } from "../../hooks/useLenis";

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 1700;

// Cortina de entrada com contador 000 → 100. Chama onDone quando termina, e é
// isso que libera a animação do hero.
//
// O contador é tempo decorrido, não carregamento real — o site já está todo em
// memória quando ele aparece.
export default function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // com reduced motion entra direto no site
    if (reduced) {
      setOpen(false);
      onDone();
      return;
    }

    // Trava o scroll enquanto a cortina está de pé. O Lenis precisa parar
    // junto: ele escuta o wheel e rola por conta própria, então overflow:
    // hidden no body sozinho não segura o desktop.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // O release precisa acontecer aqui e não no cleanup: este componente nunca
    // desmonta (quem sai é o motion.div dentro do AnimatePresence), então o
    // cleanup só rodaria no unmount da página. Sem isto o overflow: hidden fica
    // no body para sempre e o mobile, que depende do scroll nativo, não rola.
    let lenis = null;
    const release = () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };

    const finish = () => {
      setCount(100);
      setOpen(false);
      release();
      // avisa aqui e não no onExitComplete: o hero tem que estar escrevendo o
      // nome enquanto a cortina sobe, senão sobra um segundo de tela vazia
      onDone();
    };

    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      // o efeito do filho roda antes do pai, então na montagem o Lenis ainda
      // não existe — o primeiro frame é o ponto mais cedo em que dá para parar
      if (!lenis) {
        lenis = getLenis();
        lenis?.stop();
      }

      const progress = Math.min((now - start) / DURATION, 1);
      // ease-out no fim; contador linear parece travado nos últimos números
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * 100));

      if (progress < 1) frame = requestAnimationFrame(tick);
      else finish();
    });

    // O navegador congela o rAF em aba de fundo: sem isto, uma página aberta em
    // nova guia ficaria presa atrás da cortina. O timeout continua correndo e
    // garante a saída — o rAF segue existindo por causa da contagem suave.
    const failsafe = setTimeout(finish, DURATION + 600);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(failsafe);
      release();
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
          {/* gutter para o contador nascer na mesma margem do resto do site */}
          <div className="gutter flex items-end justify-between pb-8">
            <span className="type-mono text-paper/40">Carregando</span>
            <span className="type-display leading-none text-paper">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          {/* barra de progresso rente à borda inferior */}
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
