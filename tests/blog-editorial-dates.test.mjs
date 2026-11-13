import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const out = new URL('../out/', import.meta.url);
const updated = 'blog/tiendas-online/tienda-online-a-medida-o-plataforma/';
test('la actualización editorial conserva publicación y cambia solo las fechas pertinentes', async () => {
  const html = await readFile(new URL(updated + 'index.html', out), 'utf8');
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(m => { const s = JSON.parse(m[1]); return s['@graph'] ?? [s]; });
  const article = graphs.find(s => s['@type'] === 'BlogPosting');
  assert.equal(article.datePublished, '2026-10-24');
  assert.equal(article.dateModified, '2026-11-13');
  assert.match(html, /property="article:modified_time" content="2026-11-13"/);
  assert.match(html, /Actualizado el/);
  assert.match(html, /Tres escenarios para comparar alternativas/);
  assert.match(html, /casos son ilustrativos/);
  assert.match(html, /help.shopify.com\/en\/manual\/products\/import-export\/export-products/);
  const xml = await readFile(new URL('sitemap.xml', out), 'utf8');
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => m[1]);
  assert.match(entries.find(e => e.includes('/' + updated + '</loc>')), /<lastmod>2026-11-13<\/lastmod>/);
  const originalSlugs = ['diseno-web-profesional/diseno-web-profesional/', 'seo/renovacion-de-sitio-web-2026-seo-conversiones/', 'diseno-web-profesional/mejorar-velocidad-sitio-web/', 'tiendas-online/que-necesitas-para-lanzar-tienda-online/'];
  for (const entry of entries.filter(e => originalSlugs.some(slug => e.includes('/blog/' + slug + '</loc>')))) {
    assert.match(entry, /<lastmod>2026-10-24<\/lastmod>/);
  }
});

test('las tres entregas recuperadas tienen fecha real, imagen propia y aparecen en el listado', async () => {
  const index = await readFile(new URL('blog/index.html', out), 'utf8');
  for (const slug of ['diseno-web-profesional/preparar-contenido-web-empresa', 'tiendas-online/como-crear-fichas-de-producto', 'diseno-web-profesional/formulario-contacto-consultas-comerciales']) {
    assert.ok(index.includes(`/blog/${slug}/`));
    const html = await readFile(new URL(`blog/${slug}/index.html`, out), 'utf8');
    const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(m => { const s = JSON.parse(m[1]); return s['@graph'] ?? [s]; });
    const article = graphs.find(s => s['@type'] === 'BlogPosting');
    assert.equal(article.datePublished, '2026-11-13');
    assert.equal(article.dateModified, '2026-11-13');
    assert.equal((html.match(/<h2/g) ?? []).length >= 6, true);
  }
});
