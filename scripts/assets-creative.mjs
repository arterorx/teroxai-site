/* Images for the creative-assets article: downsized store creatives, the
   App Store Connect screenshots (asset ID painted over) and a size diagram
   in English and German.
   Run: node scripts/assets-creative.mjs <dir with store creatives> <asc list png> <asc detail png> */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const [SRC, ASC_LIST, ASC_DETAIL] = process.argv.slice(2);
const OUT = new URL('../src/assets/blog/creative-assets/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

if (SRC) {
  for (const [dir, tag] of [['en-US', 'en'], ['de-DE', 'de']]) {
    await sharp(`${SRC}/${dir}/header_3840x1646.png`).resize(1600).png({ palette: true, quality: 90 }).toFile(`${OUT}header-${tag}.png`);
    await sharp(`${SRC}/${dir}/search_3840x2560.png`).resize(1600).png({ palette: true, quality: 90 }).toFile(`${OUT}search-${tag}.png`);
  }
  await sharp(`${SRC}/ar-SA/search_3840x2560.png`).resize(1600).png({ palette: true, quality: 90 }).toFile(`${OUT}search-ar.png`);
}
if (ASC_LIST) await sharp(ASC_LIST).extract({ left: 380, top: 180, width: 1528, height: 1216 }).png({ palette: true }).toFile(`${OUT}asc-asset-library.png`);
if (ASC_DETAIL) {
  /* Crop first, then paint over the asset ID: sharp applies extract before composite. */
  const crop = await sharp(ASC_DETAIL).extract({ left: 130, top: 180, width: 1660, height: 960 }).png().toBuffer();
  const cover = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="420" height="36"><rect width="420" height="36" rx="6" fill="#e9e9ee"/></svg>');
  await sharp(crop).composite([{ input: cover, left: 118, top: 256 }]).png({ palette: true }).toFile(`${OUT}asc-asset-detail.png`);
}

const W = 1600, H = 760;
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const INK = '#111111', INK3 = '#6e6e73';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const T = {
  en: {
    title: 'App Store creative asset sizes', sub: 'Images, in pixels. Shapes drawn to the same scale',
    items: [['Product page header', '3840 × 1646', '21:9, exact size'], ['Search results', '3840 × 2560', '3:2, from 1920 × 1280'], ['Universal, both places', '5244 × 2950', '16:9, PNG only']],
  },
  de: {
    title: 'Größen der Creative Assets im App Store', sub: 'Bilder, in Pixeln. Formen im selben Maßstab',
    items: [['Kopfbild der Produktseite', '3840 × 1646', '21:9, exakte Größe'], ['Suchergebnisse', '3840 × 2560', '3:2, ab 1920 × 1280'], ['Universal, beide Plätze', '5244 × 2950', '16:9, nur PNG']],
  },
};
const dims = [[3840, 1646], [3840, 2560], [5244, 2950]];
const k = 0.105, gap = 60, base = 560;
for (const [lang, t] of Object.entries(T)) {
  let x = 80, body = '';
  dims.forEach(([w, h], i) => {
    const rw = Math.round(w * k), rh = Math.round(h * k);
    body += `<rect x="${x}" y="${base - rh}" width="${rw}" height="${rh}" rx="14" fill="${i === 2 ? '#ededf1' : 'url(#g)'}" ${i === 2 ? 'stroke="#c9c9d1" stroke-width="2" stroke-dasharray="8 8"' : ''}/>
      <text x="${x + rw / 2}" y="${base - rh / 2 + 12}" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="34" fill="${i === 2 ? INK : '#fff'}">${t.items[i][1]}</text>
      <text x="${x}" y="${base + 52}" font-family="${SANS}" font-weight="600" font-size="28" fill="${INK}">${esc(t.items[i][0])}</text>
      <text x="${x}" y="${base + 90}" font-family="${SANS}" font-size="22" fill="${INK3}">${esc(t.items[i][2])}</text>`;
    x += rw + gap;
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C8894F"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs>
    <rect width="${W}" height="${H}" rx="28" fill="#fafafb"/>
    <text x="80" y="104" font-family="${SANS}" font-weight="700" font-size="44" fill="${INK}">${esc(t.title)}</text>
    <text x="80" y="152" font-family="${SANS}" font-size="28" fill="${INK3}">${esc(t.sub)}</text>${body}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`${OUT}sizes-${lang}.png`);
}
console.log('creative-assets images written');
