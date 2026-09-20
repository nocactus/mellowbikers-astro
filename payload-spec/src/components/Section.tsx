import type { ReactNode } from 'react'
import { MountainSeparator } from './MountainSeparator'
import {
  SECTION_BG,
  SECTION_PADDING,
  SECTION_TEXT,
  type SectionColor,
  type SectionPadding,
} from '@/lib/theme'

export type Appearance = {
  background?: SectionColor | null
  padding?: SectionPadding | null
  separatorTop?: boolean | null
  separatorBottom?: boolean | null
}

type Props = {
  appearance?: Appearance | null
  children: ReactNode
  className?: string
  id?: string
}

/**
 * Elke blok-component rendert zichzelf in deze wrapper. Eén plek waar
 * achtergrond, ruimte en bergranden bepaald worden, in plaats van per
 * pagina herhaalde <section>-markup.
 */
export const Section = ({ appearance, children, className = '', id }: Props) => {
  const bg = appearance?.background ?? 'dark'
  const padding = appearance?.padding ?? 'md'

  return (
    <section
      id={id}
      className={`relative w-full ${SECTION_BG[bg]} ${SECTION_TEXT[bg]} ${SECTION_PADDING[padding]} ${className}`.trim()}
    >
      {appearance?.separatorTop && bg !== 'none' && <MountainSeparator position="top" color={bg} />}
      <div className="relative z-10">{children}</div>
      {appearance?.separatorBottom && bg !== 'none' && (
        <MountainSeparator position="bottom" color={bg} />
      )}
    </section>
  )
}
