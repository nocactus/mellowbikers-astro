import { getPayload } from 'payload'
import config from '@payload-config'
import { permanentRedirect } from 'next/navigation'

/**
 * Zoekt een redirect voor een pad dat geen pagina oplevert, en stuurt
 * door als er een is. Zonder deze lookup zou de redirects-collectie
 * alleen maar data zijn die nergens wordt gebruikt.
 *
 * Wordt aangeroepen vlak voor notFound(), zodat een bestaande pagina
 * altijd voorrang heeft op een redirect met hetzelfde pad.
 *
 * Permanent (308), niet tijdelijk (307): een overstap van WordPress is
 * blijvend, en bij een tijdelijke redirect houdt Google de oude URL
 * geindexeerd in plaats van de nieuwe over te nemen.
 */
export async function redirectIfConfigured(pathname: string): Promise<void> {
  const payload = await getPayload({ config })

  // Next haalt een slash aan het eind er zelf al af (308) voordat deze
  // route draait, dus hoeft de lijst geen slash-varianten te bevatten.
  // Voor de zekerheid zoeken we toch beide schrijfwijzen op.
  const candidates = [pathname, `${pathname}/`]

  const { docs } = await payload.find({
    collection: 'redirects',
    where: { from: { in: candidates } },
    depth: 1,
    limit: 1,
  })

  const target = docs[0]?.to
  if (!target) return

  if (target.type === 'reference' && target.reference?.value && typeof target.reference.value === 'object') {
    const slug = target.reference.value.slug
    permanentRedirect(slug === 'home' ? '/' : `/${slug}`)
  }

  if (target.url) permanentRedirect(target.url)
}
