/**
 * Migreert de content van de Astro-site naar Payload.
 *
 * Draaien met:   npx tsx scripts/migrate-content.ts
 *
 * Het script is idempotent op slug/naam: bestaande documenten worden
 * overgeslagen, niet gedupliceerd. Wat niet betrouwbaar te converteren
 * is, wordt niet gegokt maar aan het eind gemeld.
 */
import path from 'path'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { getPayload, type Payload } from 'payload'
import config from '../src/payload.config.js'

import { htmlToLexical, textToLexical } from './lib/html.js'
import { parseFrontmatter } from './lib/frontmatter.js'
import { parseDutchDate } from './lib/parseDutchDate.js'
import { ensureForms } from './lib/forms.js'
import { migratePages } from './lib/pages.js'
import { seedRedirects, IMPORT_FILE } from './lib/redirects.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ASTRO = path.resolve(dirname, '../..')
const CONTENT = path.join(ASTRO, 'src/content')
const PUBLIC = path.join(ASTRO, 'public')

const SEASON_YEAR = 2026

const warnings: string[] = []
const warn = (message: string) => {
  warnings.push(message)
  console.log(`  ! ${message}`)
}

const readJson = async <T>(relative: string): Promise<T> =>
  JSON.parse(await fs.readFile(path.join(CONTENT, relative), 'utf8')) as T

/* ---------------------------------------------------------------- media */

const mediaCache = new Map<string, number>()

/**
 * Zet een backgroundPosition uit de oude page-settings ("36% 64%") om
 * naar de focusX/focusY velden. Zonder dit verliezen de hero- en
 * footerafbeeldingen hun uitsnede en zie je bij een brede foto alleen
 * het midden.
 */
function parseBackgroundPosition(value?: string): { focusX: number; focusY: number } | undefined {
  const match = value?.match(/^\s*(\d{1,3})%\s+(\d{1,3})%\s*$/)
  if (!match) return undefined
  return { focusX: Number(match[1]), focusY: Number(match[2]) }
}

/** Uploadt een afbeelding uit public/ en geeft het id terug. */
async function uploadMedia(
  payload: Payload,
  publicPath: string | undefined,
  alt: string,
  backgroundPosition?: string,
): Promise<number | undefined> {
  if (!publicPath) return undefined

  const filename = publicPath.split('/').pop()
  if (!filename) return undefined
  if (mediaCache.has(filename)) return mediaCache.get(filename)

  const filePath = path.join(PUBLIC, decodeURIComponent(publicPath.replace(/^\//, '')))
  if (!existsSync(filePath)) {
    warn(`afbeelding ontbreekt op schijf: ${publicPath}`)
    return undefined
  }

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs[0]) {
    mediaCache.set(filename, existing.docs[0].id)
    return existing.docs[0].id
  }

  if (!alt.trim()) {
    warn(`geen alt-tekst bekend voor ${filename} — placeholder gezet, nog nalopen`)
  }

  const created = await payload.create({
    collection: 'media',
    filePath,
    data: {
      alt: alt.trim() || `Mellowbikers — ${filename}`,
      ...(parseBackgroundPosition(backgroundPosition) ?? {}),
    },
  })

  mediaCache.set(filename, created.id)
  return created.id
}

/* ------------------------------------------------------------ collecties */

async function migrateFaq(payload: Payload) {
  const files = (await fs.readdir(path.join(CONTENT, 'faq'))).filter((f) => f.endsWith('.json')).sort()
  let created = 0

  for (const file of files) {
    const item = await readJson<{ question: string; answer: string; order: number }>(`faq/${file}`)

    const existing = await payload.find({
      collection: 'faq',
      where: { question: { equals: item.question } },
      limit: 1,
    })
    if (existing.docs[0]) continue

    await payload.create({
      collection: 'faq',
      data: {
        question: item.question,
        answer: await htmlToLexical(payload, item.answer),
        order: item.order,
      },
    })
    created++
  }
  console.log(`  faq: ${created} aangemaakt, ${files.length - created} bestond al`)
}

async function migrateMembers(payload: Payload) {
  const files = (await fs.readdir(path.join(CONTENT, 'members'))).filter((f) => f.endsWith('.md')).sort()
  let created = 0

  for (const file of files) {
    const { data, body } = parseFrontmatter(await fs.readFile(path.join(CONTENT, 'members', file), 'utf8'))
    const slug = String(data.memberId ?? file.replace(/\.md$/, ''))

    const existing = await payload.find({ collection: 'members', where: { slug: { equals: slug } }, limit: 1 })
    if (existing.docs[0]) continue

    const images: number[] = []
    for (const image of (data.images as { src?: string; alt?: string }[] | undefined) ?? []) {
      const id = await uploadMedia(payload, image.src, image.alt ?? String(data.name ?? ''))
      if (id) images.push(id)
    }

    await payload.create({
      collection: 'members',
      data: {
        name: String(data.name ?? slug),
        slug,
        images,
        story: await textToLexical(payload, body),
        order: Number(data.order ?? 100),
      },
    })
    created++
  }
  console.log(`  leden: ${created} aangemaakt, ${files.length - created} bestond al`)
}

async function migrateEvents(payload: Payload) {
  const files = (await fs.readdir(path.join(CONTENT, 'agenda-items'))).filter((f) => f.endsWith('.md')).sort()
  let created = 0
  let skipped = 0

  for (const file of files) {
    const { data, body } = parseFrontmatter(
      await fs.readFile(path.join(CONTENT, 'agenda-items', file), 'utf8'),
    )
    const title = String(data.title ?? file)

    const existing = await payload.find({ collection: 'events', where: { title: { equals: title } }, limit: 1 })
    if (existing.docs[0]) continue

    const parsed = parseDutchDate(String(data.date ?? ''), SEASON_YEAR)
    if (!parsed.ok) {
      warn(`rit "${title}" overgeslagen — datum "${data.date}" (${parsed.reason}). Handmatig aanmaken.`)
      skipped++
      continue
    }

    await payload.create({
      collection: 'events',
      data: {
        title,
        startDate: parsed.startDate,
        ...(parsed.endDate ? { endDate: parsed.endDate } : {}),
        summary: body.split(/\n{2,}/)[0]?.slice(0, 300),
        description: body ? await textToLexical(payload, body) : undefined,
      },
    })
    created++
  }
  console.log(`  agenda: ${created} aangemaakt, ${skipped} overgeslagen`)
}

/* -------------------------------------------------------------- globals */

async function migrateGlobals(payload: Payload) {
  const nav = await readJson<{
    header: { label: string; href: string; isButton?: boolean }[]
    footer: { label: string; href: string }[]
    socials: { label: string; url: string }[]
  }>('navigation/main.json')

  const toLink = (item: { label: string; href: string }) => ({
    link: {
      label: item.label,
      type: 'external' as const,
      url: item.href,
      newTab: false,
    },
  })

  // Interne links worden hier bewust als 'external' met een pad gezet:
  // de pagina's bestaan op dit moment nog niet, dus een relationship zou
  // niet resolven. Na de paginamigratie kun je ze in de admin omzetten
  // naar echte paginaverwijzingen.
  const headerItems = nav.header.filter((item) => !item.isButton).map(toLink)
  const ctaItem = nav.header.find((item) => item.isButton)

  await payload.updateGlobal({
    slug: 'header',
    data: { items: headerItems, ...(ctaItem ? { cta: toLink(ctaItem) } : {}) },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      items: nav.footer.map(toLink),
      legalItems: [
        {
          link: {
            label: 'Privacyverklaring',
            type: 'external' as const,
            url: '/privacy',
            newTab: false,
          },
        },
      ],
    },
  })

  const homepage = await readJson<{ seo: { description: string } }>('homepage/content.json')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Mellowbikers',
      areaServed: 'Bergen op Zoom, Brabantse Wal',
      email: 'info@mellowbikers.nl',
      socials: nav.socials.map((social) => ({
        platform: social.label.toLowerCase() as 'facebook' | 'instagram',
        url: social.url,
      })),
      logo: await uploadMedia(payload, '/assets/mellowbikers-logo-2023.svg', 'Mellowbikers'),
      defaultOgImage: await uploadMedia(
        payload,
        '/assets/uploads/mb-hero-1-c20-2048.jpg',
        'Mellowbikers op de Brabantse Wal',
      ),
    },
  })

  void homepage
  console.log('  globals: header, footer en site-instellingen gezet')
}

console.log('Contentmigratie Astro -> Payload\n')

const payload = await getPayload({ config })

console.log('Media en collecties:')
await migrateFaq(payload)
await migrateMembers(payload)
await migrateEvents(payload)
console.log('\nGlobals:')
await migrateGlobals(payload)

console.log('\nFormulieren:')
const forms = await ensureForms(payload, (value) => htmlToLexical(payload, value))
console.log('  contact en lid-worden klaar (met verplichte toestemmingscheckbox)')

console.log('\nPaginas:')
const pages = await migratePages({
  payload,
  readJson,
  media: (publicPath, alt, backgroundPosition) =>
    uploadMedia(payload, publicPath, alt, backgroundPosition),
  html: (value) => htmlToLexical(payload, value),
  forms,
})
console.log(pages.length > 0 ? `  aangemaakt: ${pages.join(', ')}` : '  alle paginas bestonden al')

console.log('\nRedirects:')
const redirectCount = await seedRedirects(payload, path.join(dirname, '..', IMPORT_FILE))
if (redirectCount === 0) console.log('  alle redirects bestonden al')


console.log(`\nKlaar. ${mediaCache.size} afbeeldingen in de mediabibliotheek.`)

if (warnings.length > 0) {
  console.log(`\nNog na te lopen (${warnings.length}):`)
  for (const message of warnings) console.log(`  - ${message}`)
}

process.exit(0)
