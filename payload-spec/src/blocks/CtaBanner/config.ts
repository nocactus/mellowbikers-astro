import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'
import { linkField } from '@/fields/link'

export const CtaBanner: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CtaBannerBlock',
  labels: { singular: 'Knoppenblok', plural: 'Knoppenblokken' },
  fields: [
    { name: 'title', type: 'text', label: 'Kopje' },
    { name: 'body', type: 'textarea', label: 'Tekst' },
    {
      name: 'buttons',
      type: 'array',
      label: 'Knoppen',
      minRows: 1,
      maxRows: 3,
      required: true,
      fields: [linkField()],
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Uitlijning',
      defaultValue: 'center',
      options: [
        { label: 'Gecentreerd', value: 'center' },
        { label: 'Naast elkaar', value: 'row' },
        { label: 'Onder elkaar', value: 'stack' },
      ],
    },
    sectionAppearance,
  ],
}
