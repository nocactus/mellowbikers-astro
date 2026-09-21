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

/** Vectorbeeld schaalt zichzelf. Cloudflare geeft een SVG onveranderd
 *  terug, dus een transformatie kost alleen een tik op het maandquotum. */
const IS_VECTOR = /\.svgz?$/i

/** Payload levert '/api/media/file/<naam>'; de R2-sleutel is die naam. */
function r2Key(src: string): string {
  return src.split('/').pop() ?? src
}

/**
 * De URL waarop een mediabestand zonder transformatie te halen is. Met
 * een custom domain komt dat rechtstreeks uit R2; zonder valt het terug
 * op de /api/media/file/-route van de Worker.
 */
export function mediaUrl(src: string): string {
  if (!MEDIA_BASE_URL) return src
  return `${MEDIA_BASE_URL}/${r2Key(src)}`
}

/** Breedtes die we aanbieden. Elke unieke combinatie telt 1x per maand
 *  richting de gratis 5.000 transformaties. */
export const IMAGE_WIDTHS = [480, 768, 1280, 1920] as const

/**
 * Nooit opschalen. 25 van de 33 gemigreerde afbeeldingen zijn smaller dan
 * 1920px en drie zelfs smaller dan 768px; bood je die breedtes toch aan,
 * dan koos een desktopbrowser de grootste en haalde een wazig opgeblazen
 * bestand op dat gróter is dan het origineel (bart-1.jpg: 481px bron,
 * 63 kB, maar 437 kB op width=1920).
 */
function widthsFor(sourceWidth?: number | null): readonly number[] {
  if (!sourceWidth) return IMAGE_WIDTHS
  const fitting = IMAGE_WIDTHS.filter((w) => w <= sourceWidth)
  return fitting.length > 0 ? fitting : [sourceWidth]
}

type TransformOptions = {
  width?: number
  height?: number
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad'
  quality?: number
  /** Intrinsieke breedte uit de upload-metadata. Begrenst de uitvoer. */
  sourceWidth?: number | null
}

export function cfImageUrl(src: string, opts: TransformOptions = {}): string {
  if (!EDGE_TRANSFORMS_AVAILABLE || IS_VECTOR.test(src)) return mediaUrl(src)

  const requested = opts.width ?? 1280
  const width = opts.sourceWidth ? Math.min(requested, opts.sourceWidth) : requested

  const params = [
    `width=${width}`,
    opts.height ? `height=${opts.height}` : null,
    `fit=${opts.fit ?? 'cover'}`,
    `quality=${opts.quality ?? 80}`,
    'format=auto',
  ]
    .filter(Boolean)
    .join(',')

  // Exact één slash tussen opties en bron. Met twee ziet Cloudflare een
  // protocol-relatieve URL ('//api/media/...' -> host 'api') en geeft 404.
  //
  // Staat de transformatie al op de CDN-hostname, dan is de bron gewoon de
  // R2-sleutel; die hostname er nog eens absoluut achter plakken werkt wel,
  // maar verdubbelt hem in elke URL in de HTML.
  const source = MEDIA_BASE_URL ? r2Key(src) : src.replace(/^\/+/, '')
  const prefix = MEDIA_BASE_URL ? `${MEDIA_BASE_URL}/cdn-cgi/image` : '/cdn-cgi/image'

  return `${prefix}/${params}/${source}`
}

export function cfSrcSet(
  src: string,
  opts: Omit<TransformOptions, 'width'> = {},
): string | undefined {
  if (!EDGE_TRANSFORMS_AVAILABLE || IS_VECTOR.test(src)) return undefined

  const widths = widthsFor(opts.sourceWidth)
  if (widths.length < 2) return undefined

  return widths.map((w) => `${cfImageUrl(src, { ...opts, width: w })} ${w}w`).join(', ')
}

/**
 * focusX/focusY staan op de media-collection omdat Payload's eigen
 * focalPoint-UI zonder sharp uit staat. Zie collections/Media.ts.
 */
export function objectPosition(focusX?: number | null, focusY?: number | null): string {
  return `${focusX ?? 50}% ${focusY ?? 50}%`
}
