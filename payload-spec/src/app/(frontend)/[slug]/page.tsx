import { getPayload } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/RenderBlocks'
import { SiteFooter } from '@/components/SiteFooter'

type Args = { params: Promise<{ slug?: string }> }

const getPage = async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    limit: 1,
    depth: 2,
    overrideAccess: draft,
  })

  return result.docs[0] ?? null
}

/**
 * Bewust geen generateStaticParams. Dat zou tijdens de build D1 moeten
 * bevragen, wat op Workers remote bindings vereist en builds bros maakt.
 * Voor een site van dit formaat is per request renderen ruim snel genoeg,
 * en content is meteen live zonder rebuild. Wil je later toch cachen:
 * zet de OpenNext incremental cache op R2 aan en voeg revalidate toe.
 */

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  const page = await getPage(slug)
  if (!page) return {}

  const meta = page.meta ?? {}
  const image = typeof meta.image === 'object' && meta.image?.url ? meta.image.url : undefined

  return {
    title: meta.title ?? page.title,
    description: meta.description ?? undefined,
    alternates: { canonical: slug === 'home' ? '/' : `/${slug}` },
    openGraph: {
      title: meta.title ?? page.title,
      description: meta.description ?? undefined,
      type: 'website',
      locale: 'nl_NL',
      siteName: 'Mellowbikers',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function Page({ params }: Args) {
  const { slug = 'home' } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  return (
    <>
      <RenderBlocks blocks={page.layout} />
      <SiteFooter image={page.footerImage} />
    </>
  )
}
