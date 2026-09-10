/* Refreshes the `store` block of every app from the public iTunes Lookup API:
   rating, rating count, version, download price. Nothing else in apps.json is touched.
   Run: npm run data:store */
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/data/apps.json', import.meta.url);
const apps = JSON.parse(await readFile(FILE, 'utf8'));
const today = new Date().toISOString().slice(0, 10);

for (const app of apps) {
  const res = await fetch(`https://itunes.apple.com/lookup?id=${app.appId}&country=us`);
  if (!res.ok) throw new Error(`${app.slug}: lookup answered ${res.status}`);
  const { results } = await res.json();
  const r = results?.[0];
  if (!r) {
    console.log(`${app.slug}: not in the store (status stays "${app.status}")`);
    continue;
  }
  const count = r.userRatingCount ?? 0;
  app.store = {
    rating: count > 0 ? Math.round(r.averageUserRating * 10) / 10 : null,
    ratingCount: count,
    version: r.version,
    /* Download price of the app itself (0 for free apps with in-app purchases). */
    price: r.price ?? 0,
    currency: r.currency ?? 'USD',
    fetchedAt: today,
  };
  if (app.status === 'review') {
    app.status = 'live';
    console.log(`${app.slug}: now in the store, status → live`);
  }
  console.log(`${app.slug}: v${r.version}, ${count} ratings`);
}

await writeFile(FILE, JSON.stringify(apps, null, 2) + '\n');
