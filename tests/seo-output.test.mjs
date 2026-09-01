import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const out = new URL("../out/", import.meta.url);

const pagePaths = [
  ["index.html", "https://ideamos.com.ar/"],
  ["diseno-web-autoadministrable/index.html", "https://ideamos.com.ar/diseno-web-autoadministrable/"],
  ["tiendas-online/index.html", "https://ideamos.com.ar/tiendas-online/"],
  ["marketing-digital/index.html", "https://ideamos.com.ar/marketing-digital/"],
  ["posicionamiento-web/index.html", "https://ideamos.com.ar/posicionamiento-web/"],
  ["casos-de-exito/index.html", "https://ideamos.com.ar/casos-de-exito/"],
  ["testimonios/index.html", "https://ideamos.com.ar/testimonios/"],
  ["precios/index.html", "https://ideamos.com.ar/precios/"],
  ["contacto/index.html", "https://ideamos.com.ar/contacto/"],
];

test("cada página pública tiene título, descripción y canonical", async () => {
  for (const [file, canonical] of pagePaths) {
    const html = await readFile(new URL(file, out), "utf8");
    assert.match(html, /<title>[^<]{20,60}<\/title>/i, file);
    assert.match(html, /<meta name="description" content="[^"]{80,170}"/i, file);
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), file);
  }
});

test("la portada acredita a Ideamos y expone datos estructurados", async () => {
  const html = await readFile(new URL("index.html", out), "utf8");
  assert.match(html, /name="author" content="Ideamos"/i);
  assert.match(html, /name="developed-by" content="Ideamos — https:\/\/ideamos\.com\.ar"/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /https:\/\/schema\.org/i);
  assert.match(html, /rel="describedby" href="\/llms\.txt"/i);
});

test("sitemap profesional: solo páginas públicas y prioridades válidas", async () => {
  const xml = await readFile(new URL("sitemap.xml", out), "utf8");
  for (const [, canonical] of pagePaths) assert.ok(xml.includes(`<loc>${canonical}</loc>`), canonical);
  assert.doesNotMatch(xml, /\/test2?\//i);
  assert.match(xml, /<priority>1<\/priority>/);
  assert.match(xml, /<priority>0\.95<\/priority>/);
  assert.equal((xml.match(/<url>/g) ?? []).length, pagePaths.length);
});

test("robots y archivos para agentes están publicados", async () => {
  const robots = await readFile(new URL("robots.txt", out), "utf8");
  const llms = await readFile(new URL("llms.txt", out), "utf8");
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/ideamos\.com\.ar\/sitemap\.xml/);
  assert.match(llms, /^# Ideamos/m);
  assert.match(llms, /https:\/\/ideamos\.com\.ar\/llms-full\.txt/);
  await access(new URL("security.txt", out));
  await access(new URL("public/googlecac1ad33023af32c.html", root));
});

test("la portada conserva las optimizaciones críticas de rendimiento", async () => {
  const html = await readFile(new URL("index.html", out), "utf8");
  const stylesheets = html.match(/<link rel="stylesheet"/g) ?? [];

  assert.ok(!html.includes("fonts.googleapis.com"));
  assert.ok(!html.includes('<script src="https://www.googletagmanager.com/gtag'));
  for (const prefix of ["", "shop-", "frosz-"]) {
    for (const number of [1, 2, 3]) {
      assert.ok(!html.includes(`/media/${prefix}screen-${number}.png`));
    }
  }
  assert.ok(html.includes("/media/screen-1.webp"));
  assert.ok(html.includes('rel="preload" href="/fonts/Gilroy-ExtraBold.otf"'));
  assert.ok(stylesheets.length <= 2, `La portada carga ${stylesheets.length} hojas de estilo`);
});

test("el formulario conserva las defensas antispam", async () => {
  const source = await readFile(new URL("components/ContactLeadForm.tsx", root), "utf8");

  assert.match(source, /name="_gotcha"/);
  assert.match(source, /MIN_COMPLETION_TIME_MS/);
  assert.match(source, /SUBMISSION_COOLDOWN_MS/);
  assert.match(source, /DUPLICATE_WINDOW_MS/);
  assert.match(source, /AbortController/);
  assert.match(source, /maxLength=\{2000\}/);
});
