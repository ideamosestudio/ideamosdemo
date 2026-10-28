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
  assert.match(html, /PROPUESTA EN REVISIÓN · V11/);
  assert.match(html, /Visitar el sitio de CYL Neumáticos/);
  assert.match(html, /<strong>conecta proyectos y servicios<\/strong>/);
  assert.match(html, /Ver testimonio de Pablo/);
  assert.match(html, /Ver testimonio de Vanesa/);
  for (const video of ['cylsa', 'sphere-design']) {
    assert.match(html, new RegExp(`href="[^\"]*/media/testimonials/${video}\\.mp4"`));
    await readFile(new URL(`../public/media/testimonials/${video}.mp4`, import.meta.url));
  }
  assert.match(html, /Definamos tu próxima web/);
  assert.match(html, /<strong>adaptación a celulares, tablets y escritorio<\/strong>/);
  for (const id of ['cylsa','sphere-design']) {
    assert.ok(html.includes(`thumbLarge-${id}.webp`));
    assert.ok(html.includes(`thumb-${id}.webp`));
  }
  assert.match(html, /Tu web, lista para seguir creciendo/);
  assert.ok(
    html.indexOf('Con nuestras páginas web vas a tener:') < html.indexOf('¿Qué problemas resuelve'),
    'El módulo de beneficios debe aparecer inmediatamente después de “Creamos webs”.',
  );
  assert.match(html, /Administrá tu contenido/);
  assert.match(html, /Acompañamiento y soporte/);
  assert.ok(html.indexOf('Acompañamiento y soporte') < html.indexOf('El alcance final queda por escrito.'));
  assert.match(html, /Accesos y titularidad/);
  assert.match(html, /Diseño web profesional para empresas \| Ideamos/);
  assert.match(html, /Una web autoadministrable te permite editar contenido/);
  assert.match(
    html,
    /<span class="review-title-accent">Creamos<\/span> webs que generan<br\/>confianza <span class="review-title-accent">y oportunidades<\/span>/,
  );
  assert.match(html, /<strong>Diseño con identidad\.<\/strong> Un camino al contacto\./);
  assert.doesNotMatch(html, /Diseño con identidad\. Contenido claro\./);
  for (const emphasis of [
    'mostrar qué hacés',
    'presentar tus servicios',
    'qué partes serán autoadministrables',
    'una propuesta a tu medida',
  ]) {
    assert.match(html, new RegExp(`<strong>${emphasis}<\\/strong>`));
  }
  assert.doesNotMatch(html, /<strong>las páginas, los contenidos, los formularios y las integraciones<\/strong>/);
  assert.match(html, /Tu web debe <strong>mostrar qué hacés<\/strong> y guiar al próximo paso\./);
  assert.match(html, /Definimos contenidos y acordamos/);
  assert.doesNotMatch(html, /por qué elegirte y cómo dar el próximo paso/);
  assert.match(
    html,
    /centered-lead-line[^>]*>Una presencia profesional para mostrar tu valor, resolver dudas y abrir nuevas oportunidades\.<\/span><span class="centered-lead-line"[^>]*>Empezamos por lo que necesita tu negocio\.<\/span>/,
  );
  assert.match(html, /¿Qué materiales necesito para empezar el diseño de mi web\?/);
  assert.match(html, /id="project-evidence-title"/);
  assert.doesNotMatch(html, /home-testimonials/);
  assert.match(html, /Sphere Design/);
  assert.match(html, /CYL Neumáticos/);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const faq = schemas.find(s => s['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 8);
  for (const item of faq.mainEntity) assert.ok(html.includes(item.acceptedAnswer.text));
  assert.match(html, /¿Cuánto cuesta y cuánto tarda una página web\?/);
  // La copia conserva la gráfica y los componentes de la página actual.
  for (const asset of ['hero.mp4', 'hero-poster.webp', 'xtreme-service.webp', 'wilde-cell-002.png']) {
    assert.ok(html.includes(asset), `Falta recurso visual original: ${asset}`);
  }
  assert.doesNotMatch(html, /tablet-animated-final\.webm/);
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

test('REVISION usa Roboto Light a 15 px en sus párrafos sin afectar módulos compartidos', async () => {
  const css = await readFile(new URL('../app/revision/diseno-web/additions.module.css', import.meta.url), 'utf8');

  assert.match(css, /font-family:"Roboto Light"/);
  assert.match(css, /src:url\("\/fonts\/Roboto-Light\.ttf"\)/);
  assert.match(css, /font-size:15px!important/);
  assert.match(
    css,
    /design-problems \.service-heading>h3\)\{[^}]*font-size:15px!important/s,
  );
  assert.match(css, /font-weight:300!important/);
  assert.match(css, /line-height:1\.65!important/);
  assert.match(css, /letter-spacing:normal!important/);
  assert.match(css, /color:#000!important/);
  assert.match(css, /\.reviewPage/);
  assert.doesNotMatch(css, /\.reviewPage[^}]*home-testimonials/s);
  assert.match(css, /\.design-problems \.service-heading>p:first-child/);
  assert.match(css, /\.service-benefits \.service-heading>p:first-child/);
  assert.match(css, /font-size:13px!important/);
  assert.match(css, /letter-spacing:\.42em!important/);
  assert.match(
    css,
    /design-problems \.service-heading>p:first-child\)\{[^}]*margin-bottom:17px!important/s,
  );
  assert.match(css, /font-size:clamp\(38px,2\.8vw,53px\)!important/);
  assert.match(css, /width:min\(50vw,900px\)!important/);
  assert.match(css, /\.service-xtreme \.review-title-accent/);
  assert.match(
    css,
    /service-xtreme \.review-title-accent\)\{[^}]*color:#111!important;[^}]*background:none!important;[^}]*animation:none!important/s,
  );
  assert.match(css, /service-xtreme \.service-heading>h3\)/);
  assert.match(css, /service-xtreme \.service-copy\)[\s\S]*?color:#000!important/);
  assert.match(
    css,
    /service-xtreme \.service-copy strong\)\{[^}]*font-family:"Roboto Light","Roboto",Arial,sans-serif!important;[^}]*font-weight:900!important/s,
  );
  assert.match(css, /-webkit-text-stroke:\.18px currentColor/);
  assert.match(css, /service-section\.service-xtreme\)\{[^}]*padding-top:118px!important;[^}]*padding-bottom:118px!important/s);
  assert.match(css, /service-xtreme \.service-heading>p:first-child\)\{[^}]*margin:0 0 26px!important;[^}]*font-size:12px!important;[^}]*letter-spacing:\.32em!important/s);
  assert.match(css, /service-xtreme \.service-heading h2\)\{[^}]*margin:0 0 30px!important;[^}]*font-size:clamp\(46px,2\.8vw,53px\)!important/s);
  assert.match(css, /service-xtreme \.review-project-actions\)\{[^}]*margin-top:40px!important/s);
  assert.match(css, /service-xtreme \.service-visual-media>img\)\{[^}]*transform:scale\(\.96\)!important/s);
  assert.match(css, /service-heading>h2\),[\s\S]*?service-heading>\.service-copy\)\{[^}]*width:100%!important;[^}]*max-width:100%!important/s);
  assert.match(css, /service-xtreme \.service-heading\)\{[^}]*max-width:600px!important/s);
  assert.match(
    await readFile(new URL('../app/revision/diseno-web/page.tsx', import.meta.url), 'utf8'),
    /próximo paso\.\\nDiseñamos a medida[\s\S]*autoadministrables\*\*\.\\nCoordinemos una asesoría/,
  );
});
