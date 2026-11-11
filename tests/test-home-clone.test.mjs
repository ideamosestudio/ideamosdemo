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
  assert.doesNotMatch(styles, /\.(?:home-testimonials|home-advisory|contact-form|human-copy|contact-main|contact-card)\b/);
  assert.doesNotMatch(styles, /\.test-page\s+\.hero\b/);
  assert.doesNotMatch(styles, /\.test-page\s+(?:\.editorial-footer|footer)\b/);
});
