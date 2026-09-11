/* Bundles the site's own client scripts with esbuild and fails if they
   weigh more than 3 KB gzipped together. ClientRouter is Astro's code and is
   not counted; Lighthouse covers its effect. Run after a build: npm run check:budget */
import { build } from 'esbuild';
import { gzipSync } from 'node:zlib';

const LIMIT = 3072;
const result = await build({
  entryPoints: ['src/scripts/reveal.ts', 'src/scripts/showcase.ts'],
  bundle: true,
  minify: true,
  write: false,
  outdir: 'out',
  format: 'esm',
  target: 'es2020',
});
let total = 0;
for (const f of result.outputFiles) {
  const gz = gzipSync(f.contents).length;
  total += gz;
  console.log(`${f.path.split('/').pop()}: ${gz} bytes gzip`);
}
console.log(`total: ${total} bytes gzip (limit ${LIMIT})`);
process.exit(total > LIMIT ? 1 : 0);
