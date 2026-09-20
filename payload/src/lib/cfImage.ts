/**
 * Cloudflare Image Transformations.
 *
 * Op Workers is `sharp` niet beschikbaar, dus Payload kan geen imageSizes
 * genereren bij upload. In plaats daarvan bewaren we één origineel in R2
 * en laat Cloudflare on-the-fly transformeren via /cdn-cgi/image/.
 *
 * Voorwaarde: de R2-bucket moet via een custom domain binnen dezelfde
 * Cloudflare-zone bereikbaar zijn, en Image Transformations moet op die
 * zone aan staan. Een bron buiten de zone weigert /cdn-cgi/image/.
 *
 * Let op: /cdn-cgi/image/ bestaat alleen op de Cloudflare-edge. Lokaal
 * (next dev) valt deze helper terug op de originele URL, anders krijg je
 * in ontwikkeling overal 404's op je afbeeldingen.
 */

const EDGE_TRANSFORMS_AVAILABLE = process.env.NODE_ENV === 'production'

/** Breedtes die we aanbieden. Elke unieke combinatie telt 1x per maand
 *  richting de gratis 5.000 transformaties — 4 breedtes x ~40 images = 160. */
export const IMAGE_WIDTHS = [480, 768, 1280, 1920] as const

type TransformOptions = {
  width?: number
  height?: number
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad'
  quality?: number
}

export function cfImageUrl(src: string, opts: TransformOptions = {}): string {
  if (!EDGE_TRANSFORMS_AVAILABLE) return src

  const params = [
    `width=${opts.width ?? 1280}`,
    opts.height ? `height=${opts.height}` : null,
    `fit=${opts.fit ?? 'cover'}`,
    `quality=${opts.quality ?? 80}`,
    'format=auto',
  ]
    .filter(Boolean)
    .join(',')

  return `/cdn-cgi/image/${params}/${src}`
}

export function cfSrcSet(src: string, opts: Omit<TransformOptions, 'width'> = {}): string | undefined {
  if (!EDGE_TRANSFORMS_AVAILABLE) return undefined

  return IMAGE_WIDTHS.map((w) => `${cfImageUrl(src, { ...opts, width: w })} ${w}w`).join(', ')
}

/**
 * focusX/focusY staan op de media-collection omdat Payload's eigen
 * focalPoint-UI zonder sharp uit staat. Zie collections/Media.ts.
 */
export function objectPosition(focusX?: number | null, focusY?: number | null): string {
  return `${focusX ?? 50}% ${focusY ?? 50}%`
}
