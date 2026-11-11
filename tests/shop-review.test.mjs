import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = p => readFile(new URL('../out/' + p, import.meta.url), 'utf8');

test('ecommerce review preserves original sections and stays outside indexing', async () => {
  const html = await read('revision/tiendas-online/index.html');
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.match(html, /name="googlebot" content="noindex, nofollow, noimageindex"/);
  assert.match(html, /rel="canonical" href="https:\/\/ideamos.com.ar\/tiendas-online\/"/);
  assert.match(html, /property="og:title" content="Diseño de tiendas online para empresas \| Ideamos"/);
  assert.match(html, /PROPUESTA EN REVISIÓN/);
  for (const section of ['shop-hero', 'shops-intro', 'shops-ecommerce', 'shops-problems', 'service-faq']) assert.ok(html.includes(section));
  for (const asset of ['hero.mp4', 'hero-poster.webp', 'sunglasses.webp', 'marketing-wilde.webm']) assert.ok(html.includes(asset));
  assert.match(html, /Tu tienda. Tu operación./);
  assert.match(html, /Las tarifas de plataformas y medios de pago se revisan por separado/);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const faqs = schemas.filter(s => s['@type'] === 'FAQPage');
  assert.equal(faqs.length, 1);
  assert.equal(faqs[0].mainEntity.length, 8);
  for (const q of faqs[0].mainEntity) {
    assert.ok(html.includes(q.name));
    assert.ok(html.includes(q.acceptedAnswer.text));
  }
  for (const path of ['portfolio/', 'contacto/', 'blog/tiendas-online/tienda-online-a-medida-o-plataforma/', 'blog/tiendas-online/que-necesitas-para-lanzar-tienda-online/']) {
    assert.ok(html.includes(path));
    await read(path + 'index.html');
  }
  const live = await read('tiendas-online/index.html');
  assert.doesNotMatch(live, /shop-scope-title|shop-questions-title|PROPUESTA EN REVISIÓN/);
  assert.match(live, /Vendé con tu tienda online/);
  for (const path of ['index.html','sitemap.xml','blog/index.html','llms.txt','llms-full.txt']) {
    assert.doesNotMatch(await read(path), /\/revision\/tiendas-online\//);
  }
  assert.doesNotMatch(await read('sitemap.xml'), /\/precios\//);
});

test('design review has its own sharing metadata, not inherited home metadata', async () => {
  const html = await read('revision/diseno-web/index.html');
  assert.match(html, /property="og:title" content="Diseño web profesional para empresas \| Ideamos"/);
  assert.match(html, /name="twitter:title" content="Diseño web profesional para empresas \| Ideamos"/);
});
