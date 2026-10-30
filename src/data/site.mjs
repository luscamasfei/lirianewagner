// Informações profissionais confirmadas a partir de:
// - https://bio.site/arqlirianewagner (links, e-mail profissional, WhatsApp, retrato)
// - Portfólio 2025 no Behance (formação, experiência, projetos, premiação)
// Não adicione CAU, endereço, depoimentos ou registros sem confirmação da arquiteta.

export const site = {
  // Domínio definitivo do site, sem barra final (ex.: "https://www.seudominio.com.br").
  // Para um build sem domínio (SITE_URL= npm run build), o build omite URLs canônicas, og:url, sitemap.xml e a referência ao sitemap no robots.txt.
  url: process.env.SITE_URL ?? "https://lirianewagner.com.br",

  name: "Liriane Wagner",
  fullName: "Liriane de Jesus Wagner",
  role: "Arquiteta e Urbanista",
  tagline: "Arquitetura e Interiores",
  city: "Passo Fundo",
  region: "RS",
  lang: "pt-BR",

  description:
    "Liriane Wagner, arquiteta e urbanista em Passo Fundo, RS. Projetos de arquitetura residencial e comercial, design de interiores, reformas, projeto executivo, imagens realistas e projeto legal.",

  education: {
    degree: "Bacharelado em Arquitetura e Urbanismo",
    school: "Atitus Educação",
    year: 2024,
  },

  whatsapp: "5554991934315", // (54) 9 9193-4315 — confirmado no bio.site e no portfólio
  whatsappDisplay: "(54) 9 9193-4315",
  email: "lirianewagner.arq@gmail.com",

  social: [
    { label: "Instagram", handle: "@lirianewagner.arq", url: "https://www.instagram.com/lirianewagner.arq" },
    { label: "LinkedIn", handle: "in/lirianewagner", url: "https://www.linkedin.com/in/lirianewagner" },
    { label: "Behance", handle: "lirianewagner", url: "https://www.behance.net/lirianewagner" },
  ],

  // Formulário de orçamento já utilizado pela arquiteta (mantido como alternativa).
  quoteForm: "https://form.respondi.app/PpcsnSLx",
};

export const messages = {
  default: "Olá, Liriane! Conheci seu portfólio e gostaria de conversar sobre um projeto de arquitetura.",
  quote: "Olá, Liriane! Conheci seu portfólio e gostaria de solicitar um orçamento para o meu projeto.",
  interiors: "Olá, Liriane! Gostaria de saber mais sobre um projeto de interiores.",
};

export const whatsappUrl = (text = messages.default) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];
