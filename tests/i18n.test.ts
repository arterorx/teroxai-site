import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localePath, clusterFor, LOCALES, DEFAULT_LOCALE } from '../src/i18n/config.ts';

test('english lives on the root, german under /de/', () => {
  assert.equal(localePath('en'), '/');
  assert.equal(localePath('de'), '/de/');
  assert.equal(localePath('en', 'apps/sawkit'), '/apps/sawkit/');
  assert.equal(localePath('de', 'apps/sawkit'), '/de/apps/sawkit/');
});

test('a cluster has one entry per locale, english first', () => {
  const c = clusterFor('about');
  assert.equal(c.length, LOCALES.length);
  assert.equal(c[0].lang, DEFAULT_LOCALE);
  assert.deepEqual(c.map((a) => a.path), ['/about/', '/de/about/']);
});

test('english and german ui strings share the same keys', async () => {
  const { t } = await import('../src/i18n/ui.ts');
  const en = Object.keys(t('en')).sort();
  const de = Object.keys(t('de')).sort();
  assert.deepEqual(de, en);
  assert.deepEqual(Object.keys(t('de').platforms).sort(), Object.keys(t('en').platforms).sort());
});
