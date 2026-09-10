import { test } from 'node:test';
import assert from 'node:assert/strict';
import { APPS, liveApps, appBySlug, storeUrl, platformKey } from '../src/lib/apps.ts';

test('eight apps, unique slugs and ids, ordered by the order field', () => {
  assert.equal(APPS.length, 8);
  assert.equal(new Set(APPS.map((a) => a.slug)).size, 8);
  assert.equal(new Set(APPS.map((a) => a.appId)).size, 8);
  assert.deepEqual(APPS.map((a) => a.order), [1, 2, 3, 4, 5, 6, 7, 8]);
});

test('live apps exclude anything still in review', () => {
  assert.ok(liveApps().every((a) => a.status === 'live'));
  assert.ok(liveApps().length <= APPS.length);
});

test('store url points at apps.apple.com with the app id', () => {
  const a = appBySlug('sawkit');
  assert.ok(a);
  assert.equal(storeUrl(a), 'https://apps.apple.com/app/id6796480019');
});

test('platform key folds ios+ipados into ios and detects both', () => {
  assert.equal(platformKey(['ios', 'ipados']), 'ios');
  assert.equal(platformKey(['macos']), 'macos');
  assert.equal(platformKey(['ios', 'ipados', 'macos']), 'both');
});

test('every app has english and german copy with at least three features', () => {
  for (const a of APPS) {
    for (const lang of ['en', 'de'] as const) {
      assert.ok(a[lang].name.length > 0, `${a.slug} ${lang} name`);
      assert.ok(a[lang].tagline.length > 0, `${a.slug} ${lang} tagline`);
      assert.ok(a[lang].features.length >= 3, `${a.slug} ${lang} features`);
    }
  }
});
