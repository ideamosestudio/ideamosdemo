import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
test("priority services link two relevant published guides without promoting prices", async () => {
  for (const path of ["diseno-web-autoadministrable", "tiendas-online"]) {
    const html = await readFile(new URL(`../out/${path}/index.html`, import.meta.url), "utf8");
    const nav = html.match(/<nav class="service-faq__reading"[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav);
    const links = [...nav.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    assert.equal(links.length, 2);
    for (const link of links) {
      assert.match(link, /^\/blog\//);
      await access(new URL(`../out${link}index.html`, import.meta.url));
    }
    assert.doesNotMatch(html, /href="[^"]*\/precios\//);
  }
});
