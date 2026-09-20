import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'

export const FaqBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FaqBlockType',
  labels: { singular: 'Veelgestelde vragen', plural: 'Veelgestelde vragen' },
  fields: [
    { name: 'title', type: 'text', label: 'Kopje', defaultValue: 'Vragen? Check dit:' },
    {
      name: 'source',
      type: 'radio',
      label: 'Welke vragen tonen?',
      defaultValue: 'all',
      options: [
        { label: 'Alle vragen', value: 'all' },
        { label: 'Zelf kiezen', value: 'selected' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
      label: 'Vragen',
      required: true,
      admin: { condition: (_, s) => s?.source === 'selected' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Afbeelding ernaast',
      admin: { description: 'Leeg laten voor volle breedte.' },
    },
    sectionAppearance,
  ],
}
