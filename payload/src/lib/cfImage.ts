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

/**
 * Custom domain op de R2-bucket, binnen dezelfde zone. Staat die er, dan
 * lezen de transformaties rechtstreeks uit R2 in plaats van via de
 * /api/media/file/-route van de Worker: geen Worker-CPU per thumbnail, en
 * het werkt ook zolang de site zelf nog op een workers.dev-hostname staat
 * (die valt buiten de zone, en dan weigert /cdn-cgi/image/ dienst).
 */
const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/$/, '')

/** Payload levert '/api/media/file/<naam>'; de R2-sleutel is die naam. */
function toSource(src: string): string {
  if (!MEDIA_BASE_URL) return src.replace(/^\/+/, '')
  const filename = src.split('/').pop() ?? src
  return `${MEDIA_BASE_URL}/${filename}`
}

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

  // Exact één slash tussen opties en bron. Met twee ziet Cloudflare een
  // protocol-relatieve URL ('//api/media/...' -> host 'api') en geeft 404.
  const source = toSource(src)
  const prefix = MEDIA_BASE_URL ? `${MEDIA_BASE_URL}/cdn-cgi/image` : '/cdn-cgi/image'

  return `${prefix}/${params}/${source}`
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
