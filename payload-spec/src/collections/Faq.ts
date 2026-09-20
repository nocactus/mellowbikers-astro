import type { CollectionConfig } from 'payload'

export const Faq: CollectionConfig = {
  slug: 'faq',
  labels: { singular: 'Vraag', plural: 'Veelgestelde vragen' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'order'],
    description: 'Vragen die op de site getoond worden. Sorteren gaat op volgnummer.',
  },
  defaultSort: 'order',
  fields: [
    { name: 'question', type: 'text', label: 'Vraag', required: true },
    { name: 'answer', type: 'richText', label: 'Antwoord', required: true },
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
