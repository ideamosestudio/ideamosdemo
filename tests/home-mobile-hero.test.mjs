import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('mobile home promotes web and ecommerce with illustrative concepts', async () => {
  const html = await readFile(new URL('../out/index.html', import.meta.url), 'utf8');
  const hero = html.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0];
  assert.ok(hero);
  assert.match(hero, /Diseño web y/);
  assert.match(hero, /tiendas online/);
  assert.match(hero, /para <span class="hero-title-accent">hacer crecer/);
  assert.match(hero, /Quiero una asesoría<\/span>/);
  assert.match(hero, /hero-assurance mobile-only">Sin cargo/);
  assert.match(hero, /Expertos en crear webs/); // Desktop copy remains unchanged.
  assert.match(hero, /hero-work-scene/);
  assert.match(hero, /hero-concept-architecture.webp/);
  assert.match(hero, /hero-concept-fashion.webp/);
  assert.match(hero, /Concepto visual/);
  assert.doesNotMatch(hero, /hero-work-link/);
  assert.match(hero, /hero-clients"><div class="logo-track"/);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
  assert.match(html.replace(/<!--[\s\S]*?-->/g, ''), /generar <br class="statement-title-desktop-break"/);
});
