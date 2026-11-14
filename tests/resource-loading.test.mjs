import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("hero poster preload is limited to the home page", async () => {
  for (const route of ["blog/", "contacto/", "portfolio/"]) {
    const html = await readFile(new URL("../out/" + route + "index.html", import.meta.url), "utf8");
    assert.doesNotMatch(html, /<link[^>]+rel="preload"[^>]+hero-poster/);
  }
});

test("blog listing prioritizes only its first image, related cards remain lazy", async () => {
  const html = await readFile(new URL("../out/blog/index.html", import.meta.url), "utf8");
  const cards = html.match(/<img[^>]+class="blog-card-image"[^>]*>/g);
  assert.ok(cards.length > 1);
  assert.match(cards[0], /loading="eager"/);
  for (const card of cards.slice(1)) assert.match(card, /loading="lazy"/);
});

test("analytics initializes promptly and only once across remounts", async () => {
  const source = await readFile(new URL("../components/DeferredAnalytics.tsx", import.meta.url), "utf8");
  const body = source.split("useEffect(() => {")[1].split("}, [containerId])")[0];
  const nodes = [];
  const window = {};
  const document = {
    getElementById: id => nodes.find(node => node.id === id),
    createElement: () => ({}),
    head: { appendChild: node => nodes.push(node) },
  };
  const initialize = new Function("window", "document", "containerId", body);
  initialize(window, document, "GTM-TEST");
  initialize(window, document, "GTM-TEST");
  assert.equal(nodes.length, 1);
  assert.equal(nodes[0].async, true);
  assert.equal(window.dataLayer.length, 1);
  assert.equal(window.dataLayer[0].event, "gtm.js");
});
