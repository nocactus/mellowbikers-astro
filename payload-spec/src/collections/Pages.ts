import type { CollectionConfig } from 'payload'
import { pageBlocks } from '@/blocks'
import { slugField } from '@/fields/slug'

const previewPath = (slug?: string | null) => {
  const path = slug === 'home' ? '/' : `/${slug ?? ''}`
  return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Pagina', plural: "Pagina's" },
  access: {
    // Alleen gepubliceerde pagina's zijn publiek; concepten zien
    // ingelogde redacteuren via preview.
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: { url: ({ data }) => previewPath(data?.slug) },
    preview: (doc) => previewPath(doc?.slug as string),
  },
  versions: {
    drafts: { autosave: { interval: 400 } },
    maxPerDoc: 25,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Paginatitel', required: true },
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Inhoud',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Blokken',
              blocks: pageBlocks,
              admin: {
                initCollapsed: true,
                description: 'Sleep blokken om de volgorde van de pagina te wijzigen.',
              },
            },
          ],
        },
        {
          label: 'Afsluiting',
          fields: [
            {
              name: 'footerImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Foto onderaan de pagina',
              admin: { description: 'Leeg laten om de standaardfoto uit de instellingen te gebruiken.' },
            },
          ],
        },
      ],
    },
  ],
}
