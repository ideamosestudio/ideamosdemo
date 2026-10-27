import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cssUrl = new URL("../app/editorial-footer.css", import.meta.url);
const layoutUrl = new URL("../app/layout.tsx", import.meta.url);

test("the global CTA interaction layer is loaded last", async () => {
  const layout = await readFile(layoutUrl, "utf8");
  assert.match(layout, /import "\.\/portfolio-links\.css";\s*import "\.\/editorial-footer\.css";/);
});

test("CTA hover states add one pixel of tracking while navigation stays fixed", async () => {
  const css = await readFile(cssUrl, "utf8");

  assert.match(css, /letter-spacing:1px!important/);
  assert.match(css, /transition:letter-spacing \.28s ease/);
  assert.match(css, /letter-spacing:2px!important/);
  assert.match(css, /\.nav \.nav-contact:is\(:hover,:focus-visible\):not\(:disabled\)[^{]*\{[^}]*letter-spacing:1px!important/s);
  assert.match(css, /linear-gradient\(105deg,#d84400,#8f1900\)!important/);
  assert.match(css, /linear-gradient\(105deg,#ff6200,#c82400\)!important/);
  assert.match(css, /color:#fff!important/);
});
