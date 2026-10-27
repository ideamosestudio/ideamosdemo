import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('los textos descriptivos de 15 px sobre fondos claros usan Roboto Light y negro pleno', async () => {
  const css = await readFile(new URL('../app/button-spacing.css', import.meta.url), 'utf8');
  const rule = css.match(/Regla global de legibilidad:[\s\S]*?\n\}/)?.[0] ?? '';

  assert.match(css, /src:url\("\/fonts\/Roboto-Light\.ttf"\)/);
  assert.match(rule, /color:#000!important/);
  assert.match(rule, /font-family:"Roboto Light","Roboto",Arial,sans-serif!important/);
  assert.match(rule, /font-size:15px!important/);
  assert.match(rule, /font-weight:300!important/);
});
