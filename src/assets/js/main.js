/* Liriane Wagner — interações do site (sem dependências) */
(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Cabeçalho compacto ---------- */
  const header = document.querySelector("[data-header]");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Profundidade sutil na abertura ---------- */
  const heroEl = document.querySelector("[data-hero]");
  if (heroEl && !reduceMotion.matches) {
    let ticking = false;
    const depth = () => {
      const p = Math.min(Math.max(window.scrollY / heroEl.offsetHeight, 0), 1);
      heroEl.style.setProperty("--hero-p", p.toFixed(4));
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(depth);
      }
    }, { passive: true });
    depth();
  }

  /* ---------- Menu móvel ---------- */
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (toggle && nav && header) {
    const label = toggle.querySelector(".nav-toggle__label");
    const mq = window.matchMedia("(min-width: 64em)");
    const focusables = () => [header.querySelector(".brand"), ...nav.querySelectorAll("a"), toggle];

    const setOpen = (open) => {
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      label.textContent = open ? "Fechar" : "Menu";
      root.style.overflow = open ? "hidden" : "";
      if (open) nav.querySelector("a")?.focus({ preventScroll: true });
    };

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (!header.classList.contains("nav-open")) return;
      if (e.key === "Escape") {
        setOpen(false);
        toggle.focus();
      } else if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
    mq.addEventListener("change", (e) => e.matches && setOpen(false));
  }

  /* ---------- Navegação ativa ---------- */
  const navLinks = [...document.querySelectorAll('.site-nav__list a[href^="#"]')];
  if (navLinks.length && "IntersectionObserver" in window) {
    const map = new Map(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = map.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.removeAttribute("aria-current"));
            link.setAttribute("aria-current", "true");
          } else if (link.hasAttribute("aria-current") && entry.boundingClientRect.top > 0) {
            link.removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    map.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------- Revelação durante a rolagem ---------- */
  const revealables = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    root.classList.add("reveal-on");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach((el) => io.observe(el));
  }

  /* ---------- WhatsApp flutuante: aparece após a abertura e some sobre o contato ---------- */
  const float = document.querySelector("[data-wa-float]");
  if (float) {
    const endZones = [document.getElementById("contato"), document.querySelector(".site-footer")].filter(Boolean);
    const visibleZones = new Set();
    let contactVisible = false;
    const update = () => {
      const past = window.scrollY > window.innerHeight * 0.6 || !document.querySelector(".hero");
      float.classList.toggle("is-visible", past && !contactVisible && !header?.classList.contains("nav-open"));
    };
    if (endZones.length && "IntersectionObserver" in window) {
      const zoneObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? visibleZones.add(entry.target) : visibleZones.delete(entry.target)));
        contactVisible = visibleZones.size > 0;
        update();
      }, { threshold: 0.05 });
      endZones.forEach((zone) => zoneObserver.observe(zone));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    toggle?.addEventListener("click", () => setTimeout(update, 0));
  }

  /* ---------- Lightbox ---------- */
  const dialog = document.querySelector("[data-lightbox-dialog]");
  const triggers = [...document.querySelectorAll("[data-lightbox]")];
  if (dialog && triggers.length && typeof dialog.showModal === "function") {
    const img = dialog.querySelector("[data-lightbox-img]");
    const caption = dialog.querySelector("[data-lightbox-caption]");
    const count = dialog.querySelector("[data-lightbox-count]");
    const original = dialog.querySelector("[data-lightbox-original]");
    const prevBtn = dialog.querySelector("[data-lightbox-prev]");
    const nextBtn = dialog.querySelector("[data-lightbox-next]");
    let items = [];
    let index = 0;
    let opener = null;

    const preload = (i) => {
      const t = items[(i + items.length) % items.length];
      if (t) new Image().src = t.href;
    };

    const show = (i) => {
      index = (i + items.length) % items.length;
      const t = items[index];
      const thumb = t.querySelector("img");
      img.classList.add("is-swapping");
      img.alt = thumb ? thumb.alt : "";
      img.onload = () => img.classList.remove("is-swapping");
      img.src = t.href;
      original.href = t.href;
      if (img.complete) img.classList.remove("is-swapping");
      caption.textContent = t.dataset.caption || "";
      count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
      const multiple = items.length > 1;
      prevBtn.hidden = nextBtn.hidden = !multiple;
      preload(index + 1);
      preload(index - 1);
    };

    const open = (trigger) => {
      items = triggers.filter((t) => t.dataset.lightbox === trigger.dataset.lightbox);
      opener = trigger;
      show(items.indexOf(trigger));
      dialog.showModal();
      root.classList.add("has-dialog");
    };

    triggers.forEach((t) =>
      t.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        open(t);
      })
    );

    dialog.addEventListener("close", () => {
      root.classList.remove("has-dialog");
      img.removeAttribute("src");
      opener?.focus({ preventScroll: true });
    });
    dialog.querySelector("[data-lightbox-close]").addEventListener("click", () => dialog.close());
    prevBtn.addEventListener("click", () => show(index - 1));
    nextBtn.addEventListener("click", () => show(index + 1));
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog || e.target.matches("[data-lightbox-stage]")) dialog.close();
    });
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
    });

    let startX = null;
    let startY = null;
    dialog.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    dialog.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && items.length > 1) show(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  /* ---------- Pré-orçamento → mensagem no WhatsApp ---------- */
  const form = document.querySelector("[data-brief]");
  if (form) {
    const name = form.elements.nome;
    const error = document.getElementById("b-nome-err");
    const setError = (on) => {
      error.hidden = !on;
      name.setAttribute("aria-invalid", String(on));
      if (on) name.setAttribute("aria-describedby", error.id);
      else name.removeAttribute("aria-describedby");
    };
    name.addEventListener("input", () => name.value.trim() && setError(false));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nome = String(data.get("nome") || "").trim();
      if (!nome) {
        setError(true);
        name.focus();
        return;
      }
      const lines = [`Olá, Liriane! Conheci seu portfólio e gostaria de conversar sobre um projeto.`, ""];
      lines.push(`*Nome:* ${nome}`);
      const fields = [
        ["Tipo de projeto", data.get("tipo")],
        ["Cidade", data.get("cidade")],
        ["Situação do imóvel", data.get("situacao")],
        ["O que preciso", data.get("descricao")],
      ];
      fields.forEach(([label, value]) => {
        const v = String(value || "").trim();
        if (v) lines.push(`*${label}:* ${v}`);
      });
      const url = `https://wa.me/${form.dataset.waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
      const link = Object.assign(document.createElement("a"), { href: url, target: "_blank", rel: "noopener" });
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }
})();
