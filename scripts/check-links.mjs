/* Every external link in dist/ must answer 2xx or 3xx. Run after a build. */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const files = [];
const walk = async (dir) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name.endsWith('.html')) files.push(p);
  }
};
await walk(DIST);

const urls = new Set();
for (const f of files) {
  const html = await readFile(f, 'utf8');
  for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) urls.add(m[1]);
}

let bad = 0;
const check = async (url) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      headers: { 'user-agent': 'Mozilla/5.0 teroxai-linkcheck' },
      signal: AbortSignal.timeout(15000),
    });
    /* LinkedIn answers 999 to anything that is not a browser. */
    if (res.status === 999) {
      console.log(`ok? 999 (LinkedIn bot wall) ${url}`);
      return;
    }
    const ok = res.status < 400;
    console.log(`${ok ? 'ok ' : 'BAD'} ${res.status} ${url}`);
    if (!ok) bad += 1;
  } catch (e) {
    console.log(`BAD err ${url} ${e.message}`);
    bad += 1;
  }
};

/* Eight at a time: fast enough, polite enough. */
const external = [...urls].filter((u) => !u.startsWith('https://teroxai.com'));
for (let i = 0; i < external.length; i += 8) {
  await Promise.all(external.slice(i, i + 8).map(check));
}
console.log(`${external.length} external links, ${bad} bad`);
process.exit(bad ? 1 : 0);
