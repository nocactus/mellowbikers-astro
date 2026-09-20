import type { MediaBlockType } from '@/payload-types'
import { Section } from '@/components/Section'
import { CfImage } from '@/components/CfImage'
import { CONTAINER } from '@/lib/theme'

export const MediaBlockComponent = ({ block }: { block: MediaBlockType }) => (
  <Section appearance={block.appearance}>
    <div className={block.fullBleed ? 'w-full' : CONTAINER}>
      {block.kind === 'video' ? (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '128 / 61' }}>
          <iframe
            src={block.videoUrl ?? ''}
            title={block.videoTitle ?? 'Video'}
            loading="lazy"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      ) : (
        <CfImage
          media={block.image}
          sizes={block.fullBleed ? '100vw' : '(min-width: 1280px) 1280px, 100vw'}
          className="w-full h-auto rounded-lg"
        />
      )}

      {block.caption && <p className="mt-3 text-sm text-center opacity-70">{block.caption}</p>}
    </div>
  </Section>
)
