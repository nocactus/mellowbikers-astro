import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlockType',
  labels: { singular: 'Tekst', plural: 'Tekstblokken' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Bovenkopje', admin: { description: 'Klein groen kopje boven de tekst.' } },
    { name: 'content', type: 'richText', label: 'Tekst', required: true },
    {
      name: 'width',
      type: 'select',
      label: 'Breedte',
      defaultValue: 'narrow',
      options: [
        { label: 'Smal (beter leesbaar)', value: 'narrow' },
        { label: 'Breed', value: 'wide' },
      ],
    },
    sectionAppearance,
  ],
}
