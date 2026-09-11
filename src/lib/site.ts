export const SITE_NAME = 'TeroxAI';
export const SITE_URL = 'https://teroxai.com';
export const CONTACT_EMAIL = 'hello@teroxai.com';
export const OWNER = 'Armen Ter-Oganezov';
export const OWNER_COUNTRY = 'Germany';
export const GITHUB_URL = 'https://github.com/arterorx';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/armen-ter-oganezov/';
/** Set when the TikTok account exists. Empty string hides the link everywhere. */
export const TIKTOK_URL = '';
export const SAME_AS = [GITHUB_URL, LINKEDIN_URL, TIKTOK_URL].filter(Boolean);
/** Social links for the footer, home and about pages. Empty URLs drop out. */
export const SOCIALS: { href: string; label: string }[] = [
  { href: GITHUB_URL, label: 'GitHub' },
  { href: LINKEDIN_URL, label: 'LinkedIn' },
  { href: TIKTOK_URL, label: 'TikTok' },
].filter((s) => s.href);
/** Last review date of the legal pages. */
export const LEGAL_UPDATED = '2026-09-10';

export const formatDate = (iso: string, lang: 'en' | 'de') =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
