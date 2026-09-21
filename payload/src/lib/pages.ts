import { getPayload } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

export const HOME_SLUG = 'home'

export const pathForSlug = (slug: string) => (slug === HOME_SLUG ? '/' : `/${slug}`)

export async function getPage(slug: string) {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    limit: 1,
    depth: 2,
    // Concepten zijn alleen zichtbaar als draft mode aan staat, en die
    // kan alleen een ingelogde redacteur aanzetten via /next/preview.
    overrideAccess: draft,
  })

  return result.docs[0] ?? null
}

export async function buildMetadata(slug: string): Promise<Metadata> {
  const page = await getPage(slug)
  if (!page) return {}

  const meta = page.meta ?? {}
  const image = typeof meta.image === 'object' && meta.image?.url ? meta.image.url : undefined
  const rawTitle = meta.title ?? page.title
  // Next past title.template niet toe op de pagina die in dezelfde
  // segment zit als de layout — de homepage zou dan "Home" heten en de
  // rest "... | Mellowbikers". Daarom hier een absolute titel, met
  // dezelfde regel als de oude Astro-site: geen dubbel achtervoegsel.
  const title = rawTitle.includes('Mellowbikers') ? rawTitle : `${rawTitle} | Mellowbikers`
  const description = meta.description ?? undefined

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: pathForSlug(slug) },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'nl_NL',
      siteName: 'Mellowbikers',
      url: pathForSlug(slug),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: 'summary_large_image' },
  }
}
