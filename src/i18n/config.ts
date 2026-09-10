/* Two locales. English is the root with no prefix; German lives under /de/. */
export const LOCALES = ['en', 'de'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** BCP-47 tags for hreflang, og:locale and <html lang>. */
export const LOCALE_TAGS: Record<Locale, string> = { en: 'en', de: 'de' };
export const OG_LOCALES: Record<Locale, string> = { en: 'en_US', de: 'de_DE' };
/** Switcher labels, always in their own language. */
export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', de: 'Deutsch' };

/** '/' or '/de/' for the home page; '/de/<slug>/' for everything else. */
export const localePath = (lang: Locale, slug = ''): string => {
  const prefix = lang === DEFAULT_LOCALE ? '/' : `/${lang}/`;
  return slug ? `${prefix}${slug}/` : prefix;
};

export interface Alternate {
  lang: Locale;
  path: string;
}

/** Every language version of one page, used for hreflang and the switcher. */
export const clusterFor = (slug = ''): Alternate[] =>
  LOCALES.map((lang) => ({ lang, path: localePath(lang, slug) }));

/** Languages other than the default, for [lang] routes. */
export const OTHER_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);
