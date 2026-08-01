// Conteúdo do site em um só lugar. Editar aqui, não nos componentes.

export const profile = {
  name: "Mendes",
  role: "Desenvolvedor",
  edition: "Portfólio 2026",
  // Do currículo. O site tinha wjoaow2@gmail.com — confirmar qual dos dois é o
  // contato profissional antes de publicar.
  email: "jonh_victor@outlook.com",
  location: "Pernambuco, Brasil",
  availability: "Disponível para projetos",
};

// Ordem de leitura da página. Alimenta os trilhos de margem (rótulo rotacionado
// + contador). O hero fica de fora de propósito: ele é `position: fixed`, não
// participa do fluxo, e contá-lo faria o contador nascer em 01 de 06 e nunca
// sair de lá enquanto a folha não subisse.
export const sections = [
  { id: "intro", label: "Abertura" },
  { id: "projetos", label: "Projetos" },
  { id: "sobre", label: "Sobre" },
  { id: "stack", label: "Stack" },
  { id: "contato", label: "Contato" },
];

// Fica entre fios no topo da folha de conteúdo, estilo ficha técnica.
export const facts = [
  { label: "Base", value: "Pernambuco" },
  { label: "Foco", value: "Sistemas web & IA" },
  { label: "Formação", value: "Mestrando — UPE" },
];

// Os quatro primeiros vêm do currículo — sistemas em produção, com cliente
// real. Os dois últimos são o lado de pesquisa: um publicado, outro no GitHub.
//
// TODO(joão): a `stack` dos sistemas de gestão está incompleta — o currículo
// cita JavaScript, TypeScript e PHP no período da Tábula, mas não diz o que foi
// usado em qual. Ajustar quando chegar a pasta `freelancer`.
//
// TODO(joão): `image` está null em todos. É o maior buraco da página: o índice
// é o coração do portfólio e hoje é só tipografia. Um print por projeto já
// resolve — o <HoverPreview /> já sabe exibir.
//
// `href` fica null onde o sistema é interno de cliente e não tem link público.
export const projects = [
  {
    slug: "erp-textil",
    title: "ERP Têxtil",
    discipline: "Sistema de gestão",
    year: "2024",
    summary:
      "Cadeia têxtil inteira em um sistema: da compra de matéria-prima à venda, passando por tecelagem e tingimento terceirizados. Rastreabilidade por lote, custo acumulado calculado a cada etapa e controle de perda.",
    role: "Full-stack",
    stack: ["JavaScript", "PostgreSQL"],
    href: null,
    image: null,
  },
  {
    slug: "controle-fretes",
    title: "Controle de fretes",
    discipline: "Sistema de gestão",
    year: "2024",
    summary:
      "Fretes, pagamentos e relatórios financeiros para uma transportadora, uma fábrica e uma unidade fabril. Reduziu o tempo de análise e deu rastreabilidade ao custo logístico.",
    role: "Full-stack",
    stack: ["JavaScript", "PostgreSQL"],
    href: null,
    image: null,
  },
  {
    slug: "catalogo-pedidos",
    title: "Catálogo e pedidos",
    discipline: "Plataforma",
    year: "2024",
    summary:
      "Catálogo virtual onde o cliente monta e envia o pedido pela própria plataforma. Do outro lado, painel de gestão do catálogo, acompanhamento de pedidos e relatórios.",
    role: "Full-stack",
    stack: ["JavaScript", "PostgreSQL"],
    href: null,
    image: null,
  },
  {
    slug: "gestao-oficina",
    title: "Gestão de oficina",
    discipline: "Sistema de gestão",
    year: "2023",
    summary:
      "Gestão interna de uma confecção: pagamento por atividade, registro de produção e mão de obra, com relatório próprio para cada etapa.",
    role: "Full-stack",
    stack: ["JavaScript", "PHP"],
    href: null,
    image: null,
  },
  {
    slug: "mora",
    title: "MORA",
    discipline: "Sistema multiagente",
    year: "2025",
    summary:
      "Vigilância de tuberculose onde o profissional de saúde pergunta em português e agentes traduzem para consulta ontológica, com a resposta ancorada na ontologia.",
    role: "Pesquisa & Código",
    stack: ["Python", "LangGraph", "Owlready2", "Flask"],
    href: "https://github.com/jmendes-victor/MORA",
    image: null,
  },
  {
    slug: "pneumonia-cnn",
    title: "Pneumonia por raio-X",
    discipline: "Pesquisa publicada",
    year: "2025",
    summary:
      "Redes neurais convolucionais para detecção automatizada de pneumonia em radiografias torácicas. Trabalho de conclusão, publicado no Caderno Pedagógico 22.5.",
    role: "Autor",
    stack: ["Python", "PyTorch", "TensorFlow"],
    href: "https://doi.org/10.54033/cadpedv22n5-258",
    image: null,
  },
];

// Reescrito a partir do resumo do currículo: sistema de gestão em produção de
// um lado, pesquisa aplicada de outro. A versão anterior vendia só front-end e
// deixava metade do trabalho de fora.
export const statement = [
  // Concreto de propósito: os três verbos do meio são o que os sistemas de
  // gestão da lista fazem de fato. A versão anterior falava em "estrutura" e
  // "consequência" — soava bem e não dizia nada.
  "Sistema bom não chama atenção. O pedido sai, o custo fecha, o lote se rastreia — e ninguém precisa saber o que acontece por baixo.",
  "Trabalho nas duas pontas — sistemas de gestão que rodam em produção, com rastreabilidade e custo calculado a cada etapa, e pesquisa aplicada em aprendizado de máquina. O que liga as duas é a mesma teimosia: entender o problema até o fim antes de escrever a primeira linha.",
];

export const experience = [
  {
    role: "Mestrado em Engenharia da Computação",
    company: "Universidade de Pernambuco",
    period: "2025 — Hoje",
  },
  {
    role: "Desenvolvedor Web",
    company: "Tábula Digital",
    period: "2023 — 2024",
  },
  {
    role: "Bacharelado em Sistemas de Informação",
    company: "Universidade de Pernambuco",
    period: "2021 — 2024",
  },
];

export const stack = [
  { group: "Linguagem", items: ["JavaScript", "TypeScript", "Python", "PHP", "C"] },
  { group: "Interface", items: ["React", "Next.js", "Tailwind", "Bootstrap", "Vite"] },
  { group: "Servidor", items: ["Node.js", "Express", "REST"] },
  { group: "Dados", items: ["PostgreSQL", "SQL Server", "MongoDB"] },
  {
    group: "Aprendizado de máquina",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Matplotlib"],
  },
  { group: "Ferramenta", items: ["Git", "Postman", "Insomnia"] },
];

export const socials = [
  // era /PK-John, que é o nome de usuário do git local e não existe no GitHub
  // (404). O remote do repositório aponta para jmendes-victor.
  { label: "GitHub", href: "https://github.com/jmendes-victor" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jmendesvictor" },
];
