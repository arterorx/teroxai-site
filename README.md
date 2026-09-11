# teroxai.com

Personal site of Armen Ter-Oganezov: every app, the blog, the about page. Astro, static, Cloudflare Pages.

Spec: `docs/superpowers/specs/2026-09-10-teroxai-site-design.md`. Plan: `docs/superpowers/plans/2026-09-10-teroxai-site.md`.

## Commands

```bash
npm install
npm run dev            # http://localhost:4321
npm test               # data and i18n tests
npm run build          # astro check + build → dist/
npm run data:store     # refresh ratings/versions from the App Store (also flips CamDial to live once approved)
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
