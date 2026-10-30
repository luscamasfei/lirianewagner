import { whatsappUrl } from "../data/site.mjs";
import { esc, picture, largestJpg, icons } from "./helpers.mjs";

const sizesFor = (span) =>
  ({
    full: "(min-width: 64em) 92vw, 100vw",
    wide: "(min-width: 64em) 62vw, 100vw",
    half: "(min-width: 64em) 46vw, 100vw",
    third: "(min-width: 64em) 30vw, 100vw",
    tall: "(min-width: 64em) 36vw, 100vw",
  })[span] || "100vw";

function figure(item, base, group) {
  return `<figure class="plate plate--${item.span} plate--${item.kind}" data-reveal>
    <a class="plate__link" href="${largestJpg(item.img, base)}" data-lightbox="${group}" data-caption="${esc(item.caption)}" aria-label="Ampliar: ${esc(item.caption)}">
      ${picture(item.img, { base, alt: item.alt, sizes: sizesFor(item.span) })}
      <span class="plate__zoom" aria-hidden="true">${icons.expand}</span>
    </a>
    <figcaption>${esc(item.caption)}</figcaption>
  </figure>`;
}

export function projectPage(p, { index, prev, next, base }) {
  const n = String(index + 1).padStart(2, "0");
  const message = `Olá, Liriane! Vi o projeto ${p.title} no seu portfólio e gostaria de conversar sobre um projeto.`;
  const facts = [
    ["Categoria", p.category],
    ["Contexto", `${p.context}${p.contextDetail ? ` · ${p.contextDetail}` : ""}`],
    p.role && ["Minha participação", p.role],
    p.advisors && ["Orientação", p.advisors],
    ["Local", p.location],
    p.area && ["Área", p.area],
    ["Ano", String(p.year)],
    ["Ferramentas", p.tools.join(", ")],
  ].filter(Boolean);
  const lead = p.gallery.find((g) => g.img === p.hero) || p.gallery[0];
  const rest = p.gallery.filter((g) => g !== lead);
  const portrait = p.gallery.find((g) => g.span === "tall" && g.kind === "render");

  return `<main id="conteudo" class="project">
  <section class="hero hero--project" aria-labelledby="project-title" data-hero>
    <div class="hero__media" data-intro="media">
      ${picture(lead.img, { base, alt: lead.alt, sizes: "100vw", priority: true, className: "hero__picture", style: `view-transition-name: pj-${p.slug}`, mobile: portrait ? portrait.img : "" })}
      <span class="hero__scrim" aria-hidden="true"></span>
    </div>
    <div class="hero__content wrap" data-hero-content>
      <nav class="crumbs" aria-label="Você está em" data-intro="1">
        <a href="${base}#projetos">Projetos</a><span aria-hidden="true">/</span><span aria-current="page">${esc(p.title)}</span>
      </nav>
      <div class="project__title-row">
        <span class="project__n" aria-hidden="true" data-intro="2">${n}</span>
        <div>
          <p class="hero__eyebrow" data-intro="2"><span>${esc(p.kicker)}</span><span class="hero__eyebrow-sep" aria-hidden="true"></span><span>${esc(p.context)}</span></p>
          <h1 id="project-title" class="project__title" data-intro="3">${esc(p.title)}</h1>
        </div>
      </div>
    </div>
    <div class="hero__bar wrap" data-intro="5">
      <a class="hero__scroll" href="#sobre-o-projeto"><span class="hero__scroll-line" aria-hidden="true"></span><span>Sobre o projeto</span></a>
      <a class="hero__zoom" href="${largestJpg(lead.img, base)}" data-lightbox="galeria" data-caption="${esc(lead.caption)}">${icons.expand}<span>Ampliar imagem</span></a>
    </div>
  </section>

  <div class="project__facts wrap" id="sobre-o-projeto">
    <p class="project__image-note">As imagens de apresentação são representações digitais do projeto.</p>
    <dl class="ficha" data-reveal aria-label="Ficha técnica">
      ${facts.map(([k, v]) => `<div class="ficha__row${v.length > 34 ? " ficha__row--wide" : ""}"><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}
    </dl>
  </div>

  <section class="project__story wrap" aria-label="Sobre o projeto">
    <p class="project__concept" data-reveal>${esc(p.concept)}</p>
    <div class="project__cols">
      <div data-reveal>
        <h2 class="label">O desafio</h2>
        <p>${esc(p.challenge)}</p>
      </div>
      <div data-reveal>
        <h2 class="label">Soluções adotadas</h2>
        <ul class="ticks">${p.solutions.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>
      <div data-reveal>
        <h2 class="label">Materiais e acabamentos</h2>
        <ul class="tags">${p.materials.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
      </div>
    </div>
  </section>

  ${rest.length ? `<section class="gallery wrap" aria-label="Galeria de imagens">${rest.map((g) => figure(g, base, "galeria")).join("")}</section>` : ""}

  ${
    p.drawings.length
      ? `<section class="drawings" aria-labelledby="desenhos-title">
    <div class="wrap">
      <header class="drawings__head">
        <p class="label" data-reveal>Desenhos técnicos</p>
        <h2 id="desenhos-title" class="display display--sm" data-reveal>Do conceito à prancha.</h2>
      </header>
      <div class="gallery">${p.drawings.map((g) => figure(g, base, "galeria")).join("")}</div>
    </div>
  </section>`
      : ""
  }

  <aside class="project__cta wrap" aria-label="Contato">
    <p class="project__cta-text" data-reveal>Gostou deste projeto? Vamos conversar sobre o seu.</p>
    <div data-reveal>
      <a class="btn btn--ink" href="${whatsappUrl(message)}" target="_blank" rel="noopener" data-wa>${icons.whatsapp}<span>Solicitar orçamento</span></a>
    </div>
  </aside>

  <nav class="pager" aria-label="Outros projetos">
    ${[["Projeto anterior", prev], ["Próximo projeto", next]]
      .map(
        ([label, q]) => `<a class="pager__item" href="${base}projetos/${q.slug}/">
      ${picture(q.cover, { base, alt: "", sizes: "(min-width: 48em) 50vw, 100vw" })}
      <span class="pager__text"><span class="label">${label}</span><span class="pager__title">${esc(q.title)}</span></span>
    </a>`
      )
      .join("")}
  </nav>
</main>`;
}
