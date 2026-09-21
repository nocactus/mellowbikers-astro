# Stand van zaken — 21 september 2026

**De Payload-site draait op mellowbikers.nl.** De Astro-site is eraf, het
Pages-project is opgeheven en de oude bron is uit de repo-root verwijderd
(terug te halen met `git checkout d56b8b8 -- src public`).

De afspraken staan in `CLAUDE.md`, de handleiding in `payload/README.md`,
de redenering per beslissing in de commit-berichten.

## Wat er staat

| | |
|---|---|
| Site | `mellowbikers.nl`, Worker `mellowbikers` |
| Database | D1 `mellowbikers`, 28 tabellen, regio EEUR, jurisdictie EU |
| Media | R2 `mellowbikers`, 33 bestanden, via `cdn.mellowbikers.nl` |
| Admin | `/admin`, één gebruiker |
| Secrets | `PAYLOAD_SECRET`, `TURNSTILE_SECRET_KEY`, `POSTMARK_API_TOKEN` |

Geverifieerd op het echte domein: zes pagina's met precies één `h1`,
canonicals kloppend, 33 van 33 afbeeldingen, `www` 301 naar de apex met
pad en query intact, `/festival` en `/dankje` 308 naar `/`, een eigen
404-pagina, sitemap met zes URL's, `robots.txt` met `Allow` plus
`Disallow: /admin`, de workers.dev-route uit (error 1042), inloggen op de
admin, en het contactformulier volledig: inzending opgeslagen én mail
afgeleverd.

## Wat er nog ligt

- [ ] **Cloudflare Access voor `/admin`.** De adminomgeving bevat
      persoonsgegevens van leden, en de beveiliging hangt nu aan één
      wachtwoordhash op 100.000 iteraties — het platformmaximum, en onder
      wat voor dit soort data hoort te gelden. Gratis tot 50 gebruikers.
- [ ] **Vier lege debug-commits** staan nog op `main` (`25225d1`,
      `038ed20`, `60bf09a` en de eerste trigger). Weg te rebasen, maar dat
      herschrijft gepushte geschiedenis.

Afgerond op 21 september: privacyverklaring nagelopen, de rit "Enduro
Weekend Saalbach" aangemaakt (9 t/m 13 september), sitemap ingediend bij
Search Console, het PBKDF2-issue gemeld, en Workers Builds gekoppeld.

## Openstaande keuze

De beeldkwaliteit staat op quality 80 met een bovengrens van 1920px. Bij
bijna volle resolutie is AVIF daarmee gróter dan de originele JPEG's — op
drie pagina's tot +74%. Quality 65 met een bovengrens van 1440px maakt
elke pagina lichter maar kost scherpte op grote schermen. Bewust niet
doorgevoerd; zie `CLAUDE.md`.

## Bekende openstaande zaken upstream

**payloadcms/payload#16470** — de SQLite-adapter trekt `drizzle-kit/api` de
Worker-bundle in. Open, geen gepubliceerde workaround. Omzeild door op
webpack te bouwen.

**payloadcms/payload#14766** — `too many SQL variables` bij veel blokken.
Omzeild met `blocksAsJSON: true`.

**cloudflare/workerd#1346** — PBKDF2 gecapt op 100.000 iteraties. Omzeild
met een postinstall-patch. Dit is een bewuste limiet van Cloudflare, geen
bug die overgaat.

**Workers Paid is nodig**, niet om de bundle-omvang — die limiet is op
4 september 2026 vervangen door 64 MiB op beide plannen en deze build komt
uit op circa 58 MB. Het gratis plan staat 10 ms CPU per request toe en een
server-gerenderde pagina haalt dat niet.
