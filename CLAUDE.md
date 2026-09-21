# Afspraken voor dit project

Kort, en bewust beperkt tot dingen die niet uit de code zelf blijken. De
uitgebreide uitleg staat in `payload/README.md`; de redenering achter
elke beslissing staat in de commit-berichten.

## Twee projecten in één repo

| Map | Wat | Deploy |
|---|---|---|
| repo-root | De Astro-site, **draait nu op mellowbikers.nl** | Cloudflare Pages, automatisch bij push naar `main` |
| `payload/` | De Payload-herbouw die Astro gaat vervangen | Workers Builds (nog op te zetten), root directory `payload` |

Wijzig je iets in de root, dan staat dat na de push live. Pages bouwt
`payload/` niet; dat is een aparte pipeline.

## Niet zomaar veranderen

Deze keuzes zien eruit als achterstallig onderhoud maar zijn het niet.

**De build draait op webpack, niet op Turbopack.** `next build --webpack`
in `payload/package.json`. Turbopack herschrijft de drizzle-kit-import van
de SQLite-adapter naar een naam die esbuild niet kan vinden, waardoor
`opennextjs-cloudflare build` afbreekt — payloadcms/payload#16470, open.
Terug naar Turbopack kan pas als die issue gesloten is; test dat met
`npm run build:worker`, niet met `npm run build`.

**`blocksAsJSON: true` op de D1-adapter blijft aan.** Zonder die vlag krijgt
elk blokveld een eigen kolom en overschrijdt een UPDATE op een pagina met
veel blokken de SQLite-limiet op bound parameters (payloadcms/payload#14766).
Uitzetten vereist bovendien een datamigratie. Bijeffect om te kennen: een
nieuw bloktype verandert het schema niet, dus daar is geen migratie voor
nodig.

**`npm run deploy` draait géén migraties.** De site deployt automatisch bij
elke push; schemawijzigingen horen daar niet in mee te liften. Migreren doe
je bewust met `deploy:database`.

**Remote bindings hangen aan `CLOUDFLARE_API_TOKEN`.** Zonder token werkt
alles tegen de lokale database in `.wrangler/`. Dat is expres, zodat builds
en typechecks draaien zonder Cloudflare-toegang. `deploy:database` weigert
zonder token te starten, want stil de verkeerde database migreren is erger
dan een foutmelding.

## Beeld

`sharp` draait niet op Workers, dus Payload genereert geen formaten en
crop en focal point staan uit. Formaten komen van Cloudflare Image
Transformations (`src/lib/cfImage.ts`); de uitsnede regelen redacteuren met
de velden Focus X/Y op de afbeelding. Alt-tekst is verplicht in de
media-collection — houd dat zo.

## Structuur

De blok-renderer zorgt dat elke pagina precies één `h1` heeft: een hero
pakt hem, en heeft de pagina er geen, dan het eerste blok met een
bovenkopje. De oude site miste een h1 op drie pagina's; dat moet niet
terugkomen.

## Taal

Code, commentaar en documentatie in het Nederlands, zoals de rest van dit
project. Commit-berichten in het Engels.
