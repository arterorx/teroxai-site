/* Downloads up to three App Store screenshots per live app from the iTunes
   Lookup API. Re-run after a release to refresh them: `npm run assets:shots`. */
import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';

const apps = JSON.parse(readFileSync(new URL('../src/data/apps.json', import.meta.url), 'utf8'));
const MAX = 3;

for (const app of apps) {
  if (app.status !== 'live') {
    console.log(`${app.slug}: status "${app.status}", not fetched`);
    continue;
  }
  const res = await fetch(`https://itunes.apple.com/lookup?id=${app.appId}&country=us`);
  if (!res.ok) throw new Error(`${app.slug}: lookup answered ${res.status}`);
  const { results } = await res.json();
  const r = results?.[0];
  if (!r) {
    console.log(`${app.slug}: not in the store, skipped`);
    continue;
  }
  const urls = (r.screenshotUrls?.length ? r.screenshotUrls : r.ipadScreenshotUrls ?? []).slice(0, MAX);
  const dir = new URL(`../src/assets/apps/${app.slug}/`, import.meta.url);
  await mkdir(dir, { recursive: true });
  /* `shotOrder` in apps.json (for example [2, 1, 3]) says which store
     screenshot becomes shot-1, shot-2, shot-3, so a hand-picked lead frame
     survives a re-run. Missing entries keep the store order. */
  const order = app.shotOrder ?? urls.map((_, i) => i + 1);
  let n = 0;
  for (const pick of order) {
    const url = urls[pick - 1];
    if (!url) continue;
    n += 1;
    const big = url.replace(/\/[0-9]+x[0-9]+[a-z-]*\.(png|jpg|jpeg)$/i, '/1284x2778bb.png');
    if (big === url) console.warn(`${app.slug} shot ${n}: unknown URL shape, saving the store size as is: ${url}`);
    const img = await fetch(big);
    if (!img.ok) throw new Error(`${app.slug} shot ${n}: ${img.status}`);
    await writeFile(new URL(`shot-${n}.png`, dir), Buffer.from(await img.arrayBuffer()));
  }
  console.log(`${app.slug}: ${n} screenshots${app.shotOrder ? ` (order ${app.shotOrder.join(',')})` : ''}`);
}
