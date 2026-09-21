import Link from 'next/link'
import { BUTTON } from '@/lib/theme'

export type LinkValue = {
  label?: string | null
  type?: ('internal' | 'external' | 'anchor') | null
  page?: { slug?: string | null } | number | null
  url?: string | null
  anchor?: string | null
  newTab?: boolean | null
  style?: ('primary' | 'secondary' | 'ghost') | null
}

export const resolveHref = (link?: LinkValue | null): string => {
  if (!link) return '#'
  if (link.type === 'external') return link.url ?? '#'
  if (link.type === 'anchor') return `#${link.anchor ?? ''}`
  if (link.page && typeof link.page === 'object') {
    // De homepage heeft slug 'home' maar woont op /
    return link.page.slug === 'home' ? '/' : `/${link.page.slug}`
  }
  return '#'
}

export const LinkButton = ({ link, className = '' }: { link?: LinkValue | null; className?: string }) => {
  if (!link?.label) return null

  const href = resolveHref(link)
  const classes = `${BUTTON[link.style ?? 'primary']} ${className}`.trim()

  if (link.type === 'external') {
    return (
      <a
        href={href}
        className={classes}
        {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {link.label}
      </a>
    )
  }

  return (
    // prefetch={false}: elke pagina rendert per request met een D1-query,
    // dus een prefetch is een volledige server-render en geen bestandje.
    // Zie SiteHeader voor de afweging.
    <Link href={href} prefetch={false} className={classes}>
      {link.label}
    </Link>
  )
}
