import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const images = JSON.parse(readFileSync(fileURLToPath(new URL("../data/images.json", import.meta.url)), "utf8"));

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const attrs = (obj) =>
  Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== false && v !== null)
    .map(([k, v]) => (v === true ? k : `${k}="${esc(v)}"`))
    .join(" ");

export const imageMeta = (name) => {
  const meta = images[name];
  if (!meta) throw new Error(`Imagem não encontrada no manifesto: ${name}`);
  return meta;
};

/** URL da maior versão JPEG (lightbox e compartilhamento). */
export const largestJpg = (name, base) => {
  const { widths } = imageMeta(name);
  return `${base}img/${name}-${widths[widths.length - 1]}.jpg`;
};

/**
 * <picture> responsivo com WebP + JPEG.
 * base: prefixo relativo até a raiz do site ("" ou "../../").
 */
export function picture(name, { base = "", alt = "", sizes = "100vw", priority = false, className = "", imgClass = "", style = "", mobile = "" } = {}) {
  const { width, height, widths } = imageMeta(name);
  const setOf = (n, ext) => imageMeta(n).widths.map((w) => `${base}img/${n}-${w}.${ext} ${w}w`).join(", ");
  const set = (ext) => setOf(name, ext);
  // Direção de arte: recorte alternativo para telas estreitas
  const art = mobile
    ? `<source media="(max-width: 47.99em)" type="image/webp" srcset="${setOf(mobile, "webp")}" sizes="100vw"><source media="(max-width: 47.99em)" srcset="${setOf(mobile, "jpg")}" sizes="100vw">`
    : "";
  const fallback = `${base}img/${name}-${widths.find((w) => w >= 1280) || widths[widths.length - 1]}.jpg`;
  return `<picture${className ? ` class="${className}"` : ""}${style ? ` style="${esc(style)}"` : ""}>` +
    art + `<source type="image/webp" srcset="${set("webp")}" sizes="${esc(sizes)}">` +
    `<img ${attrs({
      src: fallback,
      srcset: set("jpg"),
      sizes,
      width,
      height,
      alt,
      class: imgClass || undefined,
      loading: priority ? "eager" : "lazy",
      decoding: priority ? "sync" : "async",
      fetchpriority: priority ? "high" : undefined,
    })}></picture>`;
}

/**
 * Linhas de contorno — o grafismo ondulado que acompanha a identidade do portfólio da arquiteta.
 * Gerado de forma determinística para manter o mesmo desenho a cada build.
 */
export function contour({ lines = 34, width = 600, height = 600, seed = 1, className = "contour" } = {}) {
  const paths = [];
  const steps = 48;
  for (let i = 0; i < lines; i++) {
    const t = i / (lines - 1);
    let d = "";
    for (let s = 0; s <= steps; s++) {
      const u = s / steps;
      const x = u * width;
      const warp =
        Math.sin(u * Math.PI * 1.15 + t * 2.4 + seed) * 70 * Math.sin(t * Math.PI) +
        Math.sin(u * Math.PI * 2.6 - t * 1.7 + seed * 0.7) * 26 +
        Math.cos(t * Math.PI * 1.3 + u * 2.1) * 34 * u;
      const y = t * height * 1.18 - height * 0.09 + warp;
      d += `${s === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    paths.push(`<path d="${d}"/>`);
  }
  return `<svg class="${className}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" vector-effect="non-scaling-stroke">${paths.join("")}</g></svg>`;
}

export const icons = {
  arrow: `<svg class="i i-arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12h17M14 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,
  arrowDown: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3v17M6 14l6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,
  close: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,
  prev: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 12H4M10 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,
  next: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12h17M14 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,
  expand: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`,
  whatsapp: `<svg class="i i-wa" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z"/></svg>`,
};
