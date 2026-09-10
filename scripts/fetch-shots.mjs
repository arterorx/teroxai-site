/* Downloads up to three App Store screenshots per live app from the iTunes
   Lookup API. Re-run after a release to refresh them: `npm run assets:shots`. */
import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';

const apps = JSON.parse(readFileSync(new URL('../src/data/apps.json', import.meta.url), 'utf8'));
const MAX = 3;

for (const app of apps) {
  if (app.status !== 'live') continue;
  const res = await fetch(`https://itunes.apple.com/lookup?id=${app.appId}&country=us`);
  const { results } = await res.json();
  const r = results[0];
  if (!r) {
    console.log(`${app.slug}: not in the store, skipped`);
    continue;
  }
  const urls = (r.screenshotUrls?.length ? r.screenshotUrls : r.ipadScreenshotUrls ?? []).slice(0, MAX);
  const dir = new URL(`../src/assets/apps/${app.slug}/`, import.meta.url);
  await mkdir(dir, { recursive: true });
  let n = 0;
  for (const url of urls) {
    n += 1;
    const big = url.replace(/\/[0-9]+x[0-9]+[a-z-]*\.(png|jpg|jpeg)$/i, '/1284x2778bb.png');
    const img = await fetch(big);
    if (!img.ok) throw new Error(`${app.slug} shot ${n}: ${img.status}`);
    await writeFile(new URL(`shot-${n}.png`, dir), Buffer.from(await img.arrayBuffer()));
  }
  console.log(`${app.slug}: ${n} screenshots`);
}
