import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { FaqBlockType } from '@/payload-types'
import { Section } from '@/components/Section'
import { CfImage } from '@/components/CfImage'
import { CONTAINER } from '@/lib/theme'

export const FaqBlockComponent = async ({ block }: { block: FaqBlockType }) => {
  let items = (block.items ?? []).filter((i) => typeof i === 'object')

  if (block.source === 'all') {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'faq',
      sort: 'order',
      limit: 50,
      depth: 1,
    })
    items = result.docs
  }

  if (items.length === 0) return null

  const list = (
    <div>
      {block.title && (
        <h2 className="text-2xl md:text-3xl text-mellow-groen font-bold mb-6">{block.title}</h2>
      )}
      {items.map((item) => (
        // <details> is native: geen JavaScript nodig, werkt met
        // toetsenbord en schermlezers zonder extra aria-werk.
        <details key={item.id} className="mb-4 bg-mellow-dark border-b border-mellow-white">
          <summary className="cursor-pointer py-4 text-mellow-white font-medium hover:text-mellow-groen transition-colors">
            {item.question}
          </summary>
          <div className="pb-4 text-mellow-white prose-mellow">
            <RichText data={item.answer} />
          </div>
        </details>
      ))}
    </div>
  )

  return (
    <Section appearance={block.appearance}>
      <div className={CONTAINER}>
        {block.image ? (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <CfImage
              media={block.image}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="rounded-lg w-full h-auto object-cover"
            />
            {list}
          </div>
        ) : (
          list
        )}
      </div>
    </Section>
  )
}
