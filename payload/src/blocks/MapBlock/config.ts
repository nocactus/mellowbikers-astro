import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'

/**
 * De Astro-versie plakte een Google Maps embed-URL met placeholder-
 * waarden erin (!1d2478.123456789, plaats-ID 0x0:0x0), waardoor de kaart
 * niet de juiste locatie toonde. Hier voer je coordinaten in en bouwen
 * we de embed-URL zelf op, zodat er niets meer handmatig te knoeien valt.
 */
export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlockType',
  labels: { singular: 'Kaart', plural: 'Kaarten' },
  fields: [
    { name: 'title', type: 'text', label: 'Kopje' },
    { name: 'placeName', type: 'text', label: 'Naam van de locatie', required: true },
    { name: 'address', type: 'text', label: 'Adres' },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          label: 'Breedtegraad',
          required: true,
          admin: { width: '50%', description: 'Bijvoorbeeld 51.4637' },
        },
        {
          name: 'longitude',
          type: 'number',
          label: 'Lengtegraad',
          required: true,
          admin: { width: '50%', description: 'Bijvoorbeeld 4.4637' },
        },
      ],
    },
    {
      name: 'zoom',
      type: 'number',
      label: 'Zoomniveau',
      defaultValue: 14,
      min: 1,
      max: 20,
    },
    sectionAppearance,
  ],
}
