/* Blog covers, 1200×630, dark ground in the site's style. One per translation
   pair, keyed by the `cover` field in the post frontmatter. Each card carries a
   small data-driven visual so the covers are not three copies of one template.
   Run: npm run assets:covers */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const ROOT = new URL('../', import.meta.url).pathname;
const OUT = `${ROOT}public/og/blog/`;
await mkdir(OUT, { recursive: true });

const W = 1200;
const H = 630;
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const SERIF = 'Georgia, Times New Roman, serif';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const MARK = `<g transform="translate(80,506)">
  <rect width="64" height="64" rx="15" fill="#ffffff"/>
  <rect x="15" y="17" width="30" height="8" rx="3" fill="#111"/>
  <rect x="26" y="17" width="12" height="30" rx="3" fill="#111"/>
  <path d="M49 10 L51.2 16.8 L58 19 L51.2 21.2 L49 28 L46.8 21.2 L40 19 L46.8 16.8 Z" fill="url(#g)"/>
</g>
<text x="160" y="533" font-family="${SANS}" font-weight="700" font-size="26" fill="#fff">TeroxAI</text>
<text x="160" y="562" font-family="${SANS}" font-size="20" fill="#9a9aa2">teroxai.com/blog</text>`;

const frame = (kicker, titleLines, visual) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C8894F"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="#111114"/>
  <rect width="${W}" height="8" fill="url(#g)"/>
  <text x="80" y="118" font-family="${SANS}" font-weight="600" font-size="22" fill="#9a9aa2" letter-spacing="3">${esc(kicker)}</text>
  ${titleLines.map((l, i) => `<text x="80" y="${200 + i * 66}" font-family="${SERIF}" font-size="56" fill="#fff">${esc(l)}</text>`).join('')}
  ${visual}
  ${MARK}
</svg>`;

/* ASO: two bars, Vietnam vs US, positions for the head query. */
const asoVisual = `
  <g transform="translate(760,120)">
    <text x="0" y="0" font-family="${SANS}" font-size="20" fill="#9a9aa2">HEAD QUERY, 22 SEP 2026</text>
    <text x="0" y="60" font-family="${SANS}" font-weight="600" font-size="26" fill="#fff">Vietnam</text>
    <rect x="0" y="76" width="340" height="18" rx="9" fill="#26262b"/>
    <rect x="0" y="76" width="330" height="18" rx="9" fill="url(#g)"/>
    <text x="0" y="128" font-family="${SANS}" font-size="22" fill="#c9c9d1">#3 with 17 ratings</text>
    <text x="0" y="200" font-family="${SANS}" font-weight="600" font-size="26" fill="#fff">United States</text>
    <rect x="0" y="216" width="340" height="18" rx="9" fill="#26262b"/>
    <rect x="0" y="216" width="14" height="18" rx="7" fill="#7C5CFF"/>
    <text x="0" y="268" font-family="${SANS}" font-size="22" fill="#c9c9d1">#88 with 75 ratings</text>
  </g>`;

/* App Review: five rounds, four red, one green. */
const reviewVisual = `
  <g transform="translate(760,150)">
    <text x="0" y="0" font-family="${SANS}" font-size="20" fill="#9a9aa2">5 SUBMISSIONS, 15 DAYS</text>
    ${[0, 1, 2, 3].map((i) => `<rect x="${i * 74}" y="30" width="60" height="60" rx="14" fill="#3a1f1f" stroke="#c0564f" stroke-width="2"/>
      <path d="M${i * 74 + 20} 50 L${i * 74 + 40} 70 M${i * 74 + 40} 50 L${i * 74 + 20} 70" stroke="#e0685f" stroke-width="4" stroke-linecap="round"/>`).join('')}
    <rect x="296" y="30" width="60" height="60" rx="14" fill="#1d3226" stroke="#4fae76" stroke-width="2"/>
    <path d="M312 60 L324 72 L344 48" fill="none" stroke="#6fd396" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="0" y="140" font-family="${SANS}" font-size="22" fill="#c9c9d1">2.4.5(iii) · 5.1.1(iv) · 2.1 · 2.1(a)</text>
  </g>`;

/* Money: downloads vs earnings per download, as two pairs of bars. */
const moneyVisual = `
  <g transform="translate(760,120)">
    <text x="0" y="0" font-family="${SANS}" font-size="20" fill="#9a9aa2">PER FIRST DOWNLOAD</text>
    <text x="0" y="60" font-family="${SANS}" font-weight="600" font-size="26" fill="#fff">Sleep Timer, $2.99 once</text>
    <rect x="0" y="76" width="340" height="18" rx="9" fill="#26262b"/>
    <rect x="0" y="76" width="340" height="18" rx="9" fill="url(#g)"/>
    <text x="0" y="128" font-family="${SANS}" font-size="22" fill="#c9c9d1">14× the photo app</text>
    <text x="0" y="200" font-family="${SANS}" font-weight="600" font-size="26" fill="#fff">AI Photo Generator</text>
    <rect x="0" y="216" width="340" height="18" rx="9" fill="#26262b"/>
    <rect x="0" y="216" width="24" height="18" rx="9" fill="#C8894F"/>
    <text x="0" y="268" font-family="${SANS}" font-size="22" fill="#c9c9d1">40× the downloads</text>
  </g>`;

const covers = [
  { id: 'aso', kicker: 'APP STORE OPTIMIZATION', title: ['App Store keywords:', 'what moved rankings', 'and what did not'], visual: asoVisual },
  { id: 'app-review', kicker: 'MAC APP STORE · APP REVIEW', title: ['Four rejections', 'in 15 days: a Mac app', 'post-mortem'], visual: reviewVisual },
  { id: 'money', kicker: 'TWO YEARS OF SHIPPING SOLO', title: ['Seven apps: what', 'made money and', 'what did not'], visual: moneyVisual },
];

for (const c of covers) {
  await sharp(Buffer.from(frame(c.kicker, c.title, c.visual))).png().toFile(`${OUT}${c.id}.png`);
}
console.log(`covers: ${covers.map((c) => c.id).join(', ')}`);
