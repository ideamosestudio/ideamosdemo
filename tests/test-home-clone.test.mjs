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
  assert.doesNotMatch(styles, /\.test-page\s+\.hero\b/);
  assert.doesNotMatch(styles, /\.test-page\s+(?:\.editorial-footer|footer)\b/);
});
