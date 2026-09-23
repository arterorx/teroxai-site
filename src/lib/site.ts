export const SITE_NAME = 'TeroxAI';
export const SITE_URL = 'https://teroxai.com';
export const CONTACT_EMAIL = 'hello@teroxai.com';
export const OWNER = 'Armen Ter-Oganezov';
export const OWNER_COUNTRY = 'Germany';
export const GITHUB_URL = 'https://github.com/arterorx';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/armen-ter-oganezov/';
/** The developer page in the App Store, listing every app. */
export const DEVELOPER_URL = 'https://apps.apple.com/developer/armen-ter-oganezov/id1723150483';
export const SAME_AS = [GITHUB_URL, LINKEDIN_URL, DEVELOPER_URL];
export type SocialIcon = 'github' | 'linkedin' | 'apple' | 'mail';
/** Social links for the footer, home and about pages, rendered by SocialLinks.astro. Empty URLs drop out. */
export const SOCIALS: { href: string; label: string; icon: SocialIcon }[] = (
  [
    { href: GITHUB_URL, label: 'GitHub', icon: 'github' },
    { href: LINKEDIN_URL, label: 'LinkedIn', icon: 'linkedin' },
    { href: DEVELOPER_URL, label: 'App Store', icon: 'apple' },
  ] as const
).filter((s) => s.href);
/** Credit in the footer for the studio that builds the sites. */
export const CREDIT = { name: 'MariaWeb', url: 'https://mariaweb.dev/' };
/** Last review date of the legal pages. */
export const LEGAL_UPDATED = '2026-09-10';

export const formatDate = (iso: string, lang: 'en' | 'de') =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
