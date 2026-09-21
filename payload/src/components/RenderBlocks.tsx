import { Fragment } from 'react'
import type { Page } from '@/payload-types'

import { HeroComponent } from '@/blocks/Hero/Component'
import { RichTextComponent } from '@/blocks/RichTextBlock/Component'
import { SplitContentComponent } from '@/blocks/SplitContent/Component'
import { CtaBannerComponent } from '@/blocks/CtaBanner/Component'
import { CardGridComponent } from '@/blocks/CardGrid/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import { GalleryComponent } from '@/blocks/Gallery/Component'
import { FaqBlockComponent } from '@/blocks/FaqBlock/Component'
import { EventListComponent } from '@/blocks/EventList/Component'
import { MemberGridComponent } from '@/blocks/MemberGrid/Component'
import { NextEventComponent } from '@/blocks/NextEvent/Component'
import { FormBlockComponent } from '@/blocks/FormBlock/Component'
import { LogoStripComponent } from '@/blocks/LogoStrip/Component'
import { MapBlockComponent } from '@/blocks/MapBlock/Component'
import { SeparatorComponent } from '@/blocks/SeparatorBlock/Component'

type LayoutBlock = NonNullable<Page['layout']>[number]

/**
 * Een switch in plaats van een lookup-object: TypeScript versmalt het
 * union-type per case, zodat elke component zijn eigen blok-type krijgt
 * zonder casts. Een nieuw blok toevoegen zonder case geeft meteen een
 * compilerfout.
 */
const renderBlock = (block: LayoutBlock, isPageTitle: boolean) => {
  switch (block.blockType) {
    case 'hero':
      return <HeroComponent block={block} isPageTitle={isPageTitle} />
    case 'richText':
      return <RichTextComponent block={block} isPageTitle={isPageTitle} />
    case 'splitContent':
      return <SplitContentComponent block={block} isPageTitle={isPageTitle} />
    case 'ctaBanner':
      return <CtaBannerComponent block={block} />
    case 'cardGrid':
      return <CardGridComponent block={block} />
    case 'mediaBlock':
      return <MediaBlockComponent block={block} />
    case 'gallery':
      return <GalleryComponent block={block} />
    case 'faqBlock':
      return <FaqBlockComponent block={block} />
    case 'eventList':
      return <EventListComponent block={block} />
    case 'nextEvent':
      return <NextEventComponent block={block} />
    case 'memberGrid':
      return <MemberGridComponent block={block} />
    case 'formBlock':
      return <FormBlockComponent block={block} />
    case 'logoStrip':
      return <LogoStripComponent block={block} />
    case 'mapBlock':
      return <MapBlockComponent block={block} />
    case 'separator':
      return <SeparatorComponent block={block} />
    default:
      return null
  }
}

/**
 * Welk blok levert de h1?
 *
 * Een hero wint altijd. Heeft de pagina er geen — de bierpagina
 * bijvoorbeeld begint met een afbeelding — dan pakt het eerste blok met
 * een bovenkopje de titel. Zonder deze regel had zo'n pagina helemaal
 * geen h1, precies het probleem dat de Astro-versie op drie pagina's had.
 */
const pageTitleIndex = (blocks: NonNullable<Page['layout']>): number => {
  const hero = blocks.findIndex((block) => block.blockType === 'hero')
  if (hero !== -1) return hero

  return blocks.findIndex(
    (block) =>
      (block.blockType === 'richText' || block.blockType === 'splitContent') &&
      Boolean(block.eyebrow),
  )
}

export const RenderBlocks = ({ blocks }: { blocks?: Page['layout'] | null }) => {
  if (!blocks || blocks.length === 0) return null

  const titleIndex = pageTitleIndex(blocks)

  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={block.id ?? i}>{renderBlock(block, i === titleIndex)}</Fragment>
      ))}
    </>
  )
}
