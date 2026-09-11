/* OG cards 1200×630: one default, one per app. Light ground to match the site.
   Run: npm run assets:og. Word wrap uses average glyph width; if a name does
   not fit in two lines, the name is too long for a card. */
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';

const ROOT = new URL('../', import.meta.url).pathname;
const OUT = `${ROOT}public/og/`;
await mkdir(OUT, { recursive: true });

const apps = JSON.parse(await readFile(`${ROOT}src/data/apps.json`, 'utf8'));
const W = 1200;
const H = 630;
const FONT = 'SF Pro Display, -apple-system, Helvetica Neue, Helvetica, Arial, sans-serif';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrap = (text, size, maxWidth) => {
  const max = Math.floor(maxWidth / (size * 0.52));
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
};

const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="44" height="44">
  <defs><linearGradient id="spark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C8894F"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs>
  <rect width="64" height="64" rx="15" fill="#111111"/>
  <rect x="15" y="17" width="30" height="8" rx="3" fill="#ffffff"/>
  <rect x="26" y="17" width="12" height="30" rx="3" fill="#ffffff"/>
  <path d="M49 10 L51.2 16.8 L58 19 L51.2 21.2 L49 28 L46.8 21.2 L40 19 L46.8 16.8 Z" fill="url(#spark)"/>
</svg>`;
const markPng = await sharp(Buffer.from(MARK)).png().toBuffer();

const card = ({ title, sub, iconPng, accent = '#111111' }) => {
  const size = 64;
  /* Cards with an icon reserve the right-hand 320px for it; the icon-less
     default card has the full width to work with, so its wrap limit is wider. */
  const lines = wrap(title, size, iconPng ? 760 : 1000);
  const y0 = 300 - ((lines.length - 1) * size * 1.15) / 2;
  const text = lines
    .map((l, i) => `<text x="80" y="${y0 + i * size * 1.15}" font-family="${FONT}" font-weight="600" font-size="${size}" fill="#111">${esc(l)}</text>`)
    .join('');
  /* Only tint when a real accent is given; the plain black default keeps a pure white ground. */
  const wash = accent === '#111111' ? '' : `<rect width="${W}" height="${H}" fill="${accent}" fill-opacity="0.08"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="#ffffff"/>
    ${wash}
    <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${accent}"/>
    <text x="136" y="120" font-family="${FONT}" font-weight="700" font-size="34" fill="#111">TeroxAI</text>
    ${text}
    <text x="80" y="${H - 80}" font-family="${FONT}" font-size="30" fill="#6e6e73">${esc(sub)}</text>
  </svg>`;
  const layers = [{ input: markPng, left: 80, top: 84 }];
  if (iconPng) layers.push({ input: iconPng, left: W - 80 - 240, top: 195 });
  return sharp(Buffer.from(svg)).composite(layers).png();
};

await card({ title: 'Indie developer. Apps for Mac and iPhone, built with AI.', sub: 'teroxai.com' }).toFile(`${OUT}default.png`);

for (const app of apps) {
  const icon = await sharp(`${ROOT}src/assets/apps/${app.slug}/icon.png`).resize(240, 240).png().toBuffer();
  const rounded = await sharp(icon)
    .composite([{ input: Buffer.from('<svg><rect x="0" y="0" width="240" height="240" rx="52" fill="#fff"/></svg>'), blend: 'dest-in' }])
    .png()
    .toBuffer();
  await card({ title: app.en.name, sub: app.en.tagline, iconPng: rounded, accent: app.accent }).toFile(`${OUT}${app.slug}.png`);
}

/* Photo for the Person JSON-LD, 600 px square. */
await sharp(`${ROOT}src/assets/armen.jpg`).resize(600, 600).jpeg({ quality: 82 }).toFile(`${OUT}armen.jpg`);
console.log(`og: default + ${apps.length} apps + armen.jpg`);
