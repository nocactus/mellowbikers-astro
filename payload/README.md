# Mellowbikers op Payload

De herbouw van mellowbikers.nl op Payload 3.90 + Next.js 16, draaiend op
Cloudflare Workers met D1 en R2.

Dit is een werkend project, geen bouwpakket. Het bouwt, de typecheck is schoon
en de content van de Astro-site is er al in gemigreerd.

## Wat is aantoonbaar getest

| Stap | Resultaat |
|---|---|
| `npm run build` | exit 0 — alle routes dynamisch, alleen de 404 statisch |
| `npm run typecheck` | 0 fouten |
| `payload generate:types` | 65 interfaces uit de config |
| `payload migrate` | 28 tabellen, `pages.layout` als **één** tekstkolom |
| `npm run test:dates` | 12/12 agendadatums correct, vage datum terecht geweigerd |
| `npm run migrate:content` | 4 FAQ, 3 leden, 12 ritten, 12 afbeeldingen, globals |

Nog niet getest, want daarvoor is een Cloudflare-account nodig: de daadwerkelijke
deploy, remote D1/R2, en `/cdn-cgi/image/` (dat bestaat alleen op de edge).

## Zo begin je

```bash
cd payload
npm install
cp .env.example .env        # vul PAYLOAD_SECRET in
npm run dev                 # admin op http://localhost:3000/admin
```

Eerste keer een schone database opzetten:

```bash
npm run payload -- migrate   # maakt de tabellen aan
npm run migrate:content      # haalt de content uit de Astro-site
```

> **Pin `next`.** Payload's peer-range is `>=16.3.3 <17.0.0` (plus enkele
> specifieke 15.x-vensters). Een blinde `next@latest` breekt de boel op een dag
> dat je er geen tijd voor hebt. Upgrade `next` alleen samen met Payload.

## Welk Workers-plan

De bundle-limiet is geen reden meer voor een betaald plan: Cloudflare heeft op
4 september 2026 de gecomprimeerde limieten (3 MB gratis / 10 MB betaald)
vervangen door 64 MiB ongecomprimeerd op **beide** plannen. Deze build komt uit
op circa 49 MB voor wrangler er zelf nog overheen gaat, dus dat past.

Wat wel bepalend is: het gratis plan staat **10 ms CPU per request** toe. Een
server-gerenderde Payload-pagina haalt dat niet — lokaal, op Node met SQLite,
ligt de TTFB rond 120-150 ms, en ook al is maar een deel daarvan CPU, het zit
ruim boven 10 ms. Op Workers Paid is dat 30 seconden.

Kort: Workers Paid blijft nodig, maar om de rekentijd, niet om de omvang.

## Naar Cloudflare (jouw deel)

```bash
npx wrangler d1 create mellowbikers          # database_id in wrangler.jsonc zetten
npx wrangler r2 bucket create mellowbikers-media
npx wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts

npx wrangler secret put PAYLOAD_SECRET
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put POSTMARK_API_TOKEN

npm run deploy
```

De Worker-bundle bouwen zonder te deployen kan met `npm run build:worker`.

Hang daarna een custom domain binnen dezelfde zone aan de R2-bucket en zet Image
Transformations aan, anders weigert `/cdn-cgi/image/` de bron.

### Benodigde omgevingsvariabelen

| Variabele | Waar |
|---|---|
| `PAYLOAD_SECRET` | Worker secret |
| `NEXT_PUBLIC_SERVER_URL` | Publieke site-URL, gebruikt voor canonicals en live preview |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Publiek, mag in de build |
| `TURNSTILE_SECRET_KEY` | Worker secret — **ontbreekt die, dan weigert elk formulier** |

---

## Wat zit erin

| Map | Inhoud |
|---|---|
| `src/blocks/` | 14 blokken, elk met `config.ts` (Payload-velden) en `Component.tsx` (rendering) |
| `src/collections/` | Pages, Events, Members, Faq, Media, Users |
| `src/globals/` | Header, Footer, SiteSettings |
| `src/fields/` | Herbruikbare velden: link, slug, weergave-instellingen |
| `src/components/` | Renderer, beeld, separator, formulier, footer |
| `src/lib/` | Thema-tokens, Cloudflare-beeldtransformaties, datumnotatie, Turnstile |
| `src/app/(frontend)/[slug]/page.tsx` | De pagina-route met metadata en draft preview |
| `src/styles/globals.css` | Tailwind 4 tokens en rich-text opmaak |
| `src/payload.config.ts` | Alles aan elkaar geknoopt |

### Wat er nog niet in zit

Deze komen uit de template of zijn projectspecifiek:

- `src/app/(payload)/` — de admin-routes, ongewijzigd uit de template
- `src/app/(frontend)/layout.tsx` — html/body, fonts, header, Plausible-script
- Een `SiteHeader.tsx` met het mobiele menu (de enige plek waar je nog echt
  client-side JavaScript nodig hebt)
- `next.config.ts`, `wrangler.jsonc` — uit de template, plus je D1- en R2-namen
- Een 404-pagina (`not-found.tsx`) — die ontbrak op de oude site volledig

### Renderstrategie

Pagina's worden per request gerenderd, niet vooraf gebouwd. `generateStaticParams`
zou tijdens de build D1 moeten bevragen, wat remote bindings vereist en builds
bros maakt — en bij dit bezoekersaantal levert voorrenderen niets op. Bijkomend
voordeel: gepubliceerde content staat meteen live, zonder rebuild. Wil je later
toch cachen, zet dan de OpenNext incremental cache op R2 aan.

---

## De blokkenbibliotheek

| Block | Slug | Vervangt in de Astro-site |
|---|---|---|
| Hero | `hero` | De hero-sectie van elke pagina |
| Tekst | `richText` | Lead-secties, losse tekstblokken |
| Tekst naast beeld | `splitContent` | Homepage-lead, bier-banner, next-ride kaart |
| Knoppenblok | `ctaBanner` | De knoppensectie op de homepage |
| Kaartenblok | `cardGrid` | Waarden-sectie, programma-onderdelen, tickets |
| Afbeelding/video | `mediaBlock` | Mux-videobanner, brewery-afbeeldingen |
| Galerij | `gallery` | De horizontale fotostrip |
| Veelgestelde vragen | `faqBlock` | FAQ-sectie |
| Agenda | `eventList` | De hele agendapagina |
| Leden in de spotlight | `memberGrid` | De spotlightpagina |
| Formulier | `formBlock` | `api/contact.ts` en `api/lid-worden.ts` |
| Logobalk | `logoStrip` | Sponsorlogo's |
| Kaart | `mapBlock` | Een locatie op de kaart |
| Bergrand | `separator` | Losse `MountainSeparator` |

### Pagina's opnieuw opbouwen

| Pagina | Blokken |
|---|---|
| `/` (slug `home`) | hero, splitContent, ctaBanner, splitContent (framed), mediaBlock (video), cardGrid, splitContent (bier), richText (quote), faqBlock, gallery, formBlock |
| `/agenda` | hero (compact), richText, eventList |
| `/mellow-in-the-spotlight` | hero (compact), memberGrid |
| `/mellow-brewery` | hero (compact), mediaBlock, richText, ctaBanner |
| `/lid-worden` | hero (compact), richText, formBlock |
| `/privacy` | hero (compact), richText — **nieuw, verplicht** |

---

## Drie dingen die bewust zo zijn

### 1. `blocksAsJSON: true` staat vast aan

In `payload.config.ts`. Zonder die vlag slaat D1 elk blokveld op als losse
kolom, en overschrijdt een UPDATE op een pagina met veel blokken de SQLite-
limiet op bound parameters: `too many SQL variables`
([payloadcms/payload#14766](https://github.com/payloadcms/payload/issues/14766),
open sinds november 2025). Het is geen noodgreep — de SQLite-documentatie
noemt het expliciet als de aanpak bij veel blokken. Achteraf omzetten kost een
datamigratie, dus dit moet vanaf de eerste migratie aan staan.

**Test dit vroeg.** Bouw eerst de volledige blokkenbibliotheek, maak dan een
testpagina met tien blokken en sla die op. Dan weet je binnen een dag of het
houdt, in plaats van halverwege de contentmigratie.

### 2. Beeldformaten komen van Cloudflare, niet van Payload

`sharp` draait niet op Workers, dus Payload kan geen `imageSizes` genereren en
staan crop en focal point uit in de admin (zie `collections/Media.ts`). In
plaats daarvan staat er één origineel in R2 en transformeert Cloudflare
on-the-fly via `/cdn-cgi/image/` — zie `lib/cfImage.ts`.

Dat betekent twee dingen:
- Lokaal (`next dev`) bestaat `/cdn-cgi/image/` niet. De helper valt daarom
  terug op de originele URL buiten productie.
- Framing regelen redacteuren met de velden **Focus X/Y** op de afbeelding
  zelf. Die vervangen het handmatige `object-position: 35% 75%` uit de oude
  markup.

Bij ~40 afbeeldingen x 4 breedtes kom je op ~160 unieke transformaties per
maand, tegen een gratis tier van 5.000.

### 3. Formulieren kunnen geen inzendingen meer verliezen

De oude API-routes hadden twee gaten. Turnstile werd overgeslagen als de secret
ontbrak, en bij een Postmark-fout kreeg de bezoeker alsnog "Bedankt!" terwijl
de aanmelding nergens werd bewaard.

Nu slaat de Form Builder elke inzending eerst op in de database; e-mail is een
extra actie, geen enige bewaarplaats. En `lib/turnstile.ts` gooit een fout als
de secret ontbreekt, in plaats van door te lopen.

---

## Nog te doen buiten de code

- [ ] **Privacyverklaring.** Het lid-worden-formulier verzamelt naam, adres,
      postcode, geboortedatum, telefoon en noodcontact. Er staat nergens een
      privacyverklaring. Het `formBlock` heeft daarom een verplicht
      `privacyNote`-veld, maar de pagina zelf moet je nog schrijven.
- [ ] **Consent-checkbox** op het lid-worden-formulier (Form Builder,
      checkbox-veld, required).
- [ ] **Redirects aanvullen.** Het mechanisme staat er en werkt; alleen
      `/festival` is gevuld, want dat is het enige oude pad dat in de repo
      terug te vinden was. Zet de rest in `redirects.csv` en draai
      `npm run migrate:content` opnieuw. In dat bestand staat waar je de
      lijst vandaan haalt.
- [ ] **Domein rechttrekken.** De Astro-config zet `site` op
      `astro.mellowbikers.nl` terwijl de JSON-LD `mellowbikers.nl` zegt. Kies er
      een en zet `NEXT_PUBLIC_SERVER_URL` daarop.
- [ ] **Oude media opruimen.** 659 van de 697 bestanden in
      `public/assets/uploads` worden nergens gebruikt (~87 MB, waaronder 146
      `.bk.*` backups). Alleen de 38 gebruikte hoeven naar R2.
