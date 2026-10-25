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

test("el teléfono 3D se mantiene encapsulado en la página de prueba", async () => {
  const [home, clone] = await Promise.all([
    readFile(new URL("index.html", out), "utf8"),
    readFile(new URL("test/index.html", out), "utf8"),
  ]);

  assert.doesNotMatch(home, /test-experiment-page|test-phone-3d/);
  assert.match(clone, /test-experiment-page/);
  const component = await readFile(new URL("../app/test/TestPhoneWebGL.tsx", import.meta.url), "utf8");
  assert.match(component, /matchMedia\("\(min-width: 1000px\)"\)/);
  assert.match(component, /new THREE\.WebGLRenderer/);
  assert.match(component, /new THREE\.ExtrudeGeometry/);
  assert.match(component, /\/media\/test\/shop-screen-hq-/);

  for (const number of [1, 2, 3]) {
    const screen = await readFile(new URL(`../public/media/test/shop-screen-hq-${number}.jpg`, import.meta.url));
    assert.ok(screen.byteLength > 1_500_000, `la pantalla ${number} debe conservar la resolución original`);
  }
});
