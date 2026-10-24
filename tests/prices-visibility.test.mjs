import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('precios queda fuera del sitemap, sin indexar y con encabezados consecutivos', async () => {
  const read = path => readFile(new URL('../out/' + path, import.meta.url), 'utf8');
  assert.doesNotMatch(await read('sitemap.xml'), /\/precios\//);
  assert.doesNotMatch(await read('404.html'), /href="[^"]*\/precios\//);
  const html = await read('precios/index.html');
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.ok(html.includes('Hasta 10 categorías'));
  assert.ok(!html.includes('Hasta 20 categorías'));
  for (const file of ['llms.txt', 'llms-full.txt']) {
    assert.ok((await read(file)).includes('https://ideamos.com.ar/portfolio/'));
    assert.doesNotMatch(await read(file), /\/precios\/|página de precios/);
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  for (const name of ['Landing page', 'Web básica', 'Tienda base', 'Tienda pyme']) {
    assert.ok(html.includes(`<h2>${name}</h2>`));
  }
  let previous = 0;
  for (const heading of html.matchAll(/<h([1-6])\b/g)) {
    const level = Number(heading[1]);
    assert.ok(level <= previous + 1, `Salto h${previous} a h${level}`);
    previous = level;
  }
});
