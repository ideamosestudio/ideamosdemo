import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("footer preserves a static WhatsApp alternative and balanced vector signature", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const footer = html.match(/<footer class="editorial-footer">([\s\S]*?)<\/footer>/)?.[1];
  assert.ok(footer);
  assert.match(footer, /Diseño web y tiendas online para impulsar tu negocio\./);
  assert.match(footer, /aria-label="Contactar a Ideamos por WhatsApp"/);
  assert.match(footer, /ideamos-wordmark-outline.svg/);
  const css = await readFile(new URL("../app/editorial-footer.css", import.meta.url), "utf8");
  assert.match(css, /width:88%;height:auto;margin-inline:auto/);
  assert.match(css, /border-left:1px solid #ffffff12/);
  assert.match(css, /\.ef-bottom a\{[^}]*text-transform:uppercase/);
  assert.match(css, /text-decoration-color:#ff914d/);
  assert.match(css, /\.ef-socials a:is\(:hover,:focus-visible\)/);
  const floating = await readFile(new URL("../app/floating-whatsapp.css", import.meta.url), "utf8");
  assert.match(floating, /\.floating-whatsapp\[hidden\]\{display:none!important\}/);
});
