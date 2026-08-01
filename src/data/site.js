// Todo o conteúdo do site. Editar aqui, não nos componentes.

export const profile = {
  name: "Mendes",
  role: "Desenvolvedor",
  edition: "Portfólio 2026",
  // TODO: confirmar antes de publicar — o site usava wjoaow2@gmail.com
  email: "jonh_victor@outlook.com",
  location: "Pernambuco, Brasil",
  availability: "Disponível para projetos",
};

// Alimenta os trilhos de margem (rótulo + contador). O hero não entra: ele é
// position: fixed, está fora do fluxo, e o contador não conseguiria sair dele.
export const sections = [
  { id: "intro", label: "Abertura" },
  { id: "projetos", label: "Projetos" },
  { id: "sobre", label: "Sobre" },
  { id: "stack", label: "Stack" },
  { id: "contato", label: "Contato" },
];

// Ficha técnica no topo da abertura.
export const facts = [
  { label: "Base", value: "Pernambuco" },
  { label: "Foco", value: "Sistemas web & IA" },
  { label: "Formação", value: "Mestrando — UPE" },
];

// href é null nos sistemas internos de cliente, que não têm link público.
//
// TODO: revisar a stack dos sistemas de gestão quando chegar a pasta freelancer
// (o currículo cita JS, TS e PHP na Tábula, mas não diz o que foi usado em cada).
// TODO: image está null em todos — falta um print por projeto.
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

// [0] abre a página (Intro), [1] é o texto da seção Sobre.
export const statement = [
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
  // usuário correto é jmendes-victor (o do remote); PK-John é só o git local e dá 404
  { label: "GitHub", href: "https://github.com/jmendes-victor" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jmendesvictor" },
];
