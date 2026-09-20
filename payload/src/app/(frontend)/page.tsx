import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { RenderBlocks } from '@/components/RenderBlocks'
import { SiteFooter } from '@/components/SiteFooter'
import { HOME_SLUG, buildMetadata, getPage } from '@/lib/pages'

export const generateMetadata = (): Promise<Metadata> => buildMetadata(HOME_SLUG)

export default async function HomePage() {
  const page = await getPage(HOME_SLUG)

  if (!page) notFound()

  return (
    <>
      <RenderBlocks blocks={page.layout} />
      <SiteFooter image={page.footerImage} />
    </>
  )
}
