import type { NextRequest } from 'next/server'

/**
 * robots.txt, met één beslissing erin: alleen het canonieke domein mag
 * geïndexeerd worden.
 *
 * Een Worker is naast zijn eigen domein ook altijd bereikbaar op
 * <naam>.<subdomein>.workers.dev. Staat daar dezelfde site op, dan is dat
 * een tweede, indexeerbare kopie — duplicate content waar niemand om
 * vroeg. Zolang de hostname niet die uit NEXT_PUBLIC_SERVER_URL is,
 * weigeren we dus alles.
 *
 * Dat vervangt geen route uitzetten; het is de vangnetversie voor de
 * periode dat beide hostnames nog bestaan.
 */
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const configured = process.env.NEXT_PUBLIC_SERVER_URL
  const canonical = configured ? new URL(configured).host : request.nextUrl.host
  const isCanonical = request.nextUrl.host === canonical

  const body = isCanonical
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        '# De admin hoort niet in een index.',
        'Disallow: /admin',
        'Disallow: /api',
        '',
        `Sitemap: ${configured?.replace(/\/$/, '') ?? request.nextUrl.origin}/sitemap.xml`,
        '',
      ].join('\n')
    : ['# Niet het canonieke domein — niet indexeren.', 'User-agent: *', 'Disallow: /', ''].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
