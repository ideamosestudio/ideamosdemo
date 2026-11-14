import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

test("animations pause outside the viewport, in hidden tabs and with reduced motion", async () => {
  const source = await readFile(new URL("../lib/visible-activity.ts", import.meta.url), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  let intersect;
  let disconnected = false;
  const listeners = new Map();
  const motion = { matches: false, addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name) };
  const document = { hidden: false, addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name) };
  const window = { matchMedia: () => motion };
  class Observer {
    constructor(fn) { intersect = fn; }
    observe() {}
    disconnect() { disconnected = true; }
  }
  const exports = {};
  new Function("exports", "window", "document", "IntersectionObserver", js)(exports, window, document, Observer);
  const states = [];
  const cleanup = exports.observeVisibleActivity({}, active => states.push(active));
  assert.equal(states.at(-1), false);
  intersect([{ isIntersecting: true }]);
  assert.equal(states.at(-1), true);
  document.hidden = true; listeners.get("visibilitychange")();
  assert.equal(states.at(-1), false);
  document.hidden = false; listeners.get("visibilitychange")();
  assert.equal(states.at(-1), true);
  motion.matches = true; listeners.get("change")();
  assert.equal(states.at(-1), false);
  motion.matches = false; listeners.get("change")();
  assert.equal(states.at(-1), true);
  intersect([{ isIntersecting: false }]);
  assert.equal(states.at(-1), false);
  cleanup();
  assert.equal(disconnected, true);
  assert.equal(listeners.size, 0);
  assert.equal(states.at(-1), false);
});
