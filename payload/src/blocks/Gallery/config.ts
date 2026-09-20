import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: { singular: 'Galerij', plural: 'Galerijen' },
  fields: [
    { name: 'title', type: 'text', label: 'Kopje' },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Afbeeldingen',
      required: true,
      minRows: 2,
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Weergave',
      defaultValue: 'scroll',
      options: [
        { label: 'Horizontaal scrollen', value: 'scroll' },
        { label: 'Raster', value: 'grid' },
      ],
    },
    sectionAppearance,
  ],
}
