import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const out = new URL("../out/", import.meta.url);
const readPage = (slug = "") => readFile(new URL(`${slug ? `${slug}/` : ""}index.html`, out), "utf8");

test("Portfolio aparece como enlace rastreable en los menús de escritorio y móvil", async () => {
  for (const slug of ["", "diseno-web-autoadministrable", "tiendas-online", "marketing-digital", "posicionamiento-web", "casos-de-exito"]) {
    const html = await readPage(slug);
    for (const className of ["nav-links desktop-navigation", "mobile-menu-nav"]) {
      const nav = html.match(new RegExp(`<nav class="${className}"[^>]*>([\\s\\S]*?)<\\/nav>`))?.[1];
      assert.ok(nav, `${slug}: ${className}`);
      assert.match(nav, /<a href="(?:\/[^"\s]+)?\/portfolio\/"[^>]*>(?:<small>05<\/small><span>)?Portfolio/);
      assert.equal((nav.match(/<a /g) ?? []).length, 5);
    }
  }
});

test("la home ofrece el portfolio junto al contacto principal, sin duplicarlo", async () => {
  const html = await readPage();
  const actions = html.match(/<div class="pdw-actions">([\s\S]*?)<\/div>/)?.[1];
  assert.ok(actions);
  assert.equal((actions.match(/<a /g) ?? []).length, 2);
  assert.match(actions, /class="cta-glow primary" href="https:\/\/wa.me\//);
  assert.match(actions, /class="cta-glow secondary" href="(?:\/[^"\s]+)?\/portfolio\/"/);
  assert.match(actions, /Ver portfolio completo/);
  assert.doesNotMatch(actions, /<svg class="site-arrow"/);
});

test("los servicios enlazan el portfolio junto a sus ejemplos, sin depender de JavaScript", async () => {
  for (const [slug, label, context] of [
    ["diseno-web-autoadministrable", "Ver proyectos de diseño web", "Sitio web Xtreme desarrollado por Ideamos"],
    ["tiendas-online", "Ver proyectos de tiendas online", "Tienda online de anteojos desarrollada por Ideamos"],
  ]) {
    const html = await readPage(slug);
    const link = html.match(/<a class="portfolio-link"[^>]*>[\s\S]*?<\/a>/)?.[0];
    assert.ok(link, slug);
    assert.ok(link.includes(label), slug);
    assert.match(link, /href="(?:\/[^"\s]+)?\/portfolio\/"/);
    assert.doesNotMatch(link, /target=|nofollow|onclick=/i);
    assert.ok(html.includes(context));
  }
  assert.ok((await readFile(new URL("portfolio/index.html", out), "utf8")).includes('rel="canonical" href="https://ideamos.com.ar/portfolio/"'));
});
