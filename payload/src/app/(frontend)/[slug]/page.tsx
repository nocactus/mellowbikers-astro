import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/RenderBlocks'
import { SiteFooter } from '@/components/SiteFooter'
import { buildMetadata, getPage } from '@/lib/pages'
import { redirectIfConfigured } from '@/lib/redirects'

/**
 * Bewust geen generateStaticParams. Dat zou tijdens de build D1 moeten
 * bevragen, wat op Workers remote bindings vereist en builds bros maakt.
 * Voor een site van dit formaat is per request renderen ruim snel genoeg,
 * en content is meteen live zonder rebuild. Wil je later toch cachen:
 * zet de OpenNext incremental cache op R2 aan en voeg revalidate toe.
 */

type Args = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  return buildMetadata(slug)
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    // Eerst kijken of er een redirect voor dit pad bestaat; pas daarna 404.
    await redirectIfConfigured(`/${slug}`)
    notFound()
  }

  return (
    <>
      <RenderBlocks blocks={page.layout} />
      <SiteFooter image={page.footerImage} />
    </>
  )
}
