import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
test("el video de asesoría reserva proporción cuadrada y un poster coincidente", async () => {
  const root = new URL("../", import.meta.url);
  const html = await readFile(new URL("out/index.html", root), "utf8");
  const video = html.match(/<video[^>]*width="1254"[^>]*>/)?.[0];
  assert.ok(video);
  assert.match(video, /height="1254"/);
  assert.match(video, /aspect-ratio:1254 \/ 1254/);
  assert.match(video, /preload="none"/);
  const source = await readFile(new URL("components/SharedHomeSections.tsx", root), "utf8");
  assert.match(source, /human-poster-square\.webp/);
  const metadata = await sharp(await readFile(new URL("public/media/human-poster-square.webp", root))).metadata();
  assert.equal(metadata.width, metadata.height);
});
