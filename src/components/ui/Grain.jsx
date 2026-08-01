/**
 * Grão sobre a página inteira.
 *
 * É o que tira o branco do Tailwind da cara de "tela" e aproxima de papel. O
 * efeito só funciona enquanto ninguém percebe que ele existe — daí a opacidade
 * absurdamente baixa: a 0.22 já lê como textura, a 0.4 lê como sujeira.
 *
 * O ruído é um feTurbulence embutido como data URI, não um PNG: são ~200 bytes
 * contra dezenas de KB, e não some numa tela retina porque é vetor.
 *
 * Vive em z-30: acima do conteúdo (z-10) e abaixo dos trilhos (z-40). Por cima
 * deles o `multiply` comeria o branco dos rótulos justamente na seção escura,
 * que é onde eles mais precisam aparecer.
 */
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
