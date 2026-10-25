import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = p => readFile(new URL('../out/' + p, import.meta.url), 'utf8');
test('propuesta de diseño aislada, no indexable y sin enlaces de promoción', async () => {
  const html = await read('revision/diseno-web/index.html');
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.match(html, /name="googlebot" content="noindex, nofollow, noimageindex"/);
  assert.match(html, /rel="canonical" href="https:\/\/ideamos.com.ar\/diseno-web-autoadministrable\/"/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /PROPUESTA EN REVISIÓN/);
  assert.match(html, /¿Cuánto cuesta y cuánto tarda una página web\?/);
  assert.match(html, /preload="none"/);
  assert.doesNotMatch(await read('sitemap.xml'), /\/revision\//);
  for (const path of ['index.html','diseno-web-autoadministrable/index.html','tiendas-online/index.html','blog/index.html','llms.txt','llms-full.txt']) {
    assert.doesNotMatch(await read(path), /href="[^"]*\/revision\/diseno-web/);
  }
});
