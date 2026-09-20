import { SEPARATOR_FILL, type SectionColor } from '@/lib/theme'

type Props = {
  position: 'top' | 'bottom'
  color: Exclude<SectionColor, 'none'>
}

const CLIP = {
  bottom: [
    'polygon(0 100%, 0 60%, 10% 70%, 20% 50%, 30% 60%, 40% 40%, 50% 55%, 60% 35%, 70% 50%, 80% 40%, 90% 55%, 100% 45%, 100% 100%)',
    'polygon(0 100%, 0 50%, 10% 60%, 20% 40%, 30% 55%, 40% 30%, 50% 45%, 60% 25%, 70% 40%, 80% 30%, 90% 50%, 100% 35%, 100% 100%)',
  ],
  top: [
    'polygon(0 0, 0 40%, 10% 50%, 20% 30%, 30% 40%, 40% 20%, 50% 35%, 60% 15%, 70% 30%, 80% 20%, 90% 35%, 100% 25%, 100% 0)',
    'polygon(0 0, 0 50%, 10% 60%, 20% 40%, 30% 55%, 40% 30%, 50% 45%, 60% 25%, 70% 40%, 80% 30%, 90% 50%, 100% 35%, 100% 0)',
  ],
} as const

export const MountainSeparator = ({ position, color }: Props) => {
  const [solid, ghost] = SEPARATOR_FILL[color]
  const [clipSolid, clipGhost] = CLIP[position]
  const edge = position === 'bottom' ? ['-bottom-1', 'bottom-0'] : ['-top-1', 'top-0']

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute ${edge[0]} left-0 right-0 h-24 ${solid}`}
        style={{ clipPath: clipSolid }}
      />
      <div
        aria-hidden="true"
        className={`absolute ${edge[1]} left-0 right-0 h-28 ${ghost}`}
        style={{ clipPath: clipGhost }}
      />
    </>
  )
}
