import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";
const out = new URL("../out/", import.meta.url);
test("el blog es discreto, estático, indexable y enlaza artículos válidos", async () => {
  const xml = await readFile(new URL("sitemap.xml", out), "utf8");
  const urls = [...xml.matchAll(/<loc>(https:\/\/ideamos\.com\.ar\/blog\/.*?)<\/loc>/g)].map(m => m[1]);
  assert.equal(urls.length, 8);
  const titles = new Set();
  const images = new Set();
  let articles = 0;
  for (const url of urls) {
    const html = await readFile(new URL(new URL(url).pathname.slice(1) + "index.html", out), "utf8");
    assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
    assert.doesNotMatch(html, /name="robots" content="[^"]*noindex/);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title)); titles.add(title);
    assert.match(html, /name="description" content="[^"]{80,170}"/);
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    const graph = scripts.flatMap(s => s["@graph"] ?? [s]);
    assert.ok(graph.some(s => s["@type"] === "BreadcrumbList"));
    const article = graph.find(s => s["@type"] === "BlogPosting");
    if (article) {
      articles++;
      assert.ok(!images.has(article.image), "Cada artículo debe tener una imagen propia");
      images.add(article.image);
      const imagePath = new URL(article.image).pathname;
      assert.match(imagePath, /^\/media\/blog\/.+\.webp$/);
      assert.ok(html.includes('property="og:image" content="' + article.image + '"'));
      assert.ok(html.includes('name="twitter:image" content="' + article.image + '"'));
      assert.ok(html.includes('src="' + imagePath + '"'));
      assert.ok(html.includes('width="1200" height="686"'));
      for (const file of [imagePath, imagePath.replace(".webp", "-640.webp")]) {
        const bytes = await readFile(new URL(file.slice(1), out));
        assert.ok(bytes.length < 100000, "Las imágenes deben estar optimizadas");
      }
      assert.equal(article.mainEntityOfPage, url);
      assert.equal(article.author.name, "Ideamos");
      assert.match(html, /href="[^"]*\/contacto\/"/);
      assert.match(html, /href="[^"]*\/portfolio\/"/);
      const body = html.match(/<article class="blog-article"[\s\S]*?<\/article>/)?.[0] ?? "";
      assert.ok(body.replace(/<[^>]+>/g, " ").split(/\s+/).length > 400);
    }
    for (const [, path] of html.matchAll(/href="(\/blog\/[^"#]*)"/g)) await access(new URL(path.slice(1) + "index.html", out));
    assert.doesNotMatch(html, /href="[^"\s]*\/precios\//);
  }
  assert.equal(articles, 5);
  assert.equal(images.size, 5);
  const home = await readFile(new URL("index.html", out), "utf8");
  assert.match(home, /<footer[\s\S]*href="\/blog\/"/);
  const header = await readFile(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(header, /\/blog\//);
});
