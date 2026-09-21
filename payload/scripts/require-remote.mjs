/**
 * Bewaakt dat commando's die de échte Cloudflare-database raken niet per
 * ongeluk op de lokale kopie draaien.
 *
 * payload.config.ts vraagt remote bindings alleen aan wanneer er een
 * CLOUDFLARE_API_TOKEN in de omgeving staat. Zonder token valt wrangler
 * terug op de lokale miniflare-database — handig voor ontwikkelen, maar
 * rampzalig als je dacht de productiemigratie te draaien en er niets
 * gebeurt waar je het verwacht.
 */
if (!process.env.CLOUDFLARE_API_TOKEN) {
  console.error(
    [
      '',
      'CLOUDFLARE_API_TOKEN ontbreekt.',
      '',
      'Zonder token draait dit commando tegen de LOKALE database in .wrangler/,',
      'niet tegen je D1 op Cloudflare. Dat is vrijwel nooit de bedoeling bij een',
      'deploy of een migratie naar productie.',
      '',
      'Draai het zo:',
      '  CLOUDFLARE_API_TOKEN=<token> npm run <commando>',
      '',
      'Een token maak je aan onder My Profile > API Tokens, met rechten op',
      'D1 en R2 voor dit account.',
      '',
      'Wil je juist wél lokaal migreren? Gebruik dan:',
      '  npm run payload -- migrate',
      '',
    ].join('\n'),
  )
  process.exit(1)
}
