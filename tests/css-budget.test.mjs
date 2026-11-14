import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

test("route CSS stays within the optimized uncompressed size budgets", async () => {
  const out = new URL("../out/", import.meta.url);
  const budgets = { "": 256000, "blog/": 247000, "contacto/": 253000, "portfolio/": 284000, "tiendas-online/": 259000 };
  for (const [route, budget] of Object.entries(budgets)) {
    const html = await readFile(new URL(route + "index.html", out), "utf8");
    const links = html.match(/<link\b[^>]*>/g) ?? [];
    const styles = links.filter(link => /rel="stylesheet"/.test(link)).map(link => link.match(/href="([^"]+)"/)[1]);
    let bytes = 0;
    for (const style of new Set(styles)) {
      const relative = style.replace(/^.*\/_next\//, "_next/");
      bytes += (await stat(new URL(relative, out))).size;
    }
    assert.ok(bytes <= budget, `${route || "/"}: ${bytes} CSS bytes exceeds ${budget}`);
  }
});

test("gallery visibility does not override CSS hover and keyboard pauses", async () => {
  const source = await readFile(new URL("../app/casos-de-exito/CasesGallery.tsx", import.meta.url), "utf8");
  assert.match(source, /removeProperty\("animation-play-state"\)/);
  assert.doesNotMatch(source, /animationPlayState\s*=\s*["']running/);
});
