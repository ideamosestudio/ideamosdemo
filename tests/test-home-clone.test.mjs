import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const out = new URL("../out/", import.meta.url);

test("la home de prueba existe, replica la home y permanece oculta", async () => {
  const [home, clone, sitemap] = await Promise.all([
    readFile(new URL("index.html", out), "utf8"),
    readFile(new URL("test/index.html", out), "utf8"),
    readFile(new URL("sitemap.xml", out), "utf8"),
  ]);

  for (const marker of [
    'class="hero" id="inicio"',
    'class="statement white-section shared-section-bg" id="web"',
    'class="ecommerce white-section shared-section-bg" id="tiendas"',
    'class="google-scene white-section shared-section-bg" id="google"',
  ]) {
    assert.ok(home.includes(marker), `la home debe contener ${marker}`);
    assert.ok(clone.includes(marker), `el clon debe contener ${marker}`);
  }

  assert.match(clone, /<meta name="robots" content="noindex, nofollow"\/>/);
  assert.match(clone, /Creamos sitios webs<\/b> que convierten <b>visitas en consultas y ventas\.<\/b>/);
  assert.match(clone, /Diseño web y marketing digital para <span>tu empresa<\/span>/);
  assert.doesNotMatch(clone, /Diseño web y marketing digital para <span>tu empresa\.<\/span>/);
  assert.doesNotMatch(clone, /Más confianza\. Más consultas\. Más ventas\./);
  assert.match(clone, /statement-copyblock module-base statement-copyblock--without-support/);
  assert.doesNotMatch(clone, /Liderá Google/);
  assert.match(clone, /google-content module-base google-content--without-support/);
  assert.match(clone, /google-title-line">Convertimos tu web<\/span><span class="google-title-line">en una máquina de<\/span><span class="google-title-line">crear leads y ventas<\/span>/);
  assert.doesNotMatch(clone, /máquina de generar tráfico/);
  assert.match(clone, /Llegamos a <b>quienes ya buscan lo que ofrecés en Google\.<\/b>/);
  assert.match(clone, /Atraemos <b>clientes que ya están decididos a comprar\.<\/b>/);
  assert.match(clone, /Convertimos búsquedas en Google en <b>consultas y ventas\.<\/b>/);
  assert.match(clone, /<b>Contactanos hoy y te asesoramos\.<\/b>/);
  assert.doesNotMatch(home, /Creamos sitios webs/);
  assert.match(home, /Diseño web y marketing digital para <span>tu empresa(?:<!-- -->)?\.<\/span>/);
  assert.match(home, /Creamos webs que <b>transmiten autoridad<\/b> y convierten visitas en consultas\./);
  assert.match(home, /Más confianza\. Más consultas\. Más ventas\./);
  assert.match(home, /Liderá Google/);
  assert.match(home, /Convertimos tu web en una máquina de generar tráfico, leads y ventas/);
  assert.doesNotMatch(home, /Llegamos a <b>quienes ya buscan/);
  assert.doesNotMatch(sitemap, /\/test\//i);
  assert.doesNotMatch(home, /href="[^"]*\/test\/?"/i);
});

test("la página de prueba aplica su sistema visual sin cargar componentes 3D", async () => {
  const [home, clone] = await Promise.all([
    readFile(new URL("index.html", out), "utf8"),
    readFile(new URL("test/index.html", out), "utf8"),
  ]);

  assert.doesNotMatch(home, /test-experiment-page|test-phone-3d/);
  assert.doesNotMatch(clone, /test-experiment-page|test-phone-3d|test-tablet-3d/);

  const [page, layout, styles] = await Promise.all([
    readFile(new URL("../app/test/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/test/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/test/test.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /className="test-page"/);
  assert.doesNotMatch(page, /TestPhone|TestTablet/);
  assert.match(layout, /test\.css/);
  assert.match(styles, /--test-content-width:\s*1180px/);
  assert.match(styles, /--test-dark-surface:\s*#000/);
  assert.match(styles, /--test-directory-surface:\s*#242424/);
  assert.match(styles, /\.service-directory\s*\{[^}]*background:\s*var\(--test-directory-surface\)\s*!important/s);
  assert.match(styles, /\.pdw-section\s*\{[^}]*background:\s*var\(--test-dark-surface\)\s*!important/s);
  assert.match(styles, /\.drift-wall-stage::before,\s*\n#site-root \.test-page \.pdw-section \.drift-wall-stage::after\s*\{[^}]*height:\s*clamp\(96px, 12vw, 170px\)/s);
  assert.match(styles, /\.pdw-section > \.pdw-heading\s*\{[^}]*left:\s*50%\s*!important[^}]*width:\s*100vw\s*!important[^}]*justify-items:\s*center\s*!important[^}]*transform:\s*translateX\(-50%\)\s*!important/s);
  assert.match(styles, /\.pdw-heading > :is\(p, h2, span\)\s*\{[^}]*width:\s*fit-content\s*!important[^}]*justify-self:\s*center\s*!important[^}]*text-align:\s*center\s*!important/s);
  assert.match(styles, /--test-title-size:/);
  assert.match(styles, /\.happy-clients-avatars\s*\{[^}]*display:\s*none\s*!important/s);
  assert.match(styles, /\.statement \.module-base-copy__group \+ \.module-base-copy__group\s*\{[^}]*margin-top:\s*0\s*!important/s);
  assert.match(styles, /font-family:\s*"Roboto", Arial, sans-serif\s*!important/);
  assert.match(styles, /TYPO 01 — web-impact module, desktop only/);
  assert.match(styles, /@media \(min-width:\s*901px\)\s*\{[\s\S]*--test-inline:\s*max\(48px, calc\(\(100vw - var\(--test-content-width\)\) \/ 2\)\)/);
  assert.match(styles, /@media \(min-width:\s*981px\)[\s\S]*\.home-services-grid > \.statement/);
  assert.match(styles, /\.home-services-grid > \.statement\s*\{[^}]*align-items:\s*center\s*!important/s);
  assert.match(styles, /\.home-page \.statement \.happy-clients\s*\{[^}]*height:\s*19\.5px[^}]*margin:\s*0 0 24px/s);
  assert.match(styles, /\.statement h2\s*\{[^}]*font-size:\s*clamp\(32px, 3\.4vw, 46px\)[^}]*line-height:\s*1\.07/s);
  assert.match(styles, /\.statement \.orange-cta\s*\{[^}]*width:\s*322px[^}]*min-height:\s*58px/s);
  assert.match(styles, /\.statement-copyblock--without-support h2\s*\{[^}]*margin-bottom:\s*28px\s*!important/s);
  assert.match(styles, /\.google-content--without-support h2\s*\{[^}]*margin-bottom:\s*28px\s*!important/s);
  assert.match(styles, /@media \(min-width: 901px\)[\s\S]*\.google-title-line\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(styles, /\.google-content--without-support \.module-base-copy__group \+ \.module-base-copy__group\s*\{[^}]*margin-top:\s*0\s*!important/s);
  assert.match(styles, /@media \(min-width: 981px\)[\s\S]*\.statement-copyblock\s*\{[^}]*top:\s*-12px\s*!important/s);
  assert.match(styles, /TYPO 02 — requested TEST typography/);
  assert.match(styles, /\.service-directory__description,[\s\S]*\.home-advisory \.human-copy > span,[\s\S]*font-size:\s*16px\s*!important[\s\S]*line-height:\s*26\.5px\s*!important/);
  assert.match(styles, /Match every white-module paragraph to the advisory section[\s\S]*\.ecommerce \.shop-column p,[\s\S]*\.home-advisory \.human-copy > span[\s\S]*color:\s*#333\s*!important/);
  assert.match(styles, /\.home-advisory \.human-copy > span[\s\S]*:is\(b, strong\)[\s\S]*color:\s*#111\s*!important[\s\S]*font-weight:\s*700\s*!important[\s\S]*-webkit-text-stroke:\s*0\s*!important/);
  assert.match(styles, /\.contact-main > p:first-child,[\s\S]*\.editorial-footer \.ef-eyebrow[\s\S]*font-size:\s*13px\s*!important[\s\S]*letter-spacing:\s*5\.46px\s*!important/);
  assert.match(styles, /@media \(min-width:\s*701px\)[\s\S]*\.ecommerce \.section-heading h2,[\s\S]*\.pdw-heading h2,[\s\S]*\.contact-main h2,[\s\S]*\.editorial-footer h2[\s\S]*font-size:\s*46px\s*!important[\s\S]*letter-spacing:\s*-1\.15px\s*!important/);
  assert.doesNotMatch(styles, /\.(?:home-testimonials|contact-card)\b/);
  assert.doesNotMatch(styles, /\.test-page\s+\.hero\b/);
  assert.doesNotMatch(styles, /\.test-page\s+footer\b/);
});
