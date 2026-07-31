// Conteúdo do site em um só lugar. Editar aqui, não nos componentes.

export const profile = {
  name: "Mendes",
  role: "Desenvolvedor",
  edition: "Portfólio 2026",
  email: "wjoaow2@gmail.com",
  location: "Brasil",
  availability: "Disponível para projetos",
};

// Fica entre fios no topo da folha de conteúdo, estilo ficha técnica.
export const facts = [
  { label: "Base", value: "Brasil" },
  { label: "Foco", value: "Front-end" },
  { label: "Status", value: "Disponível" },
];

// TODO(joão): trocar por projetos reais. `image` é opcional — sem ela o
// preview do índice cai num bloco tipográfico em vez de quebrar.
export const projects = [
  {
    slug: "avery",
    title: "Avery",
    discipline: "Web",
    year: "2025",
    summary: "Site institucional com narrativa de scroll contínua.",
    role: "Design & Código",
    stack: ["React", "Motion", "Tailwind"],
    href: null,
    image: null,
  },
  {
    slug: "bruce",
    title: "Bruce",
    discipline: "Aplicação",
    year: "2025",
    summary: "Painel em tempo real com estados de carregamento desenhados.",
    role: "Front-end",
    stack: ["React", "Vite", "WebSocket"],
    href: null,
    image: null,
  },
  {
    slug: "concrete",
    title: "Concrete",
    discipline: "Design System",
    year: "2024",
    summary: "Biblioteca de componentes do token ao Storybook.",
    role: "Arquitetura",
    stack: ["TypeScript", "Storybook"],
    href: null,
    image: null,
  },
  {
    slug: "davis",
    title: "Davis",
    discipline: "Interface",
    year: "2024",
    summary: "Produto full-stack, do schema à tela.",
    role: "Full-stack",
    stack: ["Next.js", "Postgres"],
    href: null,
    image: null,
  },
];

export const statement = [
  "Construo interface como quem constrói estrutura: o que aparece é consequência do que sustenta.",
  "Trabalho na fronteira entre design e engenharia — pego layout e transformo em código rápido, acessível e legível para quem vier depois. Animação, pra mim, não é enfeite: é o que explica ao usuário o que acabou de acontecer na tela.",
];

// TODO(joão): ajustar para a sua trajetória real.
export const experience = [
  { role: "Desenvolvedor Front-end", company: "Freelance", period: "2024 — Hoje" },
  { role: "Desenvolvedor Front-end", company: "Felinus", period: "2023 — 2024" },
  { role: "Estágio em Desenvolvimento", company: "—", period: "2022 — 2023" },
];

export const stack = [
  { group: "Linguagem", items: ["JavaScript", "TypeScript", "HTML", "CSS"] },
  { group: "Interface", items: ["React", "Next.js", "Tailwind", "Motion"] },
  { group: "Servidor", items: ["Node.js", "Express", "Postgres"] },
  { group: "Ferramenta", items: ["Vite", "Git", "Figma", "Vercel"] },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/PK-John" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];
