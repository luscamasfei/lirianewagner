import { site, nav, whatsappUrl, messages } from "../data/site.mjs";
import { esc, icons } from "./helpers.mjs";

const abs = (path) => (site.url ? `${site.url}/${path}`.replace(/([^:])\/{2,}/g, "$1/") : "");

export function head({ title, description, path = "", base = "", ogImage = "img/og-image.jpg", ogType = "website", jsonLd = [], preload = "" }) {
  const canonical = abs(path);
  const ogImg = site.url ? abs(ogImage) : `${base}${ogImage}`;
  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(site.name)}">
<meta name="theme-color" content="#f3eee6">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ""}
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${esc(site.name)} — ${esc(site.tagline)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${canonical ? `<meta property="og:url" content="${esc(canonical)}">` : ""}
<meta property="og:image" content="${esc(ogImg)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${base}assets/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${base}assets/favicon-180.png">
<link rel="preload" href="${base}assets/fonts/instrument-serif-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/hanken-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<link rel="stylesheet" href="${base}assets/css/main.css">
<script>document.documentElement.classList.add("js")</script>
${jsonLd.map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`).join("\n")}
</head>`;
}

/** Logo oficial (arquivo fornecido pela cliente), em versão escura e clara — sem alterações de desenho. */
export const logo = (base, variant, className = "", width = 240) =>
  `<picture class="logo logo--${variant} ${className}"><source type="image/webp" srcset="${base}assets/brand/logo-${variant}-480.webp 480w, ${base}assets/brand/logo-${variant}-960.webp 960w" sizes="${width}px"><img src="${base}assets/brand/logo-${variant}-480.png" srcset="${base}assets/brand/logo-${variant}-480.png 480w, ${base}assets/brand/logo-${variant}-960.png 960w" sizes="${width}px" width="960" height="516" alt=""></picture>`;

export function header({ base = "", current = "", overlay = false } = {}) {
  const home = base || "./";
  const link = (href) => (base ? `${base}${href}` : href);
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header"${overlay ? " data-overlay" : ""} data-header>
  <div class="site-header__inner">
    <a class="brand" href="${home}" aria-label="${esc(site.name)} — arquitetura e interiores, página inicial">
      ${logo(base, "dark", "brand__logo brand__logo--dark", 120)}
      ${logo(base, "light", "brand__logo brand__logo--light", 120)}
    </a>
    <nav class="site-nav" id="site-nav" aria-label="Principal" data-nav>
      <ul class="site-nav__list">
        ${nav.map((n, i) => `<li><a href="${link(n.href)}"${current === n.href ? ' aria-current="page"' : ""}><span class="site-nav__n">0${i + 1}</span>${n.label}</a></li>`).join("")}
      </ul>
      <a class="site-nav__cta" href="${whatsappUrl(messages.default)}" target="_blank" rel="noopener" data-wa>
        ${icons.whatsapp}<span>Fale comigo</span>
      </a>
      <p class="site-nav__meta">${esc(site.role)} · ${esc(site.city)}, ${esc(site.region)}</p>
    </nav>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
      <span class="nav-toggle__label">Menu</span>
      <span class="nav-toggle__lines" aria-hidden="true"><span></span><span></span></span>
    </button>
  </div>
</header>`;
}

export function footer({ base = "" } = {}) {
  const link = (href) => (base ? `${base}${href}` : href);
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="site-footer__grid wrap">
    <div class="site-footer__id">
      ${logo(base, "light", "site-footer__logo", 220)}
      <p class="site-footer__name">${esc(site.fullName)}</p>
      <p class="site-footer__role">${esc(site.role)}<br>${esc(site.education.degree)}, ${esc(site.education.school)}</p>
    </div>
    <nav class="site-footer__col" aria-label="Seções">
      <p class="label">Navegação</p>
      <ul>${nav.map((n) => `<li><a href="${link(n.href)}">${n.label}</a></li>`).join("")}</ul>
    </nav>
    <div class="site-footer__col">
      <p class="label">Redes</p>
      <ul>${site.social.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join("")}</ul>
    </div>
    <div class="site-footer__col">
      <p class="label">Contato</p>
      <ul>
        <li><a href="${whatsappUrl(messages.default)}" target="_blank" rel="noopener" data-wa>WhatsApp ${esc(site.whatsappDisplay)}</a></li>
        <li><a href="mailto:${site.email}">${site.email}</a></li>
        <li>${esc(site.city)}, ${esc(site.region)}</li>
      </ul>
    </div>
  </div>
  <div class="site-footer__base wrap">
    <p>© ${year} ${esc(site.fullName)}</p>
    <p>Imagens: portfólio profissional e acadêmico da arquiteta.</p>
  </div>
</footer>
<a class="wa-float" href="${whatsappUrl(messages.default)}" target="_blank" rel="noopener" data-wa data-wa-float aria-label="Conversar com Liriane pelo WhatsApp">
  ${icons.whatsapp}<span class="wa-float__label">Conversar</span>
</a>`;
}

export function lightbox() {
  return `<dialog class="lightbox" data-lightbox-dialog aria-label="Imagem ampliada">
  <div class="lightbox__stage" data-lightbox-stage>
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="" data-lightbox-img>
      <figcaption class="lightbox__caption"><span data-lightbox-caption></span><span class="lightbox__count" data-lightbox-count></span></figcaption>
    </figure>
  </div>
  <button class="lightbox__btn lightbox__close" type="button" data-lightbox-close aria-label="Fechar">${icons.close}</button>
  <button class="lightbox__btn lightbox__prev" type="button" data-lightbox-prev aria-label="Imagem anterior">${icons.prev}</button>
  <button class="lightbox__btn lightbox__next" type="button" data-lightbox-next aria-label="Próxima imagem">${icons.next}</button>
</dialog>`;
}

export const scripts = (base = "") => `<script src="${base}assets/js/main.js" defer></script>`;
