import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// Os esquemas dos cases. Ilustram o princípio de cada projeto, não a
// arquitetura exata: nem o número de agentes nem o de camadas é o real.
//
// Coordenadas no viewBox de 400×240, com cada etapa centrada em x = 50, 150,
// 250 e 350 — ver o comentário da Figure.

const EASE = [0.16, 1, 0.3, 1];
const W = 400;
const H = 240;

const GUIDE = "fill-none stroke-[var(--rule)]";
const FAINT = "fill-none stroke-[var(--fg-faint)]";
const SOFT = "fill-none stroke-[var(--fg-soft)]";
const SIGNAL = "fill-none stroke-accent-soft";
const NODE = "fill-[var(--bg)] stroke-[var(--fg)]";
const NODE_SOFT = "fill-[var(--bg)] stroke-[var(--fg-soft)]";
const NODE_SIGNAL = "fill-[var(--bg)] stroke-accent-soft";

// Base comum. O desenho entra com uma cortina da esquerda para a direita, no
// sentido em que o dado anda, e só depois liga as animações contínuas — e só
// enquanto está na tela.
//
// O vector-effect segura todo traço em 1px de tela: sem ele a linha escalaria
// com a figura e iria de fio de cabelo no telefone a 2,5px no desktop.
function Canvas({ show, labels = [], children }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const visible = useInView(ref);
  const [drawn, setDrawn] = useState(false);
  const live = drawn && visible && !reduced;

  return (
    <div ref={ref} className="relative">
      <motion.svg
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        className="block h-auto w-full [&_*]:[vector-effect:non-scaling-stroke]"
        initial={reduced ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
        animate={show ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
        onAnimationComplete={() => setDrawn(true)}
      >
        <path d="M50 0V240M150 0V240M250 0V240M350 0V240" className={GUIDE} strokeDasharray="2 6" />
        {children(live)}
      </motion.svg>

      {/* posição em % do viewBox: a caixa tem a proporção exata do SVG */}
      {labels.map((label) => (
        <motion.span
          key={label.text}
          aria-hidden="true"
          className="type-fig absolute whitespace-nowrap text-[var(--fg-soft)]"
          style={{
            left: `${(label.x / W) * 100}%`,
            top: `${(label.y / H) * 100}%`,
            x: "-50%",
            y: label.below ? "0%" : "-100%",
          }}
          initial={reduced ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          {label.text}
        </motion.span>
      ))}
    </div>
  );
}

// Ponto que percorre um caminho em loop. SMIL e não Motion: o navegador anima
// sozinho, sem passar pelo React a cada quadro.
function Pulse({ path, dur = "2.8s" }) {
  return (
    <circle r="2.5" className="fill-[var(--fg)]">
      <animateMotion path={path} dur={dur} repeatCount="indefinite" />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.1;0.85;1"
        dur={dur}
        repeatCount="indefinite"
      />
    </circle>
  );
}

/* ---------------------------------------------------------------- MORA */

// A ontologia: os três nós em y = 120 são o caminho da consulta.
const ONTOLOGY = {
  entry: [205, 120],
  a: [232, 72],
  hub: [250, 120],
  b: [232, 168],
  c: [274, 46],
  exit: [295, 120],
  d: [274, 194],
};

const ONTOLOGY_EDGES = [
  ["entry", "a"],
  ["entry", "b"],
  ["a", "c"],
  ["a", "hub"],
  ["b", "hub"],
  ["c", "exit"],
  ["b", "d"],
  ["d", "exit"],
];

export function MoraDiagram({ show }) {
  return (
    <Canvas show={show}>
      {(live) => (
        <>
          {/* a pergunta abre em leque para os agentes, que conversam entre si
              e fecham na consulta à ontologia */}
          <path
            d="M56 120C100 120 100 70 144 70M56 120H144M56 120C100 120 100 170 144 170"
            className={SOFT}
          />
          <path d="M150 76V114M150 126V164" className={FAINT} />
          <path d="M156 70C185 70 180 120 200 120M156 170C185 170 180 120 200 120" className={SOFT} />

          {ONTOLOGY_EDGES.map(([from, to]) => {
            const [x1, y1] = ONTOLOGY[from];
            const [x2, y2] = ONTOLOGY[to];
            return <line key={from + to} x1={x1} y1={y1} x2={x2} y2={y2} className={FAINT} />;
          })}

          {/* o ponto do projeto: a resposta sai da ontologia, não do modelo */}
          <path d="M156 120H344" className={SIGNAL} strokeWidth="1.5" />

          <rect x="44" y="114" width="12" height="12" className={NODE} />
          {[70, 120, 170].map((y) => (
            <circle key={y} cx="150" cy={y} r="6" className={NODE} />
          ))}
          {Object.entries(ONTOLOGY).map(([key, [cx, cy]]) => (
            <circle
              key={key}
              cx={cx}
              cy={cy}
              r={cy === 120 ? 4.5 : 3.5}
              className={cy === 120 ? NODE_SIGNAL : NODE_SOFT}
            />
          ))}
          <rect x="344" y="114" width="12" height="12" className="fill-accent-soft" />

          {live && <Pulse path="M56 120H344" />}
        </>
      )}
    </Canvas>
  );
}

/* ----------------------------------------------------------- Pneumonia */

const COLS = 10;
const ROWS = 12;
const PITCH = 8;
const CELL = 7;
const X0 = 11;
const Y0 = 73;

// Consolidação no terço inferior de um pulmão: na radiografia, mancha clara
// onde deveria haver ar.
const LESION = new Set(["2,7", "3,7", "2,8", "3,8", "3,6"]);

// Radiografia em baixa resolução: ar é escuro, osso e partes moles são claros.
function shade(c, r) {
  const u = (c + 0.5) / COLS;
  const v = (r + 0.5) / ROWS;
  // parede do tórax: sem ela os pulmões vazam para a borda e somem
  if (u < 0.1 || u > 0.9) return v < 0.15 ? 0.05 : 0.3;
  if (Math.abs(u - 0.5) < 0.1) return 0.75; // coluna e mediastino
  const inLung = (cx) => ((u - cx) / 0.17) ** 2 + ((v - 0.52) / 0.33) ** 2 < 1;
  if (inLung(0.3) || inLung(0.7)) return r % 2 ? 0.08 : 0.16; // a alternância sugere as costelas
  return v > 0.86 ? 0.55 : 0.42; // abaixo do diafragma fica mais denso
}

const XRAY = Array.from({ length: COLS * ROWS }, (_, i) => {
  const c = i % COLS;
  const r = Math.floor(i / COLS);
  return {
    key: i,
    x: X0 + c * PITCH,
    y: Y0 + r * PITCH,
    lesion: LESION.has(`${c},${r}`),
    shade: shade(c, r),
  };
});

// Janela 3×3 da convolução: varre a imagem e para um tempo sobre a lesão.
const KERNEL = 3 * PITCH + 1;
const KERNEL_REST = [2, 6];
const KERNEL_PATH = [
  ...[2, 5, 8].flatMap((r) => [1, 3, 5, 7].map((c) => [c, r])),
  ...Array(4).fill(KERNEL_REST),
];
const kernelX = ([c]) => X0 + c * PITCH - 1;
const kernelY = ([, r]) => Y0 + r * PITCH - 1;
const KX = KERNEL_PATH.map(kernelX);
const KY = KERNEL_PATH.map(kernelY);

// ponto na face da primeira pilha onde a janela projeta
const FACE = [118, 112];

const VECTOR_Y = [64, 78, 92, 106, 120, 134, 148, 162, 176];

// Pilha de mapas de atributos, desenhada de trás para a frente para cada
// lâmina tapar a de trás.
function Maps({ x, y, w, h, count, step }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => count - 1 - i).map((i) => (
        <rect
          key={i}
          x={x + i * step}
          y={y - i * step}
          width={w}
          height={h}
          className={i === 0 ? NODE : NODE_SOFT}
        />
      ))}
    </>
  );
}

function Kernel({ live }) {
  const x = kernelX(KERNEL_REST);
  const y = kernelY(KERNEL_REST);

  const step = (attr, values) =>
    live && (
      <animate
        attributeName={attr}
        values={values.join(";")}
        dur="4.8s"
        calcMode="discrete"
        repeatCount="indefinite"
      />
    );

  return (
    <>
      <line x1={x + KERNEL} y1={y} x2={FACE[0]} y2={FACE[1]} className={FAINT}>
        {step("x1", KX.map((v) => v + KERNEL))}
        {step("y1", KY)}
      </line>
      <line x1={x + KERNEL} y1={y + KERNEL} x2={FACE[0]} y2={FACE[1]} className={FAINT}>
        {step("x1", KX.map((v) => v + KERNEL))}
        {step("y1", KY.map((v) => v + KERNEL))}
      </line>
      <rect x={x} y={y} width={KERNEL} height={KERNEL} className={SIGNAL}>
        {step("x", KX)}
        {step("y", KY)}
      </rect>
      <circle cx={FACE[0]} cy={FACE[1]} r="2" className="fill-accent-soft" />
    </>
  );
}

const OUTPUT_LABELS = [
  { text: "Normal", x: 350, y: 80 },
  { text: "Pneumonia", x: 350, y: 160, below: true },
];

export function PneumoniaDiagram({ show }) {
  return (
    <Canvas show={show} labels={OUTPUT_LABELS}>
      {(live) => (
        <>
          {XRAY.map((cell) => (
            <rect
              key={cell.key}
              x={cell.x}
              y={cell.y}
              width={CELL}
              height={CELL}
              className={cell.lesion ? "fill-accent-soft" : "fill-[var(--fg)]"}
              fillOpacity={cell.lesion ? 0.9 : cell.shade}
            />
          ))}

          {/* projeções entre as etapas */}
          <path d="M141 63L152 94M141 147L152 146" className={FAINT} strokeDasharray="2 3" />
          <path d="M182 74L246 64M182 126L246 176" className={FAINT} strokeDasharray="2 3" />

          <Maps x={110} y={78} w={16} h={84} count={4} step={5} />
          <Maps x={152} y={94} w={10} h={52} count={6} step={4} />
          <Kernel live={live} />

          {/* camada densa: todo atributo liga nas duas saídas */}
          {VECTOR_Y.map((y) => (
            <line key={`n${y}`} x1="253" y1={y} x2="345" y2="92" className="stroke-[var(--rule)]" />
          ))}
          {VECTOR_Y.map((y) => (
            <line key={`p${y}`} x1="253" y1={y} x2="345" y2="148" className="stroke-accent-soft/40" />
          ))}

          {VECTOR_Y.map((y) => (
            <circle key={y} cx="250" cy={y} r="3" className={NODE_SOFT} />
          ))}
          {/* ativações acendendo fora de ordem; o begin espalha as fases */}
          {live &&
            VECTOR_Y.map((y, i) => (
              <circle key={`a${y}`} cx="250" cy={y} r="1.6" opacity="0" className="fill-[var(--fg)]">
                <animate
                  attributeName="opacity"
                  values="0;0.9;0"
                  dur="1.6s"
                  begin={`${((i * 0.37) % 1.6).toFixed(2)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

          <circle cx="350" cy="92" r="5" className={NODE_SOFT} />
          <circle cx="350" cy="148" r="9" className="fill-none stroke-accent-soft/40" />
          <circle cx="350" cy="148" r="5" className="fill-accent-soft" />
          {live && (
            <circle cx="350" cy="148" r="5" className="fill-none stroke-accent-soft">
              <animate attributeName="r" values="5;16" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </>
      )}
    </Canvas>
  );
}
