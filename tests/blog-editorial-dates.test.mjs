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
  for (const entry of entries.filter(e => /\/blog\//.test(e) && !e.includes(updated) && !e.includes('/blog/</loc>') && !e.includes('/blog/tiendas-online/</loc>'))) {
    assert.match(entry, /<lastmod>2026-10-24<\/lastmod>/);
  }
});
