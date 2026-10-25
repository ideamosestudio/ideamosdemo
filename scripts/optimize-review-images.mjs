import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
const output = 'public/revision/diseno-web-assets';
await mkdir(output, { recursive: true });
for (const name of ['xtreme-service', 'wilde-cell-001', 'wilde-cell-002', 'wilde-cell-003']) {
  const source = `public/media/${name}.${name === 'xtreme-service' ? 'webp' : 'png'}`;
  const widths = name === 'xtreme-service' ? [480,800] : [360,525];
  for (const width of widths) {
    const target = `${output}/${name}-${width}.webp`;
    await sharp(source).resize({width,withoutEnlargement:true}).webp({quality:85,effort:6}).toFile(target);
    console.log(target, (await stat(target)).size);
  }
}
