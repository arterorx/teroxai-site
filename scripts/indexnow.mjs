/* Tells IndexNow (Bing, Yandex and others) about every URL in the sitemap.
   Google does not take IndexNow; it reads the sitemap from Search Console.
   The key file lives in public/<key>.txt. Run after a deploy: node scripts/indexnow.mjs */
import { readdir, readFile } from 'node:fs/promises';

const HOST = 'teroxai.com';
const PUB = new URL('../public/', import.meta.url);
const keyFile = (await readdir(PUB)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('no IndexNow key file in public/');
const key = (await readFile(new URL(keyFile, PUB), 'utf8')).trim();

const index = await (await fetch(`https://${HOST}/sitemap-index.xml`)).text();
const sitemaps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urls = [];
for (const sm of sitemaps) {
  const xml = await (await fetch(sm)).text();
  urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} for ${urls.length} URLs`);
if (res.status >= 400) throw new Error(await res.text());
