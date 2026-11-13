import sharp from 'sharp';
import { resolve } from 'node:path';
const [input, name] = process.argv.slice(2);
if (!input || !/^[a-z0-9-]+$/.test(name ?? '')) throw new Error('Use: node scripts/prepare-blog-cover.mjs input.png asset-name');
for (const width of [1200, 640]) {
  const output = resolve('public/media/blog', name + (width === 640 ? '-640' : '') + '.webp');
  const info = await sharp(input).resize(width, Math.round(width * 686 / 1200), {fit:'cover'}).webp({quality:72, effort:6}).toFile(output);
  if (info.size >= 100000) throw new Error(`Image budget exceeded: ${output}`);
  console.log(output, info.size);
}
