# Portfólio — Mendes

React 19 + Vite + Tailwind v4 + Motion (framer-motion v12) + Lenis.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Onde mexer

Todo o conteúdo (nome, ficha técnica, projetos, stack, trajetória, redes) fica
em **`src/data/site.js`**. Não tem texto solto dentro de componente.

Para adicionar um projeto: um objeto novo no array `projects`. Se preencher
`image` (caminho dentro de `public/`), o preview do índice usa a imagem; se
deixar `null`, cai num bloco de cor com o nome do projeto. Se preencher `href`,
a linha vira link.

## A ideia do design

Índice suíço: grid rígido, fios de 1px, metadados em monoespaçada, uma cor de
destaque (`--color-accent`, violeta) e nada mais. Duas ideias de movimento, só:

1. **Hero** — o nome revelado letra a letra por trás de uma máscara. É
   `position: fixed` e não rola; o conteúdo passa por cima dele, e o espaço de
   rolagem do hero é o `margin-top: 100vh` de `<Intro />`. O fio preto no topo
   dessa folha é o que faz o conteúdo ler como papel deslizando.

2. **Índice de projetos** — nada de card. Cada linha tem duas alturas: em cima
   número, título, disciplina e ano; embaixo o resumo (em caixa normal, é
   frase) e função + stack. No hover a linha ativa fica preta, **as outras
   apagam para 25%**, o número e o fio viram violeta, e o card do projeto
   **segue o cursor** com atraso de mola, entrando por uma revelação de
   `clip-path`. Ao entrar na tela, cada linha revela o título letra a letra e
   desenha o próprio fio da esquerda para a direita, em cascata.

   Duas decisões que parecem detalhe e não são: **nada muda de altura no
   hover** (linha que cresce empurra as de baixo, o cursor cai fora dela e o
   estado pisca), e o card é **deslocado do cursor**, não centrado nele —
   centrado, ele tapa justamente o título que a pessoa está apontando.

O resto (Sobre, Stack, Contato) é grid suíço puro: rótulo na coluna estreita,
conteúdo na larga, separados por fio. Contato e rodapé são um bloco preto.

### A navbar

Duas coisas resolvem a legibilidade e se complementam:

- **`mix-blend-mode: difference`** — o conteúdo da navbar é sempre branco e o
  blend inverte o que estiver por baixo. Sobre branco lê preto, sobre preto lê
  branco, e sobre um título preto no meio de fundo branco cada pedaço da letra
  se inverte sozinho. Nunca existe navbar da mesma cor do que passa atrás, e
  não precisa de barra opaca cobrindo o conteúdo. Por isso o logo é a variante
  **branca**: `difference` com preto devolve o próprio fundo — ele sumiria.
- **Sai de cena ao descer, volta ao subir.** Contraste garantido é uma coisa;
  não disputar espaço com o texto que a pessoa está lendo é outra.

Corolário: nada que passe por baixo da navbar pode ser colorido, ou o blend
devolve a cor complementar. É por isso que o preview do índice sem imagem é um
bloco **preto** e não violeta — o violeta fica nos fios e nos hovers.

### Detalhe que custou caro

No `HoverPreview`, o `jump()` que planta a imagem onde o cursor já está tem que
ser chamado **na mola**, não no valor de origem. Mexer na origem é exatamente o
que faz a mola *animar* até lá — e ela vem arrastando desde o canto da tela.

## Estrutura

```
src/
  data/site.js            conteúdo
  hooks/
    useLenis.js           smooth scroll + scrollTo dos links da nav
    useSectionTheme.js    diz se a navbar está sobre fundo claro ou escuro
  components/
    ui/SplitText.jsx      revelação letra a letra (hero)
    ui/RollText.jsx       texto que rola no hover
    ui/Reveal.jsx         entrada padrão das seções
    Hero/                 nome fixo + função + edição
    Intro/                fio do topo, ficha técnica, frase de abertura
    Work/                 índice de projetos + preview que segue o cursor
    About/ Stack/ Contact/ Navbar Footer Cursor
```

Cada seção se declara com `data-nav-theme="light|dark"`; a navbar inverte de
cor sozinha a partir disso, sem número mágico de scroll.

## Acessibilidade

`prefers-reduced-motion` desliga smooth scroll, cursor customizado, o preview
que segue o mouse e todas as animações de transform. O `SplitText` expõe o
texto inteiro via `aria-label` e esconde as letras individuais do leitor de
tela. O índice funciona sem hover: em touch as linhas são só linhas.
