import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
test('portfolio project links use matching visible and accessible labels', async () => {
  const html = await readFile(new URL('../out/portfolio/index.html', import.meta.url), 'utf8');
  const links = [...html.matchAll(/<a class="project-link"[^>]*>[\s\S]*?<\/a>/g)];
  assert.ok(links.length >= 48);
  for (const [link] of links) {
    assert.match(link, /aria-label="Conocer el proyecto /);
    assert.match(link, /<span>Conocer el proyecto<\/span>/);
  }
});

test('portfolio colored covers do not repeat project names or category labels', async () => {
  const html = await readFile(new URL('../out/portfolio/index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /class="cover-heading"/);
});
test('portfolio keeps dark text on light surfaces and removes obsolete hero CSS', async () => {
  const css = await readFile(new URL('../app/portfolio/portfolio.css', import.meta.url), 'utf8');
  assert.match(css, /result-count,[\s\S]*?color:#535660/);
  assert.match(css, /search input\{color:#252730\}/);
  const catalogue = await readFile(new URL('../app/portfolio/catalogue.css', import.meta.url), 'utf8');
  assert.doesNotMatch(catalogue, /\.portfolio-cover\{/);
});
