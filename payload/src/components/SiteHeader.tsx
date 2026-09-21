'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Header as HeaderGlobal } from '@/payload-types'
import { resolveHref } from './LinkButton'
import { mediaUrl } from '@/lib/cfImage'

/**
 * De enige plek in de site die nog echt client-side JavaScript nodig
 * heeft. Verschillen met de Astro-versie:
 * - het menu sluit nu ook op Escape
 * - de overlay is aria-hidden als hij dicht is, zodat schermlezers geen
 *   onzichtbare links voorlezen
 * - het hamburger-icoon animeert via CSS-classes in plaats van via
 *   handmatig gezette inline styles
 */
export const SiteHeader = ({ header, logoUrl }: { header: HeaderGlobal; logoUrl?: string }) => {
  const [open, setOpen] = useState(false)
  const items = header.items ?? []

  const close = () => setOpen(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 pt-2 bg-gradient-to-b from-black/60 to-transparent"
      onKeyDown={(event) => {
        if (event.key === 'Escape') close()
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-8 py-6">
        <Link href="/" className="flex items-center gap-4" onClick={close}>
          {logoUrl ? (
            <img src={mediaUrl(logoUrl)} alt="Mellowbikers" className="h-20 w-auto" width={160} height={80} />
          ) : (
            <span className="text-2xl font-black text-mellow-white">Mellowbikers</span>
          )}
        </Link>

        <nav className="ml-auto hidden md:flex items-center gap-8 text-xl font-medium">
          {items.map((row, i) => (
            <Link
              key={i}
              href={resolveHref(row.link)}
              className="text-mellow-white hover:text-mellow-red transition-colors"
            >
              {row.link?.label}
            </Link>
          ))}
          {header.cta?.link?.label && (
            <Link
              href={resolveHref(header.cta.link)}
              className="px-5 py-2 rounded-xl font-semibold text-mellow-dark bg-mellow-groen hover:drop-shadow-lg transition-all"
            >
              {header.cta.link.label}
            </Link>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          className="ml-auto md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center z-50"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              open ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              open ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 bg-black/95 z-30 md:hidden"
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-medium">
          {items.map((row, i) => (
            <Link
              key={i}
              href={resolveHref(row.link)}
              onClick={close}
              className="text-mellow-white hover:text-mellow-red transition-colors"
            >
              {row.link?.label}
            </Link>
          ))}
          {header.cta?.link?.label && (
            <Link
              href={resolveHref(header.cta.link)}
              onClick={close}
              className="px-6 py-3 rounded-xl font-semibold text-mellow-dark bg-mellow-groen"
            >
              {header.cta.link.label}
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
