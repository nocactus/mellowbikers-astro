import { getPayload } from 'payload'
import config from '@payload-config'
import type { NextRequest } from 'next/server'

/**
 * Sitemap van de gepubliceerde pagina's.
 *
 * Bewust een route handler en geen app/sitemap.ts. Dat laatste is een
 * metadata-bestand dat Next tijdens de build uitvoert, en dan zou hij D1
 * bevragen op het moment dat er alleen een lokale database is — precies
 * wat dit project vermijdt (zie README, "Renderstrategie"). Per request
 * genereren kost bij dit bezoekersaantal niets en is altijd actueel.
 *
 * Alleen `pages` staat erin. Ritten, leden en FAQ-items hebben geen
 * eigen URL; die worden binnen een pagina als blok gerenderd.
 */
export const dynamic = 'force-dynamic'

const escape = (value: string) =>
  value.replace(/[<>&'"]/g, (c) => `&${{ '<': 'lt', '>': 'gt', '&': 'amp', "'": 'apos', '"': 'quot' }[c]};`)

export async function GET(request: NextRequest) {
  const base = (process.env.NEXT_PUBLIC_SERVER_URL ?? request.nextUrl.origin).replace(/\/$/, '')
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    // De access-control op Pages filtert al op gepubliceerd voor
    // uitgelogde bezoekers, maar dit draait zonder gebruiker en dus
    // zonder die context. Expliciet filteren is hier het veiligst.
    where: { _status: { equals: 'published' } },
    limit: 500,
    depth: 0,
    pagination: false,
    select: { slug: true, updatedAt: true },
  })

  const urls = docs
    .filter((doc) => typeof doc.slug === 'string' && doc.slug.length > 0)
    .map((doc) => {
      const loc = `${base}${doc.slug === 'home' ? '/' : `/${doc.slug}`}`
      const lastmod = doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined
      return [
        '  <url>',
        `    <loc>${escape(loc)}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    })

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
