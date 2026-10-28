import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const moduleLines = [
  'Creamos webs que transmiten autoridad y convierten visitas en consultas.',
  'Diseño y contenido trabajan juntos para potenciar tu negocio.',
  'Analizamos tus objetivos y proponemos mejoras concretas.',
  'Charlemos de tu proyecto y encontremos la mejor solución.',
  'Atraemos personas que ya buscan lo que ofrecés y generamos consultas.',
  'Combinamos SEO y Google Ads para darte visibilidad y mejores resultados.',
  'Medimos llamadas y mensajes para invertir donde realmente rinde.',
  'Hablemos de tu negocio y armemos una estrategia para crecer.',
];

test('los dos módulos base de Home respetan cuatro líneas editoriales', async () => {
  const source = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
  const css = source + await readFile(new URL('../app/split-module-consistency.css', import.meta.url), 'utf8');

  assert.equal((source.match(/<span className="module-base-copy__group">/g) ?? []).length, 4);
  assert.equal((source.match(/<span className="module-base-copy__line">/g) ?? []).length, 8);
  assert.ok(moduleLines.every((line) => line.length <= 80));
  assert.match(source, /Charlemos de tu proyecto/);
  assert.match(source, /Hablemos de tu negocio/);
  assert.match(css, /font:300 15px\/1\.65/);
  assert.match(css, /max-width:600px/);
  assert.match(css, /margin-top:1\.65em/);
  assert.match(css, /hyphens:none/);
});
