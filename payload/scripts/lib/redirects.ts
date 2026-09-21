import type { Payload } from 'payload'
import { existsSync } from 'fs'
import fs from 'fs/promises'

/**
 * Redirects voor de overstap van de Astro-site naar Payload.
 *
 * De WordPress-migratie ligt achter ons: mellowbikers.nl draait al op
 * Astro. Wat nu verhuist is Astro -> Payload, en die slugs zijn gelijk
 * (/agenda, /lid-worden, /mellow-brewery, /mellow-in-the-spotlight).
 * Alleen paden die verdwijnen hebben dus een redirect nodig, en dat zijn
 * deze twee.
 */
const KNOWN: { from: string; to: string; why: string }[] = [
  {
    from: '/festival',
    to: '/',
    why: 'bestond op de Astro-site, verwijderd (editie juni 2025)',
  },
  {
    from: '/dankje',
    to: '/',
    why: 'bedankpagina van het oude formulier; Payload toont de bevestiging inline',
  },
]

/**
 * Pad naar een optioneel bestand met extra redirects, één per regel:
 *
 *   /oud-pad, /nieuw-pad
 *
 * Regels die met # beginnen worden overgeslagen. Exporteer de linkerkant
 * uit Search Console of uit de WordPress-sitemap.
 */
const IMPORT_FILE = 'redirects.csv'

type Entry = { from: string; to: string; why: string }

async function readImportFile(path: string): Promise<Entry[]> {
  if (!existsSync(path)) return []

  const lines = (await fs.readFile(path, 'utf8')).split(/\r?\n/)
  const entries: Entry[] = []

  for (const [index, raw] of lines.entries()) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue

    const [from, to] = line.split(',').map((part) => part?.trim())
    if (!from || !to) {
      console.log(`  ! ${IMPORT_FILE} regel ${index + 1} overgeslagen: "${line}"`)
      continue
    }
    entries.push({ from, to, why: `uit ${IMPORT_FILE}` })
  }

  return entries
}

/** Zoekt de pagina bij een pad, zodat de redirect meebeweegt als de slug
 *  later verandert. Lukt dat niet, dan wordt het een vaste URL. */
async function resolveTarget(payload: Payload, to: string) {
  const slug = to === '/' ? 'home' : to.replace(/^\/|\/$/g, '')

  const page = (
    await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
  ).docs[0]

  return page
    ? { type: 'reference' as const, reference: { relationTo: 'pages' as const, value: page.id } }
    : { type: 'custom' as const, url: to }
}

export async function seedRedirects(payload: Payload, importPath: string): Promise<number> {
  const entries = [...KNOWN, ...(await readImportFile(importPath))]
  let created = 0

  for (const entry of entries) {
    const exists = (
      await payload.find({ collection: 'redirects', where: { from: { equals: entry.from } }, limit: 1 })
    ).docs[0]
    if (exists) continue

    await payload.create({
      collection: 'redirects',
      data: { from: entry.from, to: await resolveTarget(payload, entry.to) },
    })
    console.log(`  ${entry.from} -> ${entry.to}  (${entry.why})`)
    created++
  }

  return created
}

export { IMPORT_FILE }
