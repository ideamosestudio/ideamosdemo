import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("mobile benefits stay visible and animated icons center without replacing rotation", async () => {
  const css = await readFile(new URL("../app/mobile-layout-request-2026-09-02.css", import.meta.url), "utf8");
  assert.match(css, /@media\(max-width:700px\)\{[\s\S]*?\.ecommerce \[data-reveal\]\{opacity:1!important;transform:none!important;transition:none!important\}/);
  assert.match(css, /\.benefit-motion\{position:relative!important;display:flex;top:auto!important;left:auto!important;right:auto!important;margin:0 auto 28px!important;translate:none!important/);
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  assert.match(html, /tienda online para automatizar tus ventas/);
  assert.match(html, /convertir<\/b>: estrategia/);
});
