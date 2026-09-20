import type { LogoStripBlock } from '@/payload-types'
import { Section } from '@/components/Section'
import { CfImage } from '@/components/CfImage'
import { resolveHref } from '@/components/LinkButton'
import { CONTAINER } from '@/lib/theme'

export const LogoStripComponent = ({ block }: { block: LogoStripBlock }) => (
  <Section appearance={block.appearance}>
    <div className={CONTAINER}>
      {block.title && (
        <h2 className="text-2xl font-bold text-mellow-groen mb-8 text-center">{block.title}</h2>
      )}
      <ul className="list-none flex flex-wrap items-center justify-center gap-8">
        {block.logos.map((row, i) => {
          const image = (
            <CfImage
              media={row.logo}
              sizes="200px"
              className="h-16 w-auto object-contain"
            />
          )
          return (
            <li key={i}>
              {row.link?.label ? (
                <a
                  href={resolveHref(row.link)}
                  {...(row.link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block hover:opacity-80 transition-opacity"
                >
                  {image}
                </a>
              ) : (
                image
              )}
            </li>
          )
        })}
      </ul>
    </div>
  </Section>
)
