// Todo o conteúdo do site. Editar aqui, não nos componentes.

export const profile = {
  name: "Mendes",
  role: "Pesquisador",
  edition: "Portfólio 2026",
  email: "joao.mendeslira@upe.br",
  location: "Pernambuco, Brasil",
  availability: "Aberto a colaborações",
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
  { label: "Foco", value: "IA aplicada à saúde" },
  { label: "Formação", value: "Mestrando, UPE" },
];

// href é null nos sistemas internos de cliente, que não têm link público.
//
// TODO: revisar a stack dos sistemas de gestão quando chegar a pasta freelancer
// (o currículo cita JS, TS e PHP na Tábula, mas não diz o que foi usado em cada).
// TODO: image está null em todos — falta um print por projeto.
export const projects = [
  {
    slug: "mora",
    title: "MORA",
    discipline: "Sistema multiagente",
    year: "2025",
    summary:
      "O profissional de saúde pergunta em português sobre casos de tuberculose e os agentes traduzem a pergunta em consulta à ontologia. A resposta sai de lá, não do modelo de linguagem.",
    role: "Pesquisa e código",
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
      "Redes convolucionais para identificar pneumonia em radiografias de tórax. Começou como trabalho de conclusão e saiu publicado no Caderno Pedagógico 22.5.",
    role: "Autor",
    stack: ["Python", "PyTorch", "TensorFlow"],
    href: "https://doi.org/10.54033/cadpedv22n5-258",
    image: null,
  },
  {
    slug: "erp-textil",
    title: "ERP Têxtil",
    discipline: "Sistema de gestão",
    year: "2024",
    summary:
      "Acompanha a produção têxtil da compra da matéria-prima até a venda, incluindo tecelagem e tingimento feitos fora. Cada lote carrega o próprio rastreio, custo acumulado e perda.",
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
      "Fretes, pagamentos e relatórios financeiros de uma transportadora e de duas unidades fabris. Mostra o custo de cada rota e o histórico de pagamento sem precisar abrir planilha.",
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
      "Catálogo virtual em que o cliente monta e envia o pedido sozinho. Quem vende fica com um painel para editar o catálogo, acompanhar os pedidos e tirar relatórios.",
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
      "Gestão interna de uma confecção. Registra produção e mão de obra por atividade, e é desse registro que sai o pagamento de cada etapa.",
    role: "Full-stack",
    stack: ["JavaScript", "PHP"],
    href: null,
    image: null,
  },
];

// [0] abre a página (Intro), [1] é o texto da seção Sobre.
export const statement = [
  "Faço pesquisa em aprendizado de máquina aplicado à saúde. Antes disso passei dois anos escrevendo sistemas que precisavam funcionar todo dia.",
  "No mestrado trabalho com representação de conhecimento e sistemas multiagente aplicados à vigilância de tuberculose. O que me prende no assunto é a garantia: o profissional pergunta em português e a resposta tem que vir de uma base formal, não de um chute bem escrito do modelo. Antes da pesquisa passei dois anos entregando sistemas de gestão para clientes reais, o que me deixou impaciente com protótipo que só roda no notebook do autor.",
];

export const experience = [
  {
    role: "Mestrado em Engenharia da Computação",
    company: "Universidade de Pernambuco",
    period: "2025 · Hoje",
  },
  {
    role: "Desenvolvedor Web",
    company: "Tábula Digital",
    period: "2023 · 2024",
  },
  {
    role: "Bacharelado em Sistemas de Informação",
    company: "Universidade de Pernambuco",
    period: "2021 · 2024",
  },
];

export const stack = [
  {
    group: "Aprendizado de máquina",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Matplotlib"],
  },
  { group: "Agentes e ontologia", items: ["LangGraph", "Owlready2", "Flask"] },
  { group: "Linguagem", items: ["Python", "JavaScript", "TypeScript", "PHP", "C"] },
  { group: "Dados", items: ["PostgreSQL", "SQL Server", "MongoDB"] },
  { group: "Interface", items: ["React", "Next.js", "Tailwind", "Bootstrap", "Vite"] },
  { group: "Servidor", items: ["Node.js", "Express", "REST"] },
  { group: "Ferramenta", items: ["Git", "Postman", "Insomnia"] },
];

export const socials = [
  // usuário correto é jmendes-victor (o do remote); PK-John é só o git local e dá 404
  { label: "GitHub", href: "https://github.com/jmendes-victor" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jmendesvictor" },
];
