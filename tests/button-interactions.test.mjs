import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cssUrl = new URL("../app/button-interactions.css", import.meta.url);
const layoutUrl = new URL("../app/layout.tsx", import.meta.url);

test("the global CTA interaction layer is loaded last", async () => {
  const layout = await readFile(layoutUrl, "utf8");
  assert.match(layout, /import "\.\/editorial-footer\.css";\s*import "\.\/button-interactions\.css";/);
});

test("CTA hover states keep tracking fixed and only change their visual treatment", async () => {
  const css = await readFile(cssUrl, "utf8");

  assert.match(css, /letter-spacing:1px!important/);
  assert.doesNotMatch(css, /letter-spacing\s*:\s*3px/);
  assert.doesNotMatch(css, /transition:[^;]*letter-spacing/s);
  assert.match(css, /linear-gradient\(105deg,#d84400,#8f1900\)!important/);
  assert.match(css, /linear-gradient\(105deg,#ff6200,#c82400\)!important/);
  assert.match(css, /color:#fff!important/);
});
