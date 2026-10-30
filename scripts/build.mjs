// Gera o site estático em dist/. Uso: npm run build  (SITE_URL=https://dominio npm run build)
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../src/data/site.mjs";
import { projects } from "../src/data/projects.mjs";
import { head, header, footer, lightbox, scripts } from "../src/templates/layout.mjs";
import { homePage } from "../src/templates/home.mjs";
import { projectPage } from "../src/templates/project.mjs";
import { largestJpg, contour } from "../src/templates/helpers.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(root, "dist");
const SRC = join(root, "src");

if (!existsSync(join(SRC, "img"))) throw new Error("Execute `npm run images` antes do build.");

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(SRC, "assets"), join(DIST, "assets"), { recursive: true });
cpSync(join(SRC, "img"), join(DIST, "img"), { recursive: true });

const write = (path, html) => {
  const file = join(DIST, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html.replace(/\n\s*\n/g, "\n"));
};
const absUrl = (path = "") => (site.url ? `${site.url}/${path}` : undefined);

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.fullName,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.email}`,
  telephone: `+${site.whatsapp}`,
  image: absUrl("img/retrato-983.jpg"),
  url: absUrl(),
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "BR" },
  alumniOf: { "@type": "CollegeOrUniversity", name: site.education.school },
  knowsAbout: ["Arquitetura residencial", "Arquitetura comercial", "Design de interiores", "Reformas", "Projeto executivo", "Modelagem 3D e renderização", "Projeto legal e regularização"],
  sameAs: site.social.map((s) => s.url),
};

/* Página inicial */
write(
  "index.html",
  `${head({
    title: `${site.name} — Arquiteta e Urbanista | Arquitetura e Interiores em ${site.city}, ${site.region}`,
    description: site.description,
    path: "",
    jsonLd: [person, { "@context": "https://schema.org", "@type": "WebSite", name: `${site.name} — ${site.tagline}`, url: absUrl(), inLanguage: site.lang }],
  })}
<body class="page-home">
${header({ overlay: true })}
${homePage()}
${footer()}
${scripts()}
</body>
</html>`
);

/* Páginas de projeto */
projects.forEach((p, index) => {
  const base = "../../";
  const path = `projetos/${p.slug}/`;
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    genre: p.category,
    description: p.summary,
    dateCreated: String(p.year),
    locationCreated: { "@type": "Place", name: p.location },
    creator: { "@type": "Person", name: site.name, jobTitle: site.role },
    image: absUrl(largestJpg(p.cover, "")),
    url: absUrl(path),
    inLanguage: site.lang,
  };
  const jsonLd = [creativeWork];
  if (site.url)
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: absUrl() },
        { "@type": "ListItem", position: 2, name: "Projetos", item: absUrl("#projetos") },
        { "@type": "ListItem", position: 3, name: p.title, item: absUrl(path) },
      ],
    });

  write(
    `${path}index.html`,
    `${head({
      title: `${p.title} — ${p.kicker} | ${site.name}, Arquiteta`,
      description: `${p.summary} ${p.context}, ${p.location}, ${p.year}.`,
      path,
      base,
      ogType: "article",
      ogImage: largestJpg(p.cover, "").replace(/-\d+\.jpg$/, "-1280.jpg"),
      jsonLd,
    })}
<body class="page-project">
${header({ base, overlay: true })}
${projectPage(p, { index, prev, next, base })}
${footer({ base })}
${lightbox()}
${scripts(base)}
</body>
</html>`
  );
});

/* 404 — usa caminhos absolutos a partir da raiz do domínio */
write(
  "404.html",
  `${head({ title: `Página não encontrada | ${site.name}`, description: site.description, base: "/" })}
<body class="page-404">
${header({ base: "/" })}
<main id="conteudo" class="notfound wrap">
  ${contour({ className: "contour notfound__contour", seed: 3 })}
  <p class="label">Erro 404</p>
  <h1 class="display">Este espaço <em>ainda não foi projetado.</em></h1>
  <p>A página que você procura não existe ou mudou de endereço.</p>
  <a class="btn btn--ink" href="/">Voltar ao início</a>
</main>
${footer({ base: "/" })}
${scripts("/")}
</body>
</html>`
);

/* Cabeçalhos do Cloudflare: o endereço provisório *.workers.dev não é indexado; imagens e fontes com cache longo */
writeFileSync(
  join(DIST, "_headers"),
  `https://lirianewagner.lirianewagner-portfolio.workers.dev/*
  X-Robots-Tag: noindex

/img/*
  Cache-Control: public, max-age=31536000, immutable

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
`
);

/* robots.txt e sitemap.xml */
writeFileSync(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n${site.url ? `\nSitemap: ${site.url}/sitemap.xml\n` : ""}`);
if (site.url) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ["", ...projects.map((p) => `projetos/${p.slug}/`)];
  writeFileSync(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${site.url}/${u}</loc><lastmod>${today}</lastmod><priority>${u ? "0.8" : "1.0"}</priority></url>`)
      .join("\n")}\n</urlset>\n`
  );
} else {
  console.warn("⚠  SITE_URL não definido: canonical, og:url e sitemap.xml foram omitidos.");
}

console.log(`✓ Site gerado em dist/ (${projects.length + 2} páginas)`);
