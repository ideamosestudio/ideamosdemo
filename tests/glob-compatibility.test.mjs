import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
const require = createRequire(import.meta.url);
const fromNext = createRequire(require.resolve('@next/eslint-plugin-next'));
const { globSync } = fromNext('fast-glob');
test('Next root directory discovery supports literal and wildcard paths without braces', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'ideamos-glob-'));
  try {
    mkdirSync(path.join(root, 'sites', 'one'), { recursive: true });
    mkdirSync(path.join(root, 'sites', 'two'), { recursive: true });
    writeFileSync(path.join(root, 'sites', 'file.txt'), 'fixture');
    assert.deepEqual(globSync('sites/*', { cwd: root, onlyDirectories: true }).sort(), ['sites/one', 'sites/two']);
    assert.deepEqual(globSync('sites/one', { cwd: root, onlyDirectories: true }), ['sites/one']);
    assert.deepEqual(globSync('absent/*', { cwd: root, onlyDirectories: true }), []);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
