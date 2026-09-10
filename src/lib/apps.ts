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
  store: { rating: number | null; ratingCount: number; version: string; fetchedAt: string };
  en: AppCopy;
  de: AppCopy;
}

const validate = (list: unknown): App[] => {
  if (!Array.isArray(list)) throw new Error('apps.json must be an array');
  for (const a of list as App[]) {
    for (const key of ['slug', 'appId', 'bundleId', 'status', 'priceModel'] as const) {
      if (typeof a[key] !== 'string' || !a[key]) throw new Error(`${a.slug ?? '?'}: missing ${key}`);
    }
    if (!/^\d+$/.test(a.appId)) throw new Error(`${a.slug}: appId must be digits`);
    if (!Array.isArray(a.platforms) || a.platforms.length === 0) throw new Error(`${a.slug}: platforms`);
    for (const lang of ['en', 'de'] as const) {
      const c = a[lang];
      if (!c || !c.name || !c.tagline || !c.intro || !Array.isArray(c.features) || c.features.length < 3) {
        throw new Error(`${a.slug}: incomplete ${lang} copy`);
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

/** Privacy and support URLs: external site when it exists, hosted pages otherwise. */
export const privacyPath = (app: App): string => app.privacy ?? `/apps/${app.slug}/privacy/`;
export const supportPath = (app: App): string => app.support ?? `/apps/${app.slug}/support/`;
