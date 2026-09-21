import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'
import { linkField } from '@/fields/link'

export const SplitContent: Block = {
  slug: 'splitContent',
  interfaceName: 'SplitContentBlock',
  labels: { singular: 'Tekst naast beeld', plural: 'Tekst naast beeld' },
  fields: [
    {
      name: 'mediaType',
      type: 'radio',
      label: 'Wat komt er naast de tekst?',
      defaultValue: 'image',
      options: [
        { label: 'Afbeelding', value: 'image' },
        { label: 'Groot woord', value: 'statement' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Afbeelding',
      required: true,
      admin: { condition: (_, s) => s?.mediaType === 'image' },
    },
    {
      name: 'statement',
      type: 'text',
      label: 'Groot woord',
      required: true,
      admin: {
        condition: (_, s) => s?.mediaType === 'statement',
        description: 'Kort houden — dit wordt heel groot weergegeven.',
      },
    },
    { name: 'eyebrow', type: 'text', label: 'Bovenkopje' },
    { name: 'content', type: 'richText', label: 'Tekst', required: true },
    { name: 'button', type: 'group', label: 'Knop', fields: [linkField({ optional: true })] },
    {
      name: 'mediaPosition',
      type: 'select',
      label: 'Beeld staat',
      defaultValue: 'right',
      options: [
        { label: 'Rechts', value: 'right' },
        { label: 'Links', value: 'left' },
      ],
    },
    {
      name: 'framed',
      type: 'checkbox',
      label: 'Rode omlijning eromheen',
      defaultValue: false,
    },
    sectionAppearance,
  ],
}
