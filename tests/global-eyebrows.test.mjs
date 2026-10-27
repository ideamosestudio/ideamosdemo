import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('todos los eyebrows comparten la regla tipográfica editorial', async () => {
  const css = await readFile(new URL('../app/eyebrows.css', import.meta.url), 'utf8');
  const rule = css.match(/\/\* Regla tipográfica global para todos los eyebrows del sitio\. \*\/([\s\S]*?)\n\}/)?.[1] ?? '';

  for (const selector of [
    '.availability',
    '[class*="eyebrow"]',
    '[class*="kicker"]',
    '.service-heading',
    '.home-testimonials__copy',
    '.pw-intro',
    '.pricing-heading',
  ]) {
    assert.ok(rule.includes(selector), `Falta cubrir el eyebrow ${selector}`);
  }

  assert.match(rule, /font:700 13px\/1\.5 "Poppins",Arial,sans-serif!important/);
  assert.match(rule, /letter-spacing:\.42em!important/);
  assert.doesNotMatch(rule, /color:/);
});
