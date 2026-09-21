'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Laadt de video-iframe pas wanneer het blok in beeld komt, en start hem
 * dan gedempt.
 *
 * Met een gewone iframe — ook met loading="lazy" — haalde de homepage
 * 1,4 MB aan Mux binnen bij elk bezoek: een thumbnail van 1,1 MB en een
 * player van 280 KiB, of je de video keek of niet. De lazy-drempel van
 * browsers is zo ruim dat een blok halverwege de pagina er alsnog onder
 * valt. Een IntersectionObserver met een kleine marge doet wat je
 * bedoelde.
 *
 * Autoplay is gedempt, want anders staat de browser het niet toe zonder
 * interactie. En wie `prefers-reduced-motion` aan heeft krijgt de video
 * met een playknop in plaats van beeld dat vanzelf begint te bewegen.
 */

/** Zet autoplay aan zonder bestaande query-parameters te verliezen. */
function metAutoplay(src: string): string {
  try {
    const url = new URL(src)
    url.searchParams.set('autoplay', '1')
    url.searchParams.set('muted', '1')
    return url.toString()
  } catch {
    // Geen geldige absolute URL: dan laten we hem zoals hij is, want een
    // kapotte embed-URL is aan de redacteur en niet aan ons.
    return src
  }
}

export const LazyVideo = ({ src, title }: { src: string; title: string }) => {
  const houder = useRef<HTMLDivElement>(null)
  const [laden, setLaden] = useState(false)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    setAutoplay(!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)

    const element = houder.current
    if (!element) return

    // Zonder IntersectionObserver (oude browser, of een testomgeving)
    // meteen laden: liever te veel data dan geen video.
    if (typeof IntersectionObserver === 'undefined') {
      setLaden(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLaden(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={houder}
      className="relative w-full overflow-hidden rounded-lg bg-mellow-dark"
      style={{ aspectRatio: '128 / 61' }}
    >
      {laden ? (
        <iframe
          src={autoplay ? metAutoplay(src) : src}
          title={title}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <div aria-hidden className="absolute inset-0 bg-white/5" />
      )}
    </div>
  )
}
