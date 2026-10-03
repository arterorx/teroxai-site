/* Charts for the Postklar article, English and German. Numbers from the
   project's evaluation reports of 27 September 2026 (50 synthetic letters).
   Run: node scripts/charts-postklar.mjs */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = new URL('../src/assets/blog/postklar/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });
const W = 1600;
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const INK = '#111111', INK2 = '#3a3a3c', INK3 = '#6e6e73', MUTED = '#d6d6dc';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const defs = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C8894F"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs>`;
const frame = (h, title, sub, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}">${defs}
  <rect width="${W}" height="${h}" rx="28" fill="#fafafb"/>
  <text x="80" y="104" font-family="${SANS}" font-weight="700" font-size="44" fill="${INK}">${esc(title)}</text>
  <text x="80" y="152" font-family="${SANS}" font-size="28" fill="${INK3}">${esc(sub)}</text>${body}</svg>`;
const bar = (y, label, note, pct, valueText, hot) => {
  const x0 = 80, labelW = 420, max = W - 160 - labelW - 190;
  const w = Math.round((max * pct) / 100);
  return `<text x="${x0}" y="${y + 40}" font-family="${SANS}" font-weight="600" font-size="32" fill="${INK}">${esc(label)}</text>
    <text x="${x0}" y="${y + 76}" font-family="${SANS}" font-size="22" fill="${INK3}">${esc(note)}</text>
    <rect x="${x0 + labelW}" y="${y + 10}" width="${max}" height="46" rx="23" fill="#ededf1"/>
    <rect x="${x0 + labelW}" y="${y + 10}" width="${w}" height="46" rx="23" fill="${hot ? 'url(#g)' : MUTED}"/>
    <text x="${x0 + labelW + max + 24}" y="${y + 44}" font-family="${SANS}" font-weight="700" font-size="32" fill="${INK}">${esc(valueText)}</text>`;
};
const T = {
  en: {
    a: ['Deadlines found in 50 test letters', 'Same letters, same day, two models'],
    device: ['On the iPhone', 'Apple model, about 25 s per letter'],
    cloud: ['In the cloud', 'about 8 s per letter'],
    b: ['Three runs in one day', 'Share of deadlines found, 50 letters, 27 September 2026'],
    runs: [['First run, 16:18', '7 invented values'], ['Second run, 16:27', '9 invented values'], ['Final run, 22:37', '4 invented values']],
    target: 'target 95 %',
    pct: (v) => `${v} %`,
  },
  de: {
    a: ['Gefundene Fristen in 50 Testbriefen', 'Dieselben Briefe, derselbe Tag, zwei Modelle'],
    device: ['Auf dem iPhone', 'Apple-Modell, etwa 25 s pro Brief'],
    cloud: ['In der Cloud', 'etwa 8 s pro Brief'],
    b: ['Drei Durchläufe an einem Tag', 'Anteil gefundener Fristen, 50 Briefe, 27. September 2026'],
    runs: [['Erster Lauf, 16:18', '7 erfundene Werte'], ['Zweiter Lauf, 16:27', '9 erfundene Werte'], ['Letzter Lauf, 22:37', '4 erfundene Werte']],
    target: 'Ziel 95 %',
    pct: (v) => `${String(v).replace('.', ',')} %`,
  },
};
for (const [lang, t] of Object.entries(T)) {
  const a = bar(230, t.device[0], t.device[1], 40, t.pct(40), false) + bar(350, t.cloud[0], t.cloud[1], 87, t.pct(87), true);
  await sharp(Buffer.from(frame(500, t.a[0], t.a[1], a))).png().toFile(`${OUT}device-vs-cloud-${lang}.png`);
  const vals = [74.3, 74.3, 87.1];
  const x0 = 80 + 420, max = W - 160 - 420 - 190, tx = x0 + Math.round(max * 0.95);
  const b = vals.map((v, i) => bar(230 + i * 120, t.runs[i][0], t.runs[i][1], v, t.pct(v), i === 2)).join('') +
    `<line x1="${tx}" y1="215" x2="${tx}" y2="560" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/>
     <text x="${tx}" y="600" text-anchor="middle" font-family="${SANS}" font-weight="600" font-size="24" fill="${INK2}">${esc(t.target)}</text>`;
  await sharp(Buffer.from(frame(640, t.b[0], t.b[1], b))).png().toFile(`${OUT}runs-${lang}.png`);
}
console.log('charts: device-vs-cloud, runs × en, de');
