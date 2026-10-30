import { site, whatsappUrl, messages } from "../data/site.mjs";
import { services, servicesNote, process } from "../data/services.mjs";
import { projects } from "../data/projects.mjs";
import { esc, picture, contour, icons } from "./helpers.mjs";

const wa = (text, label, cls = "btn btn--ink") =>
  `<a class="${cls}" href="${whatsappUrl(text)}" target="_blank" rel="noopener" data-wa>${icons.whatsapp}<span>${label}</span></a>`;

const pad = (n) => String(n).padStart(2, "0");
const href = (p) => `projetos/${p.slug}/`;
const vt = (p) => `view-transition-name: pj-${p.slug}`;

/* ---------- Hero ---------- */
function hero() {
  const caju = projects.find((p) => p.slug === "apartamento-caju");
  return `<section class="hero" aria-labelledby="hero-title" data-hero>
  <div class="hero__media" data-intro="media">
    ${picture("caju-panorama", { alt: "Estar, jantar e cozinha integrados do Apartamento Caju, com forro e painéis de madeira e luz natural", priority: true, sizes: "100vw", className: "hero__picture", style: vt(caju), mobile: "caju-vertical" })}
    <span class="hero__scrim" aria-hidden="true"></span>
  </div>
  <div class="hero__content wrap" data-hero-content>
    <p class="hero__eyebrow" data-intro="1"><span>Arquiteta e Urbanista</span><span class="hero__eyebrow-sep" aria-hidden="true"></span><span>Arquitetura e Interiores · ${esc(site.city)}, ${esc(site.region)}</span></p>
    <h1 id="hero-title" class="hero__title">
      <span class="hero__line" data-intro="2">Liriane <em>Wagner</em></span>
      <span class="hero__signature" data-intro="3">Da sua rotina ao desenho do espaço.</span>
    </h1>
    <div class="hero__foot">
      <p class="hero__lead" data-intro="4">Projetos residenciais, comerciais e de interiores em Passo Fundo, RS. Da primeira ideia ao detalhamento para a obra.</p>
      <div class="hero__actions" data-intro="5">
        <a class="btn btn--ivory" href="#projetos"><span>Explorar projetos</span>${icons.arrow}</a>
        <a class="link-cta link-cta--light" href="${whatsappUrl(messages.quote)}" target="_blank" rel="noopener" data-wa><span>Solicitar orçamento</span>${icons.arrow}</a>
      </div>
    </div>
  </div>
  <div class="hero__bar wrap" data-intro="6">
    <a class="hero__scroll" href="#projetos"><span class="hero__scroll-line" aria-hidden="true"></span><span>Projetos</span></a>
    <a class="hero__credit" href="${href(caju)}">
      <span class="hero__credit-n">01</span>
      <span><span class="hero__credit-t">${esc(caju.title)}, ${esc(caju.kicker.toLowerCase())}</span><span class="hero__credit-m">${esc(caju.context)} · ${esc(caju.client)} · ${caju.year}</span></span>
    </a>
  </div>
</section>`;
}

/* ---------- Projetos ---------- */
function projectsSection() {
  const selected = [...projects.filter((p) => !p.context.includes("acadêmico")), ...projects.filter((p) => p.context.includes("acadêmico"))];
  const years = projects.map((p) => p.year);
  return `<section id="projetos" class="projects" aria-labelledby="projetos-title">
  <header class="section-head wrap">
    <div class="section-head__main">
      <p class="label" data-reveal>Projetos selecionados · ${Math.min(...years)}—${Math.max(...years)}</p>
      <h2 id="projetos-title" class="display" data-reveal>Espaços, ideias<br>e suas soluções.</h2>
    </div>
    <div class="section-head__aside" data-reveal>
      <p>Interiores, arquitetura e requalificação. Uma seleção de trabalhos profissionais e acadêmicos, com imagens, desenhos e as decisões de cada projeto.</p>
    </div>
  </header>
  <div class="project-grid wrap">
    ${selected.map((p, i) => {
      const cover = p.slug === "residencial-onix" ? "onix-brinquedoteca" : p.cover;
      const alt = p.gallery.find((g) => g.img === cover)?.alt || p.title;
      return `<article id="projeto-${p.slug}" class="project-card${i === 0 ? " project-card--featured" : ""}" aria-labelledby="pj-title-${p.slug}" data-reveal>
      <a class="project-card__image" href="${href(p)}" aria-label="Ver projeto: ${esc(p.title)}">
        ${picture(cover, { alt, sizes: i === 0 ? "(min-width: 48em) 92vw, 100vw" : "(min-width: 48em) 44vw, 100vw" })}
        <span class="project-card__open" aria-hidden="true">${icons.arrow}</span>
      </a>
      <div class="project-card__body">
        <p class="project-card__meta"><span>${esc(p.context)}</span><span>${p.year}</span></p>
        <h3 id="pj-title-${p.slug}" class="project-card__title"><a href="${href(p)}">${esc(p.title)}</a></h3>
        <p class="project-card__category">${esc(p.kicker)}${p.client ? ` · ${esc(p.client)}` : ""}</p>
        <p class="project-card__summary">${esc(p.summary)}</p>
        <a class="link-cta" href="${href(p)}"><span>Conhecer o projeto</span>${icons.arrow}</a>
      </div>
    </article>`;
    }).join("\n")}
  </div>
</section>`;
}

/* ---------- Serviços ---------- */
function servicesSection() {
  return `<section id="servicos" class="services" aria-labelledby="servicos-title">
  <div class="services__grid wrap">
    <header class="services__head">
      <p class="label" data-reveal>Serviços</p>
      <h2 id="servicos-title" class="display" data-reveal>Do primeiro traço ao detalhe executivo.</h2>
      <p class="services__intro" data-reveal>Cada projeto começa com uma necessidade concreta. Encontre a sua e o tipo de projeto que responde a ela.</p>
    </header>
    <ol class="services__list">
      ${services
        .map(
          (s, i) => `<li class="service" data-reveal>
        <span class="service__n">${pad(i + 1)}</span>
        <div class="service__head">
          <h3 class="service__title">${esc(s.title)}</h3>
          <p class="service__scope">${esc(s.scope)}</p>
        </div>
        <div class="service__body">
          <p>${esc(s.benefit)}</p>
          <details class="service__details">
            <summary>Quando contratar</summary>
            <p>${esc(s.problem)}</p>
            <a class="link-cta link-cta--sm" href="${whatsappUrl(s.message)}" target="_blank" rel="noopener" data-wa><span>Conversar sobre este serviço</span>${icons.arrow}</a>
          </details>
        </div>
      </li>`
        )
        .join("")}
    </ol>
    <div class="services__foot" data-reveal>
      <p>${esc(servicesNote)}</p>
      <div class="services__foot-cta">
        <p class="services__foot-q">Não sabe qual serviço é o seu? Conte sua ideia.</p>
        ${wa(messages.quote, "Solicitar orçamento")}
      </div>
    </div>
  </div>
</section>`;
}

/* ---------- Sobre ---------- */
function aboutSection() {
  return `<section id="sobre" class="about" aria-labelledby="sobre-title">
  <div class="about__grid wrap">
    <figure class="about__portrait" data-reveal>
      ${contour({ className: "contour about__contour", seed: 5, lines: 28 })}
      ${picture("retrato", { alt: "Retrato de Liriane Wagner, arquiteta e urbanista, segurando um livro aberto", sizes: "(min-width: 64em) 34vw, 86vw" })}
      <figcaption><span class="label">Liriane de Jesus Wagner</span>${esc(site.role)}</figcaption>
    </figure>
    <div class="about__text">
      <p class="label" data-reveal>Sobre</p>
      <h2 id="sobre-title" class="display" data-reveal>Olá, sou a Liriane.</h2>
      <div class="about__prose" data-reveal>
        <p class="about__lead">Sou arquiteta e urbanista em Passo Fundo, formada pela Atitus Educação em 2024. Projeto casas, apartamentos e espaços de trabalho a partir de como as pessoas usam cada ambiente.</p>
        <p>Minha trajetória no desenvolvimento de projetos começou em 2021, durante a graduação, com atuação na Oblíqua Construtora. A experiência reúne arquitetura, interiores, imagens realistas e documentação para a execução e aprovação de projetos.</p>
        <p>Meu trabalho é transformar necessidades em decisões de espaço, luz e materiais, com atenção ao que será construído.</p>
      </div>
      <dl class="about__facts" data-reveal>
        <div><dt>Formação</dt><dd>${esc(site.education.degree)}<br><span>${esc(site.education.school)} · ${site.education.year}</span></dd></div>
        <div><dt>Atuação</dt><dd>Oblíqua Construtora<br><span>Desde 2021 · projetos, interiores, executivo e legal</span></dd></div>
        <div><dt>Premiação</dt><dd>2º lugar no Concurso Iconicidades<br><span>Santa Maria, RS · intervenção no antigo Clube dos Ferroviários</span></dd></div>
        <div><dt>Ferramentas</dt><dd>Revit, AutoCAD, SketchUp e Layout<br><span>V-Ray, Enscape, Lumion e Photoshop</span></dd></div>
      </dl>
    </div>
  </div>
</section>`;
}

/* ---------- Processo ---------- */
function processSection() {
  return `<section id="processo" class="process" aria-labelledby="processo-title">
  <div class="wrap">
    <header class="process__head">
      <p class="label" data-reveal>Processo</p>
      <h2 id="processo-title" class="display" data-reveal>Como funciona contratar um projeto.</h2>
      <p data-reveal>Nunca contratou um arquiteto? Este é o caminho, do primeiro contato à entrega.</p>
    </header>
    <ol class="process__steps">
      ${process
        .map(
          (s) => `<li class="step" data-reveal>
        <span class="step__n">${s.n}</span>
        <span class="step__mark" aria-hidden="true"></span>
        <h3 class="step__title">${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
      </li>`
        )
        .join("")}
    </ol>
  </div>
</section>`;
}

/* ---------- Contato / chamada final ---------- */
function contactSection() {
  return `<section id="contato" class="contact" aria-labelledby="contato-title">
  ${contour({ className: "contour contact__contour", seed: 9, lines: 40, width: 900, height: 700 })}
  <div class="contact__grid wrap">
    <div class="contact__main">
      <p class="label" data-reveal>Contato</p>
      <h2 id="contato-title" class="contact__title" data-reveal>Seu espaço pode <em>começar aqui.</em></h2>
      <p class="contact__lead" data-reveal>Conte o que você tem em mente. Vamos conversar sobre as possibilidades para o seu projeto.</p>
      <div class="contact__actions" data-reveal>
        ${wa(messages.quote, "Solicitar orçamento", "btn btn--sand btn--lg")}
        <p class="contact__hint">Abre o WhatsApp com a mensagem pronta.</p>
      </div>
      <ul class="contact__direct" data-reveal>
        <li><span class="label">WhatsApp</span><a href="${whatsappUrl(messages.default)}" target="_blank" rel="noopener" data-wa>${esc(site.whatsappDisplay)}</a></li>
        <li><span class="label">E-mail</span><a href="mailto:${site.email}">${site.email}</a></li>
        <li><span class="label">Instagram</span><a href="${site.social[0].url}" target="_blank" rel="noopener">${esc(site.social[0].handle)}</a></li>
      </ul>
    </div>
    <noscript><p class="brief__fallback">Para conversar sobre seu projeto, <a href="${whatsappUrl(messages.quote)}" target="_blank" rel="noopener">abra o WhatsApp</a> ou escreva para <a href="mailto:${site.email}">${site.email}</a>.</p></noscript>
    <form class="brief" data-brief data-wa-number="${site.whatsapp}" action="https://wa.me/${site.whatsapp}" method="get" target="_blank" novalidate aria-labelledby="brief-title" data-reveal>
      <div class="brief__head">
        <h3 id="brief-title" class="brief__title">Prefere detalhar antes? <span>Leva um minuto</span></h3>
        <p>Suas respostas viram uma mensagem organizada no WhatsApp. Nada fica armazenado neste site.</p>
      </div>
      <div class="field">
        <label for="b-nome">Seu nome <span class="field__req" aria-hidden="true">*</span><span class="sr-only">(obrigatório)</span></label>
        <input id="b-nome" name="nome" type="text" autocomplete="name" required>
        <p class="field__error" id="b-nome-err" hidden>Conte como podemos te chamar.</p>
      </div>
      <div class="field">
        <label for="b-tipo">Tipo de projeto</label>
        <select id="b-tipo" name="tipo">
          <option value="">Selecione</option>
          ${services.map((s) => `<option>${esc(s.title)}</option>`).join("")}
          <option>Ainda não sei</option>
        </select>
      </div>
      <div class="field">
        <label for="b-cidade">Cidade</label>
        <input id="b-cidade" name="cidade" type="text" autocomplete="address-level2">
      </div>
      <fieldset class="field field--chips">
        <legend>Situação do imóvel</legend>
        <div class="chips">
          ${["Terreno", "Em construção", "Imóvel novo", "Imóvel para reforma", "Outro"]
            .map((o) => `<label class="chip"><input type="radio" name="situacao" value="${o}"><span>${o}</span></label>`)
            .join("")}
        </div>
      </fieldset>
      <div class="field">
        <label for="b-desc">O que você precisa?</label>
        <textarea id="b-desc" name="descricao" rows="3" placeholder="Ex.: reforma da cozinha e da sala de um apartamento de 80 m²"></textarea>
      </div>
      <button class="btn btn--ivory btn--block" type="submit">${icons.whatsapp}<span>Abrir no WhatsApp</span></button>
      <p class="brief__note">O valor é definido após a conversa e a análise do projeto; não há orçamento automático.</p>
    </form>
  </div>
</section>`;
}

export function homePage() {
  return `<main id="conteudo">
${hero()}
${aboutSection()}
${projectsSection()}
${servicesSection()}
${processSection()}
${contactSection()}
</main>`;
}
