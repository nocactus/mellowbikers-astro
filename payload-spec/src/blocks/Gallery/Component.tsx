import type { GalleryBlock } from '@/payload-types'
import { Section } from '@/components/Section'
import { CfImage } from '@/components/CfImage'
import { CONTAINER } from '@/lib/theme'

export const GalleryComponent = ({ block }: { block: GalleryBlock }) => {
  const images = (block.images ?? []).filter((m) => typeof m === 'object')

  return (
    <Section appearance={block.appearance}>
      {block.title && (
        <div className={CONTAINER}>
          <h2 className="text-2xl md:text-3xl font-bold text-mellow-groen mb-6">{block.title}</h2>
        </div>
      )}

      {block.layout === 'grid' ? (
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, i) => (
              <CfImage
                key={i}
                media={image}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="w-full h-64 object-cover rounded"
              />
            ))}
          </div>
        </div>
      ) : (
        // Horizontale strip. Een lijst met tabindex zodat je er ook met
        // het toetsenbord doorheen kunt scrollen.
        <ul
          className="flex gap-4 overflow-x-auto px-4 list-none"
          tabIndex={0}
          aria-label={block.title ?? 'Fotogalerij'}
        >
          {images.map((image, i) => (
            <li key={i} className="shrink-0">
              <CfImage
                media={image}
                sizes="256px"
                className="w-64 h-64 object-cover rounded"
              />
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
