# Changelog

Alle noemenswaardige wijzigingen aan de Mellowbikers website worden hier bijgehouden.

---

## [Unreleased]

---

## 2026-03-10 (2)

### Bugfix
- **Keystatic OAuth 401** — Custom Astro API route `src/pages/api/keystatic/[...params].ts` aangemaakt die Keystatic's injected route overridet. Hiermee worden `clientId`, `clientSecret` en `secret` direct op `_config` (priority 1 in `makeHandler`) gezet via `import.meta.env`, zodat de GitHub token exchange altijd de correcte credentials ontvangt. Root cause: de standaard Keystatic injected route roept `makeHandler({ config })` aan zónder credentials, wat alleen werkt als `context.locals.runtime.env` of `import.meta.env` de waarden kunnen leveren.

---

## 2026-03-10

### Toegevoegd
- **Keystatic authenticatie** — `/keystatic` en `/api/keystatic` routes zijn beveiligd met wachtwoord-authenticatie via Astro middleware
- Login pagina op `/keystatic-login` in Mellowbikers-stijl
- Sessie-cookie (httpOnly, secure, 7 dagen) voor persistent inloggen
- In development-mode wordt authenticatie overgeslagen

### Toegevoegd
- **Keystatic CMS** — visuele admin interface beschikbaar op `/keystatic`
- Alle content beheersbaar zonder code te schrijven
- Singletons: Homepage, Navigatie, Galerij, Agenda instellingen, Mellow Brewery, Festival, pagina-instellingen per pagina
- Collections: FAQ, Leden (Spotlight), Agenda items
- Nederlandse labels in de admin UI

### Toegevoegd
- **Astro Content Collections** voor alle content — geen hardcoded tekst meer in `.astro` bestanden
  - `homepage` — hero, intro, waarden, bier, quote, contact, knoppen, video
  - `faq` — veelgestelde vragen
  - `gallery` — galerij afbeeldingen
  - `members` — leden voor de Spotlight pagina (Markdown met frontmatter)
  - `festival` — festival informatie, tickets, programma, sponsors
  - `brewery` — Mellow Brewery pagina
  - `page-settings` — SEO, hero en footer instellingen per pagina
  - `navigation` — header- en footernavigatie, social media links
- **Herbruikbare componenten** — `MountainSeparator`, `Footer`, `FAQItem`, `ContactForm`
- **SEO component** — `<title>`, meta description, Open Graph, Twitter Card, canonical URL en JSON-LD per pagina
- JSON-LD structured data: `SportsClub` op alle pagina's, `SportsEvent` op de festival pagina
- Skip-to-content link voor toetsenbordnavigatie
- `aria-expanded` op de mobiele menuknop
- `noIndex` ondersteuning op de dankje-pagina

### Gewijzigd
- `--color-mellow-dark` gecorrigeerd van `#000101` naar `#0d0f19`
- Hardcoded hex-waarden (`bg-[#1a1d2e]`, `text-[#999]`) vervangen door Tailwind theme tokens
- Dode code verwijderd: `spotlight.astro` en `spotlight/[...slug].astro`
- `/keystatic` en `/dankje` uitgesloten van de sitemap

### Opgeruimd
- `dist/`, `node_modules/`, `.astro/` en `.DS_Store` verwijderd uit git-tracking (stonden ten onrechte in de repository)

### Bugfix
- `yaml@2` als directe dependency toegevoegd om versieconflict op Cloudflare Pages CI op te lossen

---

## 2026-02-08

### Gewijzigd
- Sanity CMS verwijderd uit het project (overgestapt op Astro Content Collections)
- Repository opnieuw opgezet met schone staat

---

## 2026-01-27

### Toegevoegd
- Mux video embed op de homepage
- Plausible Analytics script

### Gewijzigd
- Agenda-items bijgewerkt voor 2026
- Diverse kleine tekstwijzigingen en bugfixes in hero en footer

---

## 2025-11-11

### Toegevoegd
- **Agenda Content Collection** — agenda items beheerd via Markdown bestanden in `src/content/agenda-items/`
- Eerste opzet van Git-based CMS voor agenda

---

## 2025-11-10

### Gewijzigd
- Tailwind CSS 4 geüpgraded met Inter variabele font
- Header, navigatie en logo-aanpassingen
- Kleurenpalet verfijnd
- Mobile hero achtergrond gefixd

---

## 2025-11-06 — Initiële versie

### Toegevoegd
- WordPress-to-Astro migratie
- Astro 4 met Cloudflare Pages adapter
- Tailwind CSS 4
- Sitemap via `@astrojs/sitemap`
- `robots.txt`
- Inter variabel lettertype
- Contactformulier met Postmark en Cloudflare Turnstile
- Inschrijfformulier (lid worden)
- Agenda, Spotlight, Festival, Mellow Brewery en Homepage pagina's
