import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'
import { linkField } from '@/fields/link'

/**
 * Eén blok voor drie dingen die in de Astro-versie drie keer apart
 * waren uitgeschreven: de waarden op de homepage, het festivalprogramma
 * en de ticketkaarten. Het verschil zat alleen in wat er getoond werd,
 * niet in de structuur.
 */
export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  labels: { singular: 'Kaartenblok', plural: 'Kaartenblokken' },
  fields: [
    { name: 'title', type: 'text', label: 'Kopje boven de kaarten' },
    {
      name: 'columns',
      type: 'select',
      label: 'Aantal kolommen',
      defaultValue: '3',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Kaarten',
      minRows: 1,
      required: true,
      labels: { singular: 'Kaart', plural: 'Kaarten' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'emoji', type: 'text', label: 'Emoji', admin: { width: '20%' } },
        { name: 'title', type: 'text', label: 'Titel', required: true, admin: { width: '80%' } },
        { name: 'price', type: 'text', label: 'Prijs', admin: { description: 'Alleen invullen bij tickets.' } },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding' },
        { name: 'body', type: 'textarea', label: 'Tekst' },
        { name: 'button', type: 'group', label: 'Knop', fields: [linkField({ optional: true })] },
      ],
    },
    sectionAppearance,
  ],
}
