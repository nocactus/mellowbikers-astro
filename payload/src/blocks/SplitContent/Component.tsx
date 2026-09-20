import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SplitContentBlock } from '@/payload-types'
import { Section } from '@/components/Section'
import { CfImage } from '@/components/CfImage'
import { LinkButton } from '@/components/LinkButton'
import { CONTAINER } from '@/lib/theme'

export const SplitContentComponent = ({ block }: { block: SplitContentBlock }) => {
  const mediaFirst = block.mediaPosition === 'left'

  return (
    <Section appearance={block.appearance}>
      <div className={CONTAINER}>
        <div className={block.framed ? 'border-2 border-mellow-red rounded-lg p-6 md:p-8' : ''}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className={mediaFirst ? 'md:order-2' : 'md:order-1'}>
              {block.eyebrow && (
                <h2 className="text-2xl md:text-3xl font-bold text-mellow-groen mb-4 leading-tight">
                  {block.eyebrow}
                </h2>
              )}
              <div className="prose-mellow text-xl md:text-2xl leading-relaxed">
                <RichText data={block.content} />
              </div>
              {block.button?.link?.label && (
                <div className="mt-6">
                  <LinkButton link={block.button.link} />
                </div>
              )}
            </div>

            <div className={`flex items-center justify-center ${mediaFirst ? 'md:order-1' : 'md:order-2'}`}>
              {block.mediaType === 'statement' ? (
                <p className="text-7xl md:text-9xl font-black text-mellow-white">{block.statement}</p>
              ) : (
                <CfImage
                  media={block.image}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="rounded-lg w-full h-auto object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
