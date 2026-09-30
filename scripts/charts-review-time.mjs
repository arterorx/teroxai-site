/* Charts for the App Store review time article, English and German.
   Light ground to sit inside the article. Numbers come from
   private/app-review-data (see the article's "How I measured").
   Run: node scripts/charts-review-time.mjs */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = new URL('../src/assets/blog/review-time/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

const W = 1600;
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const INK = '#111111';
const INK2 = '#3a3a3c';
const INK3 = '#6e6e73';
const RULE = '#e5e5ea';
const MUTED = '#d6d6dc';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const defs = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C8894F"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient>
<linearGradient id="gv" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#C8894F"/><stop offset="1" stop-color="#7C5CFF"/></linearGradient></defs>`;
const frame = (h, title, sub, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${h}">${defs}
  <rect width="${W}" height="${h}" rx="28" fill="#fafafb"/>
  <text x="80" y="104" font-family="${SANS}" font-weight="700" font-size="44" fill="${INK}">${esc(title)}</text>
  <text x="80" y="152" font-family="${SANS}" font-size="28" fill="${INK3}">${esc(sub)}</text>
  ${body}
</svg>`;

const T = {
  en: {
    a_title: 'Where the day goes',
    a_sub: 'Median submission, 61 decisions, April to September 2026',
    submit: 'Submit',
    queue: 'Waiting for Review',
    queueV: '19.6 hours',
    review: 'In Review',
    reviewV: '36 min',
    decision: 'Decision',
    rej: 'A rejection sends you back to the start: about 2 more days',
    b_title: 'Time in the queue',
    b_sub: 'From "Waiting for Review" to "In Review", 61 submissions',
    buckets: ['under 6 h', '6 to 12 h', '12 to 24 h', '1 to 2 days', '2 to 4 days', 'over 4 days'],
    median: 'median 19.6 h',
    c_title: 'Queue by month',
    c_sub: 'Median hours in "Waiting for Review"',
    months: ['July', 'August', 'September'],
    n: (k) => `${k} submissions`,
    hours: (h) => `${h} h`,
  },
  de: {
    a_title: 'Wohin der Tag geht',
    a_sub: 'Median-Einreichung, 61 Entscheidungen, April bis September 2026',
    submit: 'Einreichen',
    queue: 'Waiting for Review',
    queueV: '19,6 Stunden',
    review: 'In Review',
    reviewV: '36 min',
    decision: 'Entscheidung',
    rej: 'Eine Ablehnung schickt dich zurück an den Start: etwa 2 Tage mehr',
    b_title: 'Zeit in der Warteschlange',
    b_sub: 'Von „Waiting for Review“ bis „In Review“, 61 Einreichungen',
    buckets: ['unter 6 h', '6 bis 12 h', '12 bis 24 h', '1 bis 2 Tage', '2 bis 4 Tage', 'über 4 Tage'],
    median: 'Median 19,6 h',
    c_title: 'Warteschlange nach Monat',
    c_sub: 'Median der Stunden in „Waiting for Review“',
    months: ['Juli', 'August', 'September'],
    n: (k) => `${k} Einreichungen`,
    hours: (h) => `${String(h).replace('.', ',')} h`,
  },
};

for (const [lang, t] of Object.entries(T)) {
  /* A. Anatomy of a submission: queue vs review, to scale. */
  {
    const x0 = 80, x1 = W - 80, y = 300, H = 56;
    const total = 19.6 + 0.6;
    const qW = Math.round(((x1 - x0) * 19.6) / total);
    const rW = Math.max(18, x1 - x0 - qW);
    const body = `
      <circle cx="${x0}" cy="${y + H / 2}" r="0"/>
      <rect x="${x0}" y="${y}" width="${qW}" height="${H}" rx="14" fill="${MUTED}"/>
      <rect x="${x0 + qW - 14}" y="${y}" width="${rW + 14}" height="${H}" rx="14" fill="url(#g)"/>
      <text x="${x0 + 28}" y="${y + 38}" font-family="${SANS}" font-weight="600" font-size="28" fill="${INK2}">${esc(t.queue)} · ${esc(t.queueV)}</text>
      <line x1="${x1 - rW / 2}" y1="${y - 14}" x2="${x1 - rW / 2}" y2="${y - 54}" stroke="${INK3}" stroke-width="2"/>
      <text x="${x1}" y="${y - 66}" text-anchor="end" font-family="${SANS}" font-weight="700" font-size="30" fill="${INK}">${esc(t.review)} · ${esc(t.reviewV)}</text>
      <text x="${x0}" y="${y + H + 50}" font-family="${SANS}" font-size="26" fill="${INK3}">${esc(t.submit)}</text>
      <text x="${x1}" y="${y + H + 50}" text-anchor="end" font-family="${SANS}" font-size="26" fill="${INK3}">${esc(t.decision)}</text>
      <path d="M${x1 - 40} ${y + H + 110} C ${x1 - 200} ${y + H + 190}, ${x0 + 200} ${y + H + 190}, ${x0 + 20} ${y + H + 110}" fill="none" stroke="#C0564F" stroke-width="3" stroke-dasharray="10 8"/>
      <path d="M${x0 + 20} ${y + H + 110} l 16 -2 l -8 14 z" fill="#C0564F"/>
      <text x="${W / 2}" y="${y + H + 225}" text-anchor="middle" font-family="${SANS}" font-size="28" fill="#A2413B">${esc(t.rej)}</text>`;
    await sharp(Buffer.from(frame(640, t.a_title, t.a_sub, body))).png().toFile(`${OUT}anatomy-${lang}.png`);
  }
  /* B. Queue histogram. */
  {
    const counts = [9, 5, 20, 11, 10, 6];
    const max = 20, x0 = 120, base = 640, top = 230, bw = 180, gap = 44;
    const bars = counts
      .map((v, i) => {
        const h = Math.round(((base - top) * v) / max);
        const x = x0 + i * (bw + gap);
        return `<rect x="${x}" y="${base - h}" width="${bw}" height="${h}" rx="16" fill="${i === 2 ? 'url(#gv)' : MUTED}"/>
          <text x="${x + bw / 2}" y="${base - h - 18}" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="34" fill="${INK}">${v}</text>
          <text x="${x + bw / 2}" y="${base + 44}" text-anchor="middle" font-family="${SANS}" font-size="26" fill="${INK2}">${esc(t.buckets[i])}</text>`;
      })
      .join('');
    const mx = x0 + 2 * (bw + gap) + bw * ((19.6 - 12) / 12);
    const body = `<line x1="${x0 - 20}" y1="${base}" x2="${W - 80}" y2="${base}" stroke="${RULE}" stroke-width="2"/>${bars}
      <line x1="${mx}" y1="${top - 20}" x2="${mx}" y2="${base}" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/>
      <text x="${mx + 12}" y="${top - 26}" font-family="${SANS}" font-weight="600" font-size="26" fill="${INK}">${esc(t.median)}</text>`;
    await sharp(Buffer.from(frame(740, t.b_title, t.b_sub, body))).png().toFile(`${OUT}queue-${lang}.png`);
  }
  /* C. Queue by month. */
  {
    const data = [[32, 9], [40, 14], [18, 35]];
    const max = 44, x0 = 80, labelW = 250, barMax = W - 160 - labelW - 160;
    const rows = data
      .map(([h, n], i) => {
        const y = 230 + i * 120;
        const w = Math.round((barMax * h) / max);
        return `<text x="${x0}" y="${y + 40}" font-family="${SANS}" font-weight="600" font-size="32" fill="${INK}">${esc(t.months[i])}</text>
          <text x="${x0}" y="${y + 76}" font-family="${SANS}" font-size="22" fill="${INK3}">${esc(t.n(n))}</text>
          <rect x="${x0 + labelW}" y="${y + 10}" width="${barMax}" height="46" rx="23" fill="#ededf1"/>
          <rect x="${x0 + labelW}" y="${y + 10}" width="${w}" height="46" rx="23" fill="${i === 2 ? 'url(#g)' : MUTED}"/>
          <text x="${x0 + labelW + w + 20}" y="${y + 44}" font-family="${SANS}" font-weight="700" font-size="32" fill="${INK}">${esc(t.hours(h))}</text>`;
      })
      .join('');
    await sharp(Buffer.from(frame(620, t.c_title, t.c_sub, rows))).png().toFile(`${OUT}months-${lang}.png`);
  }
}
console.log('charts: anatomy, queue, months × en, de');
