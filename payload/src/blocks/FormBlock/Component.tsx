import { RichText } from '@payloadcms/richtext-lexical/react'
import type { FormBlockType } from '@/payload-types'
import { Section } from '@/components/Section'
import { FormRenderer } from '@/components/FormRenderer'
import { CONTAINER_NARROW } from '@/lib/theme'

export const FormBlockComponent = ({ block }: { block: FormBlockType }) => {
  if (!block.form || typeof block.form !== 'object') return null

  return (
    <Section appearance={block.appearance} id="contact">
      <div className={CONTAINER_NARROW}>
        <div className="bg-mellow-red rounded-lg p-6">
          {block.title && <h2 className="text-xl text-mellow-white font-bold mb-4">{block.title}</h2>}

          {block.intro && (
            <div className="prose-mellow text-mellow-white mb-6">
              <RichText data={block.intro} />
            </div>
          )}

          <FormRenderer form={block.form} />

          {block.privacyNote && (
            <div className="prose-mellow text-sm text-mellow-white/80 mt-6">
              <RichText data={block.privacyNote} />
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
