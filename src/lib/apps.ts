import raw from '../data/apps.json' with { type: 'json' };
import type { Locale } from '../i18n/config';

export type Platform = 'ios' | 'ipados' | 'macos';
export type PlatformKey = 'ios' | 'macos' | 'both';
export type PriceModel = 'paid' | 'one-time' | 'free-pro' | 'coins';

export interface Feature {
  title: string;
  text: string;
}
export interface AppCopy {
  name: string;
  subtitle: string;
  tagline: string;
  priceLabel: string;
  intro: string;
  features: Feature[];
}
export interface App {
  slug: string;
  appId: string;
  bundleId: string;
  order: number;
  status: 'live' | 'review';
  platforms: Platform[];
  priceModel: PriceModel;
  site: string | null;
  privacy: string | null;
  support: string | null;
  store: { rating: number | null; ratingCount: number; version: string; price?: number; currency?: string; fetchedAt: string };
  /** Which store screenshot becomes shot-1, shot-2, shot-3 (1-based). Absent = store order. */
  shotOrder?: number[];
  en: AppCopy;
  de: AppCopy;
}

const STATUSES: App['status'][] = ['live', 'review'];
const PRICE_MODELS: PriceModel[] = ['paid', 'one-time', 'free-pro', 'coins'];
const PLATFORMS: Platform[] = ['ios', 'ipados', 'macos'];

const validate = (list: unknown): App[] => {
  if (!Array.isArray(list)) throw new Error('apps.json must be an array');
  for (const a of list as App[]) {
    for (const key of ['slug', 'appId', 'bundleId', 'status', 'priceModel'] as const) {
      if (typeof a[key] !== 'string' || !a[key]) throw new Error(`${a.slug ?? '?'}: missing ${key}`);
    }
    if (!/^\d+$/.test(a.appId)) throw new Error(`${a.slug}: appId must be digits`);
    if (!STATUSES.includes(a.status)) throw new Error(`${a.slug}: status must be one of ${STATUSES.join(', ')}`);
    if (!PRICE_MODELS.includes(a.priceModel)) throw new Error(`${a.slug}: priceModel must be one of ${PRICE_MODELS.join(', ')}`);
    if (!Array.isArray(a.platforms) || a.platforms.length === 0) throw new Error(`${a.slug}: platforms`);
    for (const p of a.platforms) {
      if (!PLATFORMS.includes(p)) throw new Error(`${a.slug}: unknown platform ${p}`);
    }
    if (a.shotOrder !== undefined) {
      const sorted = [...a.shotOrder].sort();
      if (sorted.some((v, i) => v !== i + 1)) throw new Error(`${a.slug}: shotOrder must be a permutation of 1..${a.shotOrder.length}`);
    }
    for (const lang of ['en', 'de'] as const) {
      const c = a[lang];
      if (!c || !c.name || !c.tagline || !c.intro || !Array.isArray(c.features) || c.features.length < 3) {
        throw new Error(`${a.slug}: incomplete ${lang} copy`);
      }
      for (const f of c.features) {
        if (!f.title || !f.text) throw new Error(`${a.slug}: ${lang} feature without title or text`);
      }
    }
  }
  return [...(list as App[])].sort((x, y) => x.order - y.order);
};

/** All apps, sorted by `order`. */
export const APPS: App[] = validate(raw);

export const liveApps = (): App[] => APPS.filter((a) => a.status === 'live');
export const appBySlug = (slug: string): App | undefined => APPS.find((a) => a.slug === slug);
/** Apps whose privacy and support pages live on this site. */
export const hostedApps = (): App[] => APPS.filter((a) => a.privacy === null);

export const storeUrl = (app: App): string => `https://apps.apple.com/app/id${app.appId}`;

export const platformKey = (platforms: Platform[]): PlatformKey => {
  const mac = platforms.includes('macos');
  const ios = platforms.includes('ios') || platforms.includes('ipados');
  return mac && ios ? 'both' : mac ? 'macos' : 'ios';
};

export const copy = (app: App, lang: Locale): AppCopy => app[lang];
/** Subtitle from ASC when present, tagline otherwise. */
export const subtitleOf = (app: App, lang: Locale): string => app[lang].subtitle || app[lang].tagline;

/** Ready-to-use href: an absolute URL on the app's own site when it has one,
    otherwise a site-relative path to the page hosted here. Never prefix it. */
export const privacyUrl = (app: App): string => app.privacy ?? `/apps/${app.slug}/privacy/`;
export const supportUrl = (app: App): string => app.support ?? `/apps/${app.slug}/support/`;
