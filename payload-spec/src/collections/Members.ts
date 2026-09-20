import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Members: CollectionConfig = {
  slug: 'members',
  labels: { singular: 'Lid', plural: 'Leden in de spotlight' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'updatedAt'],
  },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', label: 'Naam', required: true },
    { ...slugField(), admin: { position: 'sidebar', description: 'Wordt het anker op de spotlightpagina.' } },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: "Foto's",
      minRows: 1,
    },
    { name: 'story', type: 'richText', label: 'Verhaal', required: true },
    {
      name: 'order',
      type: 'number',
      label: 'Volgnummer',
      required: true,
      defaultValue: 100,
      index: true,
      admin: { position: 'sidebar' },
    },
  ],
}
