import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("related navigation includes portfolio and marketing links to ecommerce", async () => {
  for (const slug of ["diseno-web-autoadministrable", "tiendas-online", "posicionamiento-web", "marketing-digital"]) {
    const html = await readFile(new URL(`../out/${slug}/index.html`, import.meta.url), "utf8");
    const nav = html.match(/<nav class="service-faq__related"[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav, slug);
    assert.match(nav, /href="[^"]*\/portfolio\/"/);
    assert.doesNotMatch(nav, /href="[^"]*\/(?:precios|blog)\//);
    if (slug === "marketing-digital") assert.match(nav, /href="[^"]*\/tiendas-online\/"/);
    const links = [...nav.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(links).size, links.length);
  }
});
