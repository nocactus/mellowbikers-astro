# Stand van zaken — 21 september 2026

Overdracht van een Claude Code-sessie op het web naar lokaal werken. De
afspraken staan in `CLAUDE.md`, de handleiding in `payload/README.md`, de
redenering per beslissing in de commit-berichten van PR #1.

## Waar het staat

**De Astro-site draait op mellowbikers.nl** en is zojuist bijgewerkt
(merge `5647dc5`). Er is geen WordPress meer; `astro.mellowbikers.nl` was
een testomgeving.

**De Payload-herbouw staat in `payload/`** en is nog nergens uitgerold. Hij
bouwt, typecheckt schoon, en bevat de gemigreerde content — maar draait
alleen lokaal.

## Wat er met die merge live is gegaan

| Wijziging | Waarom |
|---|---|
| `site` van `astro.mellowbikers.nl` naar `mellowbikers.nl` | Elke canonical op de live site wees naar het testdomein. Dit was een actieve SEO-fout. |
| Festivalpagina verwijderd | Content van juni 2025; Timo wilde alles ervan weg |
| 644 ongebruikte afbeeldingen verwijderd | 91 MB naar 8 MB; resten van de WordPress-migratie |

**Nog niet geverifieerd.** De sessie kon `mellowbikers.nl` niet bereiken
(egress-proxy). Te controleren op de live site:

- [ ] `<link rel="canonical">` op de homepage noemt `mellowbikers.nl`
- [ ] `/mellow-in-the-spotlight` toont alle afbeeldingen (daar staan er de
      meeste; gaten wijzen op te veel verwijderde bestanden)
- [ ] `/festival` geeft 404
- [ ] `astro.mellowbikers.nl` staat op noindex of is weg — anders staat er
      een tweede kopie van de site online

## Wat er nu moet gebeuren

De Payload-app uitrollen. Alles hieronder vereist Cloudflare-toegang, wat
de web-sessie niet had.

```bash
cd payload && npm install
cp .env.example .env          # PAYLOAD_SECRET invullen

npx wrangler secret put PAYLOAD_SECRET
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put POSTMARK_API_TOKEN
# NEXT_PUBLIC_SERVER_URL en NEXT_PUBLIC_TURNSTILE_SITE_KEY als gewone vars

CLOUDFLARE_API_TOKEN=<token> npm run deploy:database
npm run deploy
CLOUDFLARE_API_TOKEN=<token> npm run migrate:content:remote
```

D1 en R2 bestaan al en staan in `wrangler.jsonc` (database `mellowbikers`,
bucket `mellowbikers`).

Daarna:

- [ ] Custom domain op de R2-bucket binnen dezelfde Cloudflare-zone, plus
      Image Transformations aan. Zonder dat weigert `/cdn-cgi/image/` de
      bron en laden alle foto's op volle grootte.
- [ ] Workers Builds opzetten: root directory `payload`, build
      `npm run build:worker`, deploy `npx wrangler deploy`, branch `main`.
      Zie `payload/README.md`.
- [ ] Privacypagina juridisch nalopen. Er staat een opzet, expliciet als
      concept gemarkeerd. Het lid-worden-formulier verzamelt geboortedatum,
      adres en noodcontact, dus dit moet kloppen vóór livegang.
- [ ] De rit "Enduro Weekend Saalbach" handmatig aanmaken. De datum stond
      als "1e week September" in de oude agenda; te vaag om te gokken, dus
      bewust overgeslagen door het migratiescript.
- [ ] Als laatste: `mellowbikers.nl` van het Pages-project naar de Worker
      verhuizen. Doe dit pas als de Worker op een tijdelijke hostname is
      gecontroleerd.

## Bekende openstaande zaken

**payloadcms/payload#16470** — de SQLite-adapter trekt `drizzle-kit/api` de
Worker-bundle in. Open, geen gepubliceerde workaround. Omzeild door op
webpack te bouwen. Zie `CLAUDE.md`.

**Workers Paid is nodig**, maar niet om de bundle-omvang: die limiet is op
4 september 2026 vervangen door 64 MiB op beide plannen en deze build komt
uit op ~49 MB. Het gratis plan staat 10 ms CPU per request toe en een
server-gerenderde pagina haalt dat niet (lokaal 120-150 ms TTFB).

**Redirects.** De slugs veranderen niet bij de overstap, dus bestaande
links blijven werken. Alleen `/festival` en `/dankje` verdwijnen; beide
geven al een 308 naar `/`. `payload/redirects.csv` is er voor als Search
Console later alsnog 404's laat zien.

## Wat deze sessie niet kon

Voor het geval iemand zich afvraagt waarom bepaalde dingen niet af zijn:
`mellowbikers.nl`, `pages.dev` en `workers.cloudflare.com` waren geblokkeerd
door de egress-proxy, en er was geen Cloudflare-toegang. Vandaar dat het
deployen, het controleren van de live site en het nakijken van de
preview-URL's aan de andere kant van deze overdracht liggen.

Wel gedaan en geverifieerd: de volledige Worker-build (`build:worker`), de
contentmigratie tegen een schone database, en elke pagina gerenderd en
nagemeten in Chromium. Drie bugs kwamen alleen daardoor boven — een
ontbrekende CTA, ontbrekende fonts, en een pagina zonder h1.
