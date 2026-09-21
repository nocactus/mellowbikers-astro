import type { Media } from '@/payload-types'
import { cfImageUrl, cfSrcSet, objectPosition } from '@/lib/cfImage'

type Props = {
  media: Media | number | null | undefined
  className?: string
  sizes?: string
  /** Eager alleen voor de LCP-afbeelding (hero boven de vouw). */
  priority?: boolean
  /** Verhouding, bv. 'aspect-square'. Voorkomt layout shift. */
  aspect?: string
}

/**
 * Vervangt <img> uit de Astro-versie. Die had geen width/height, geen
 * srcset en op twee plekken geen alt. Hier is alt verplicht via de
 * media-collection, en de afmetingen komen uit de upload-metadata mee
 * zodat de browser ruimte reserveert.
 */
export const CfImage = ({ media, className = '', sizes = '100vw', priority = false, aspect }: Props) => {
  if (!media || typeof media === 'number' || !media.url) return null

  const src = media.url
  // media.width begrenst de uitvoer: geen enkele variant mag breder zijn
  // dan de bron, anders serveren we opgeblazen beeld. Zie lib/cfImage.
  const sourceWidth = media.width
  const srcSet = cfSrcSet(src, { sourceWidth })

  return (
    <img
      src={cfImageUrl(src, { width: 1280, sourceWidth })}
      srcSet={srcSet}
      sizes={sizes}
      alt={media.alt ?? ''}
      width={media.width ?? undefined}
      height={media.height ?? undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={`${aspect ?? ''} ${className}`.trim()}
      style={{ objectPosition: objectPosition(media.focusX, media.focusY) }}
    />
  )
}
