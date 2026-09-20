import type { Block } from 'payload'
import { linkField } from '@/fields/link'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: "Hero's" },
  imageAltText: 'Groot openingsblok met achtergrondfoto',
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Formaat',
      defaultValue: 'full',
      options: [
        { label: 'Volledig scherm', value: 'full' },
        { label: 'Compact', value: 'compact' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Achtergrondfoto',
      required: true,
      admin: {
        description:
          'Framing stel je in op de foto zelf (velden Focus X/Y in de mediabibliotheek).',
      },
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Titel',
      required: true,
      admin: { description: 'Regeleindes worden overgenomen.' },
    },
    { name: 'subtitle', type: 'text', label: 'Ondertitel' },
    {
      name: 'overlay',
      type: 'checkbox',
      label: 'Donkere waas over de foto',
      defaultValue: true,
      admin: { description: 'Aanzetten als de tekst slecht leesbaar is.' },
    },
    {
      name: 'showScrollHint',
      type: 'checkbox',
      label: 'Pijltje naar beneden tonen',
      defaultValue: false,
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Knoppen',
      maxRows: 2,
      fields: [linkField()],
    },
    {
      name: 'separatorColor',
      type: 'select',
      label: 'Kleur bergrand onderaan',
      defaultValue: 'dark',
      options: [
        { label: 'Donker', value: 'dark' },
        { label: 'Rood', value: 'red' },
        { label: 'Wit', value: 'white' },
        { label: 'Blauw', value: 'blue' },
      ],
    },
  ],
}
