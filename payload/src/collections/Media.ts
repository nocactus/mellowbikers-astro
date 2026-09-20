import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Afbeelding', plural: 'Mediabibliotheek' },
  access: { read: () => true },
  admin: { defaultColumns: ['filename', 'alt', 'updatedAt'] },
  upload: {
    // Op Cloudflare Workers is sharp niet beschikbaar, dus Payload kan
    // geen formaten genereren, croppen of een focal point uitrekenen.
    // Formaten doet Cloudflare Image Transformations (zie lib/cfImage.ts),
    // framing regelen we met de focusX/focusY velden hieronder.
    crop: false,
    focalPoint: false,
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt-tekst',
      required: true,
      admin: {
        description:
          'Beschrijf wat er te zien is, voor schermlezers en Google. Puur decoratief? Zet een spatie.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'focusX',
          type: 'number',
          label: 'Focus horizontaal (%)',
          defaultValue: 50,
          min: 0,
          max: 100,
          admin: { width: '50%', description: '0 = links, 100 = rechts.' },
        },
        {
          name: 'focusY',
          type: 'number',
          label: 'Focus verticaal (%)',
          defaultValue: 50,
          min: 0,
          max: 100,
          admin: { width: '50%', description: '0 = boven, 100 = onder.' },
        },
      ],
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Fotograaf',
    },
  ],
}
