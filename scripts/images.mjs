// Gera recortes responsivos (WebP + JPEG) a partir das pranchas originais do portfólio.
// Requer libvips (`vips` no PATH). Uso: npm run images
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "source");
const OUT = join(root, "src", "img");
const TMP = join(OUT, ".tmp");
mkdirSync(TMP, { recursive: true });

const WIDTHS = [640, 1280, 1920, 2560];
const env = { ...process.env, VIPS_WARNING: "0", G_MESSAGES_DEBUG: "" };

// Coordenadas no espaço de 1920 px de largura da prancha (escaladas para a resolução original).
// [nome, arquivo, x, y, largura, altura]
const CROPS = [
  ["casa-fachada", "behance/slide-07.jpg", 0, 322, 1920, 648],
  ["casa-vertical", "behance/slide-02.jpg", 486, 217, 464, 650],
  ["casa-plantas", "behance/slide-08.jpg", 1030, 80, 780, 870],
  ["casa-cortes", "behance/slide-09.jpg", 120, 430, 1720, 470],
  ["centro-fachada", "behance/slide-03.jpg", 0, 300, 1920, 670],
  ["centro-axonometria", "behance/slide-04.jpg", 1190, 150, 440, 750],
  ["centro-corte", "behance/slide-05.jpg", 90, 510, 1710, 390],
  ["centro-fachada-sul", "behance/slide-06.jpg", 60, 150, 1800, 430],
  ["centro-fachada-norte", "behance/slide-06.jpg", 60, 600, 1800, 345],
  ["pediatria-render", "behance/slide-10.jpg", 0, 322, 1912, 537],
  ["pediatria-vertical", "behance/slide-02.jpg", 970, 240, 464, 658],
  ["pediatria-mobiliario", "behance/slide-11.jpg", 700, 225, 1190, 620],
  ["pediatria-vista", "behance/slide-12.jpg", 730, 90, 1080, 530],
  ["pediatria-materiais", "behance/slide-12.jpg", 1170, 670, 560, 300],
  ["pediatria-planta-humanizada", "behance/slide-13.jpg", 1140, 170, 640, 780],
  ["pediatria-planta-tecnica", "behance/slide-13.jpg", 170, 120, 860, 850],
  ["pediatria-marcenaria", "behance/slide-14.jpg", 300, 60, 1460, 980],
  ["caju-panorama", "behance/slide-15.jpg", 0, 322, 1920, 537],
  ["caju-cozinha", "behance/slide-16.jpg", 0, 505, 625, 329],
  ["caju-estar", "behance/slide-16.jpg", 641, 505, 625, 329],
  ["caju-vertical", "behance/slide-02.jpg", 1453, 217, 465, 650],
  ["onix-fachada", "behance/slide-17.jpg", 0, 306, 1920, 555],
  ["onix-brinquedoteca", "behance/slide-18.jpg", 0, 177, 1043, 485],
  ["onix-academia", "behance/slide-18.jpg", 1146, 57, 774, 432],
  ["onix-coworking", "behance/slide-18.jpg", 1146, 542, 774, 451],
  ["onix-plantas", "behance/slide-19.jpg", 80, 150, 1130, 750],
  ["onix-executivo", "behance/slide-20.jpg", 80, 110, 1720, 880],
];

const vips = (...args) => execFileSync("vips", args, { env, stdio: ["ignore", "ignore", "ignore"] });
const header = (file, field) =>
  Number(execFileSync("vipsheader", ["-f", field, file], { env, stdio: ["ignore", "pipe", "ignore"] }).toString().trim());

const manifest = {};

function exportSizes(name, master) {
  const w = header(master, "width");
  const h = header(master, "height");
  const max = Math.min(w, 2560);
  const widths = WIDTHS.filter((x) => x < max);
  if (!widths.length || max - widths[widths.length - 1] > 200) widths.push(max);
  for (const width of widths) {
    vips("thumbnail", master, join(OUT, `${name}-${width}.webp[Q=78,strip]`), String(width));
    vips("thumbnail", master, join(OUT, `${name}-${width}.jpg[Q=80,strip,optimize_coding,interlace]`), String(width));
  }
  manifest[name] = { width: w, height: h, widths };
}

for (const [name, file, x, y, cw, ch] of CROPS) {
  const input = join(SRC, file);
  if (!existsSync(input)) throw new Error(`Arquivo ausente: ${input}`);
  const k = header(input, "width") / 1920;
  const master = join(TMP, `${name}.png`);
  vips("crop", input, master, ...[x, y, cw, ch].map((v) => String(Math.round(v * k))));
  exportSizes(name, master);
  console.log("✓", name);
}

// Retrato (bio.site) e imagem de compartilhamento.
exportSizes("retrato", join(SRC, "profile-biosite.jpg"));
const og = join(TMP, "og.png");
vips("thumbnail", join(TMP, "caju-panorama.png"), og, "1200", "--height", "630", "--crop", "centre");
vips("copy", og, join(OUT, "og-image.jpg[Q=82,strip]"));

writeFileSync(join(root, "src", "data", "images.json"), JSON.stringify(manifest, null, 2));
execFileSync("rm", ["-rf", TMP]);
console.log(`\n${Object.keys(manifest).length} imagens geradas em src/img`);
