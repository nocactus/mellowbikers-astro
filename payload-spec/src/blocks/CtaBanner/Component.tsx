import type { CtaBannerBlock } from '@/payload-types'
import { Section } from '@/components/Section'
import { LinkButton } from '@/components/LinkButton'
import { CONTAINER } from '@/lib/theme'

const LAYOUT = {
  center: 'flex flex-wrap gap-4 justify-center',
  row: 'grid md:grid-cols-2 gap-4',
  stack: 'flex flex-col gap-4',
} as const

export const CtaBannerComponent = ({ block }: { block: CtaBannerBlock }) => (
  <Section appearance={block.appearance}>
    <div className={CONTAINER}>
      {block.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-mellow-groen mb-4 text-center">
          {block.title}
        </h2>
      )}
      {block.body && <p className="text-xl md:text-2xl mb-6 text-center">{block.body}</p>}
      <div className={LAYOUT[block.layout ?? 'center']}>
        {block.buttons.map((row, i) => (
          <LinkButton key={i} link={row.link} className="w-full md:w-auto" />
        ))}
      </div>
    </div>
  </Section>
)
