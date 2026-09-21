# mellowbikers.nl

De site van Mellowbikers, gebouwd op [Payload CMS](https://payloadcms.com)
en Next.js, draaiend op Cloudflare Workers met D1 en R2.

Alles staat in [`payload/`](payload/). De repo-root bevat alleen nog
documentatie; de Astro-site die hier tot 21 september 2026 stond is
verwijderd bij de overstap en staat nog in de geschiedenis (`d56b8b8`).

| Document | Waarvoor |
|---|---|
| [payload/README.md](payload/README.md) | De handleiding: opzetten, blokken, deployen |
| [CLAUDE.md](CLAUDE.md) | Afspraken en keuzes die niet uit de code blijken |
| [HANDOVER.md](HANDOVER.md) | Stand van zaken en wat er nog ligt |

## Snel beginnen

```bash
cd payload
npm install
cp .env.example .env    # PAYLOAD_SECRET invullen
npm run dev             # admin op http://localhost:3000/admin
```

## Deployen

```bash
cd payload
npx opennextjs-cloudflare deploy
```

Schemawijzigingen gaan daar bewust niet in mee. Zie
[CLAUDE.md](CLAUDE.md).
