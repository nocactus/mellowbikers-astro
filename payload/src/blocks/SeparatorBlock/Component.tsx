import type { SeparatorBlockType } from '@/payload-types'
import { MountainSeparator } from '@/components/MountainSeparator'

export const SeparatorComponent = ({ block }: { block: SeparatorBlockType }) => (
  <div className="relative w-full h-28">
    <MountainSeparator position={block.position ?? 'top'} color={block.color ?? 'dark'} />
  </div>
)
