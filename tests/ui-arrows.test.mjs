import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";

const out = new URL("../out/", import.meta.url);
const textArrows = /[\u2190-\u21ff\u27f0-\u27ff\u2900-\u297f\u2794\u279c-\u27af\u2039\u203a\u25b6\u25ba\u25c0\u25c4]|&(?:larr|rarr|uarr|darr|nearr|rsaquo|lsaquo);|&#(?:859[2-9]|860[01]|x219[0-9a-f]);/i;

async function checkHtml(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    if (entry.isDirectory()) await checkHtml(url);
    else if (entry.name.endsWith(".html")) assert.doesNotMatch(await readFile(url, "utf8"), textArrows, url.pathname);
  }
}

test("las páginas publicadas no usan caracteres de texto como flechas", async () => {
  await checkHtml(out);
});

test("las flechas compartidas son SVG decorativos con trazos escalables", async () => {
  const html = await readFile(new URL("index.html", out), "utf8");
  const icons = [...html.matchAll(/<svg class="site-arrow"[^>]*>[\s\S]*?<\/svg>/g)].map(match => match[0]);
  assert.equal(icons.length, 7); // Five directory links and two carousel controls.
  assert.match(html, /<svg class="site-play-icon"[^>]*aria-hidden="true"[^>]*><path d="M5 3v18l16-9Z"/);
  for (const icon of icons) {
    assert.match(icon, /viewBox="0 0 24 24"/);
    assert.match(icon, /stroke="currentColor"/);
    assert.match(icon, /aria-hidden="true"/);
    assert.match(icon, /focusable="false"/);
    assert.match(icon, /<path d="[^"]+"/);
    assert.doesNotMatch(icon, /<text/);
  }
  for (const slug of ["diseno-web-autoadministrable", "tiendas-online", "posicionamiento-web", "marketing-digital"]) {
    const page = await readFile(new URL(`${slug}/index.html`, out), "utf8");
    const faq = page.match(/<section class="service-guide service-faq"[\s\S]*?<\/section>/)?.[0];
    assert.ok(faq, slug);
    assert.equal((faq.match(/class="site-arrow"/g) ?? []).length, 5, slug);
  }
});

test("el portfolio conserva SVG tanto en HTML como al generar tarjetas y abrir proyectos", async () => {
  const html = await readFile(new URL("portfolio/index.html", out), "utf8");
  assert.ok((html.match(/class="arrow-icon inline-arrow"/g) ?? []).length >= 48);
  const dialogActions = html.match(/<div class="dialog-actions">[\s\S]*?<\/div>/)?.[0];
  assert.ok(dialogActions);
  assert.doesNotMatch(dialogActions, /arrow-icon/);
  const context = {};
  runInNewContext(await readFile(new URL("portfolio/project-card.js", out), "utf8"), context);
  const ui = context.PortfolioUI;
  const card = ui.card({ id: "preview", name: "Proyecto", category: "apps", sector: "Sector", description: "Descripción" });
  assert.doesNotMatch(card, textArrows);
  assert.match(card, /Conocer el proyecto <svg/);
  assert.match(ui.inlineArrowIcon, /aria-hidden="true" focusable="false"/);
  const gallery = await readFile(new URL("portfolio/gallery.js", out), "utf8");
  assert.doesNotMatch(gallery, textArrows);
  assert.match(gallery, /openProject\(link\.dataset\.project\)/);
});
