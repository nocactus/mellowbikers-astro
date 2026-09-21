import type { MediaBlockType } from '@/payload-types'
import { Section } from '@/components/Section'
import { CfImage } from '@/components/CfImage'
import { LazyVideo } from './LazyVideo'
import { CONTAINER } from '@/lib/theme'

export const MediaBlockComponent = ({ block }: { block: MediaBlockType }) => (
  <Section appearance={block.appearance}>
    <div className={block.fullBleed ? 'w-full' : CONTAINER}>
      {block.kind === 'video' ? (
        <LazyVideo src={block.videoUrl ?? ''} title={block.videoTitle ?? 'Video'} />
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
