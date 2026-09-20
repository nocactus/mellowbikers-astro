import type { HeroBlock } from '@/payload-types'
import { CfImage } from '@/components/CfImage'
import { MountainSeparator } from '@/components/MountainSeparator'
import { LinkButton } from '@/components/LinkButton'

/**
 * `isFirst` bepaalt of dit de LCP-afbeelding is en of de titel een <h1>
 * krijgt. In de Astro-versie ontbrak een h1 volledig op /agenda en
 * /lid-worden; dat kan hier niet meer gebeuren omdat de renderer
 * altijd precies één h1 per pagina afdwingt.
 */
export const HeroComponent = ({ block, isFirst }: { block: HeroBlock; isFirst: boolean }) => {
  const Heading = isFirst ? 'h1' : 'h2'
  const height = block.variant === 'compact' ? 'min-h-[55vh] md:min-h-[65vh]' : 'min-h-[90vh]'

  return (
    <section className={`relative w-full ${height} bg-mellow-dark flex flex-col justify-end overflow-hidden`}>
      <CfImage
        media={block.image}
        priority={isFirst}
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {block.overlay && <div aria-hidden="true" className="absolute inset-0 bg-black/40" />}

      <MountainSeparator position="bottom" color={block.separatorColor ?? 'dark'} />

      <div className="relative z-10 w-full text-center px-4 pb-24 pt-32">
        <Heading className="text-5xl md:text-7xl lg:text-8xl font-black text-mellow-white tracking-tighter drop-shadow-lg">
          {block.title.split('\n').map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </Heading>

        {block.subtitle && (
          <p className="mt-6 text-2xl md:text-3xl text-mellow-white drop-shadow-lg">{block.subtitle}</p>
        )}

        {block.buttons && block.buttons.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {block.buttons.map((row, i) => (
              <LinkButton key={i} link={row.link} />
            ))}
          </div>
        )}

        {block.showScrollHint && (
          <svg
            aria-hidden="true"
            className="w-8 h-8 mx-auto mt-8 text-mellow-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
    </section>
  )
}
