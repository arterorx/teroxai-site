/* Favicon and home screen icons from one SVG mark. Run: npm run assets:icons */
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { mkdir, writeFile } from 'node:fs/promises';

const PUB = new URL('../public/', import.meta.url).pathname;
await mkdir(`${PUB}icons`, { recursive: true });

const mark = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="14" fill="#111111"/>
  <text x="32" y="45" text-anchor="middle" font-family="-apple-system, Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="700" font-size="40" fill="#ffffff">T</text>
</svg>`;

await writeFile(`${PUB}favicon.svg`, mark(64));

for (const [name, size] of [
  ['icons/apple-touch-icon.png', 180],
  ['icons/icon-192.png', 192],
  ['icons/icon-512.png', 512],
]) {
  await sharp(Buffer.from(mark(size))).png().toFile(PUB + name);
}

const ico = await Promise.all([16, 32, 48].map((s) => sharp(Buffer.from(mark(s))).png().toBuffer()));
await writeFile(`${PUB}favicon.ico`, await pngToIco(ico));
console.log('icons written');
