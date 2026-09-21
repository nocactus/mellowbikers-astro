import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { CfImage } from './CfImage'
import { MountainSeparator } from './MountainSeparator'
import { resolveHref } from './LinkButton'

export const SiteFooter = async ({ image }: { image?: Media | number | null }) => {
  const payload = await getPayload({ config })
  const footer = await payload.findGlobal({ slug: 'footer', depth: 2 })

  const background = image && typeof image === 'object' ? image : footer.backgroundImage
  const year = new Date().getFullYear()

  return (
    <footer className="relative w-full min-h-[50vh] bg-mellow-dark flex items-end justify-center px-4 pb-8 overflow-hidden">
      {background && typeof background === 'object' && (
        <CfImage
          media={background}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <MountainSeparator position="top" color="dark" />

      <div className="relative z-10 text-center text-sm text-mellow-white/70">
        <p className="drop-shadow-lg">
          &copy; {year} Mellowbikers
          {(footer.items ?? []).map((row, i) => (
            <span key={i}>
              {' | '}
              <Link href={resolveHref(row.link)} prefetch={false} className="hover:text-mellow-groen transition-colors">
                {row.link?.label}
              </Link>
            </span>
          ))}
        </p>

        {footer.legalItems && footer.legalItems.length > 0 && (
          <p className="mt-2 drop-shadow-lg">
            {footer.legalItems.map((row, i) => (
              <span key={i}>
                {i > 0 && ' | '}
                <Link href={resolveHref(row.link)} prefetch={false} className="hover:text-mellow-groen transition-colors">
                  {row.link?.label}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </footer>
  )
}
