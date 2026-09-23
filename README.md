# teroxai.com

The source of [teroxai.com](https://teroxai.com), the site of Armen Ter-Oganezov: eight App Store apps, a blog in English and German, and an about page. Astro 7, static output, no framework on the client, about 1 KB of own JavaScript. Deployed to Cloudflare Pages.

Shared so people can read how it is built. The texts, images, brand and app data in this repository are not licensed for reuse; the code is fine to learn from.

What might be worth a look:

- `src/data/apps.json` feeds every app card, app page, OG card and the JSON-LD (SoftwareApplication with offers, FAQPage). One file, no CMS.
- `src/components/AppShowcase.astro` + `src/scripts/showcase.ts`: the home carousel, 650 bytes gzipped, with proper `aria-current` and view transitions into the app pages.
- `scripts/`: store data from the iTunes lookup, screenshots from the store, OG cards and blog covers rendered with sharp, link and budget checks, IndexNow.
- `src/i18n/`: the English copy defines the shape, the German copy is typed against it, so a missing key is a compile error.

Lighthouse 100 on all four scores at launch.

## Commands

```bash
npm install
npm run dev            # http://localhost:4321
npm test               # data and i18n tests
npm run build          # astro check + build → dist/
npm run data:store     # refresh ratings/versions from the App Store (also flips CamDial to live once approved)
npm run assets:covers  # blog covers (one per `cover` id in post frontmatter)
npm run assets:shots   # re-download store screenshots (honours shotOrder in apps.json)
npm run assets:og      # regenerate OG cards after a name or tagline change
npm run assets:icons   # regenerate favicon and touch icons
npm run check:links    # every external link answers
npm run check:budget   # own client JS ≤ 3 KB gzip
```

## Deploy

```bash
npm run build && npx wrangler pages deploy dist --project-name=teroxai --branch=main
```

Live: https://teroxai.com (domain attached and noindex removed on 2026-09-11). Preview alias: https://teroxai.pages.dev.

## Owner steps (once)

1. **Cloudflare zone.** Dashboard → Add a domain → `teroxai.com` → Free. Copy the two nameservers.
2. **Namecheap.** Domain List → teroxai.com → Nameservers → Custom DNS → paste both → save. Wait until Cloudflare says the zone is active (minutes to a few hours).
3. **Attach the domain to Pages.** Workers & Pages → teroxai → Custom domains → Add `teroxai.com`, then add `www.teroxai.com`. Cloudflare creates the DNS records itself.
4. **www → apex.** Rules → Redirect Rules → template "Redirect from WWW to root". A `_redirects` file cannot do this on Pages (host-based sources are ignored), so it has to be a dashboard rule. Until it exists, www serves the same pages with canonical tags pointing at the apex, which is harmless.
5. **Email.** Email → Email Routing → enable → add address `hello@teroxai.com` → destination your Gmail → verify the destination. If Namecheap left MX records, Email Routing will refuse; delete them in DNS first (this happened with sawkit.app).
6. **Tell the site it is live.** Done on 2026-09-11: the `X-Robots-Tag: noindex` line is gone from `public/_headers`. If a preview ever needs hiding again, add it back and redeploy.
7. **Search Console.** Add property `sc-domain:teroxai.com`, verify with the TXT record Cloudflare offers, submit `https://teroxai.com/sitemap-index.xml`.
8. **App Store Connect.** For the three AI apps, set Support URL and Marketing URL to the app's page here, and Privacy Policy URL to `/apps/<slug>/privacy/`:
   - AI Photo Generator (6503450897): `https://teroxai.com/apps/ai-photo-generator/`, support `https://teroxai.com/apps/ai-photo-generator/support/`, privacy `https://teroxai.com/apps/ai-photo-generator/privacy/`
   - AI Video Generator (6504455552): same pattern with `ai-video-generator`
   - Text to Music (6740177765): same pattern with `text-to-music`
   The HQ session did this before for CamDial with `asc-set-urls.py`; the same script works with these ids.
9. **When CamDial is approved.** Run `npm run data:store`; it flips CamDial to live and the home page count becomes 8. Build and deploy.

## Content

- Apps: `src/data/apps.json`. Copy in `en` and `de`, facts (ids, platforms, price model) at the top of each entry. The `store` block is written by `npm run data:store`; do not edit it by hand. `shotOrder` picks which store screenshot leads.
- Blog: `src/content/blog/<lang>/<slug>.md`. Set `translationOf` on both files of a pair; the build fails if a pair is missing.
- Legal: `src/content/legal/*.md`. English only. The three AI app policies were transferred from Notion on 2026-09-10; edit them here from now on.
- Socials: `src/lib/site.ts`. Set `TIKTOK_URL` when the account exists; the link and the `sameAs` entry appear on their own.

## Rules

Nothing on the site that is not true right now. No invented reviews, counts or superlatives. Every text reads like a person wrote it: short sentences, no em dashes.
