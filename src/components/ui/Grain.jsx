// Textura de grão sobre a página inteira.
//
// O ruído é um feTurbulence em data URI (~200 bytes) em vez de um PNG, e por ser
// vetor não perde definição em tela retina.
//
// Fica em z-30: acima do conteúdo (z-10) e abaixo dos trilhos (z-40). Se passar
// dos trilhos, o multiply come o branco dos rótulos na seção escura.
const NOISE = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#n)"/>
</svg>`;

export default function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 opacity-[0.16] mix-blend-multiply"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE)}")`,
        backgroundSize: "160px 160px",
      }}
    />
  );
}
