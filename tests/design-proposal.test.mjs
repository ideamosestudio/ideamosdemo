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
  assert.match(html, /PROPUESTA EN REVISIÓN · V8/);
  assert.match(html, /Definamos tu próxima web/);
  assert.match(html, /<strong>adaptación a celulares, tablets y escritorio<\/strong>/);
  for (const id of ['cylsa','sphere-design']) {
    assert.ok(html.includes(`thumbLarge-${id}.webp`));
    assert.ok(html.includes(`thumb-${id}.webp`));
  }
  assert.match(html, /Tu web, lista para seguir creciendo/);
  assert.match(html, /Administrá tu contenido/);
  assert.match(html, /Acompañamiento y soporte/);
  assert.ok(html.indexOf('Acompañamiento y soporte') < html.indexOf('El alcance final queda por escrito.'));
  assert.match(html, /Accesos y titularidad/);
  assert.match(html, /Diseño web profesional para empresas \| Ideamos/);
  assert.match(html, /Una web autoadministrable te permite editar contenido/);
  assert.match(html, /¿Qué materiales necesito para empezar el diseño de mi web\?/);
  assert.match(html, /id="project-evidence-title"/);
  assert.match(html, /Sphere Design/);
  assert.match(html, /CYL Neumáticos/);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const faq = schemas.find(s => s['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 8);
  for (const item of faq.mainEntity) assert.ok(html.includes(item.acceptedAnswer.text));
  assert.match(html, /¿Cuánto cuesta y cuánto tarda una página web\?/);
  // La copia conserva la gráfica y los componentes de la página actual.
  for (const asset of ['hero.mp4', 'hero-poster.webp', 'xtreme-service.webp', 'tablet-animated-final.webm', 'wilde-cell-002.png']) {
    assert.ok(html.includes(asset), `Falta recurso visual original: ${asset}`);
  }
  for (const className of ['internal-home-hero', 'design-problems-layout', 'service-benefits-grid', 'service-faq']) {
    assert.ok(html.includes(className), `Falta estructura original: ${className}`);
  }
  assert.doesNotMatch(await read('sitemap.xml'), /\/revision\//);
  for (const id of ['alcance-proyecto', 'proceso-diseno-web', 'project-evidence-title']) {
    assert.ok(html.includes(`id="${id}"`));
    assert.ok(!(await read('diseno-web-autoadministrable/index.html')).includes(`id="${id}"`));
  }
  assert.match(html, /¿El dominio y el hosting están incluidos\?/);
  assert.match(html, /¿Cómo se organiza el mantenimiento después de publicar\?/);
  assert.match(html, /¿Pueden rediseñar mi web conservando el contenido útil\?/);
  for (const path of ['index.html','diseno-web-autoadministrable/index.html','tiendas-online/index.html','blog/index.html','llms.txt','llms-full.txt']) {
    assert.doesNotMatch(await read(path), /href="[^"]*\/revision\/diseno-web/);
  }
});
