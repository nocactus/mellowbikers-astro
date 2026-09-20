import { RichText } from '@payloadcms/richtext-lexical/react'
import type { RichTextBlockType } from '@/payload-types'
import { Section } from '@/components/Section'
import { CONTAINER, CONTAINER_NARROW } from '@/lib/theme'

export const RichTextComponent = ({ block }: { block: RichTextBlockType }) => (
  <Section appearance={block.appearance}>
    <div className={block.width === 'wide' ? CONTAINER : CONTAINER_NARROW}>
      {block.eyebrow && (
        <h2 className="text-2xl md:text-3xl font-bold text-mellow-groen mb-4 leading-tight">
          {block.eyebrow}
        </h2>
      )}
      <div className="prose-mellow text-xl md:text-2xl leading-relaxed">
        <RichText data={block.content} />
      </div>
    </div>
  </Section>
)
