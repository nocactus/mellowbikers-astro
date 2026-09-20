import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'

export const MemberGrid: Block = {
  slug: 'memberGrid',
  interfaceName: 'MemberGridBlock',
  labels: { singular: 'Leden in de spotlight', plural: 'Leden in de spotlight' },
  fields: [
    { name: 'title', type: 'text', label: 'Kopje' },
    { name: 'intro', type: 'richText', label: 'Inleiding' },
    {
      name: 'showIndex',
      type: 'checkbox',
      label: 'Lijst met snelkoppelingen tonen',
      defaultValue: true,
      admin: { description: 'Ankerlinks naar elk lid bovenaan het blok.' },
    },
    sectionAppearance,
  ],
}
