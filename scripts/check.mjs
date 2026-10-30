// Verificações do site gerado: links internos, imagens, WhatsApp, alt e hierarquia de títulos.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../src/data/site.mjs";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const pages = [];
const walk = (dir) =>
  readdirSync(dir).forEach((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".html")) pages.push(p);
  });
walk(DIST);

const errors = [];
let waCount = 0;

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const rel = page.replace(DIST, "");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const isRootAbsolute = rel === "/404.html";

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${rel}: ${h1} elementos <h1>`);

  for (const [, tag] of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\salt="/.test(tag)) errors.push(`${rel}: <img> sem alt — ${tag.slice(0, 80)}`);
  }

  const refs = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(",").map((s) => s.trim().split(" ")[0])),
  ];
  for (const ref of refs) {
    if (/^(mailto:|tel:)/.test(ref)) continue;
    if (/^https?:\/\//.test(ref)) {
      if (ref.includes("wa.me/")) {
        waCount++;
        const m = ref.match(/^https:\/\/wa\.me\/(\d+)(\?text=(.*))?$/);
        if (!m || m[1] !== site.whatsapp) errors.push(`${rel}: link de WhatsApp inválido ${ref}`);
        else if (m[3]) {
          try {
            decodeURIComponent(m[3]);
          } catch {
            errors.push(`${rel}: mensagem do WhatsApp mal codificada`);
          }
        }
      }
      continue;
    }
    const [path, hash] = ref.split("#");
    if (!path) {
      if (hash && !ids.has(hash)) errors.push(`${rel}: âncora inexistente #${hash}`);
      continue;
    }
    let target = path.startsWith("/") ? join(DIST, path) : resolve(dirname(page), path);
    if (!isRootAbsolute && path.startsWith("/")) errors.push(`${rel}: caminho absoluto ${ref}`);
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, "index.html");
    if (!existsSync(target)) errors.push(`${rel}: arquivo inexistente ${ref}`);
    else if (hash && target.endsWith(".html")) {
      const other = readFileSync(target, "utf8");
      if (!other.includes(`id="${hash}"`)) errors.push(`${rel}: âncora inexistente ${ref}`);
    }
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problema(s):\n` + [...new Set(errors)].map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log(`✓ ${pages.length} páginas verificadas · ${waCount} links de WhatsApp válidos · nenhum link quebrado`);
