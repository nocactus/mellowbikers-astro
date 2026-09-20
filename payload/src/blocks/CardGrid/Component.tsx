import type { CardGridBlock } from '@/payload-types'
import { Section } from '@/components/Section'
import { CfImage } from '@/components/CfImage'
import { LinkButton } from '@/components/LinkButton'
import { CONTAINER } from '@/lib/theme'

const COLS = {
  '2': 'grid md:grid-cols-2 gap-6',
  '3': 'grid md:grid-cols-3 gap-6',
  '4': 'grid sm:grid-cols-2 lg:grid-cols-4 gap-6',
} as const

export const CardGridComponent = ({ block }: { block: CardGridBlock }) => (
  <Section appearance={block.appearance}>
    <div className={CONTAINER}>
      {block.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-mellow-groen mb-8 text-center">
          {block.title}
        </h2>
      )}

      <div className={COLS[block.columns ?? '3']}>
        {block.cards.map((card, i) => (
          <article key={i} className="bg-mellow-dark rounded-lg overflow-hidden flex flex-col">
            {card.image && (
              <CfImage
                media={card.image}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-6 text-center flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-mellow-groen mb-2">
                {card.emoji && <span className="mr-2">{card.emoji}</span>}
                {card.title}
              </h3>
              {card.price && <p className="text-3xl font-black text-mellow-white mb-2">{card.price}</p>}
              {card.body && <p className="text-xl text-mellow-white flex-1">{card.body}</p>}
              {card.button?.link?.label && (
                <div className="mt-4">
                  <LinkButton link={card.button.link} className="w-full" />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </Section>
)
