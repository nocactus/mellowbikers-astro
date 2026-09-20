import type { CollectionConfig } from 'payload'
import { pageBlocks } from '@/blocks'
import { slugField } from '@/fields/slug'

const base = () => process.env.NEXT_PUBLIC_SERVER_URL ?? ''

/** Rechtstreeks naar de pagina — voor live preview in de admin. */
const livePreviewUrl = (slug?: string | null) =>
  `${base()}${slug === 'home' ? '/' : `/${slug ?? ''}`}`

/** Via /next/preview, zodat draft mode aan gaat en ook ongepubliceerde
 *  versies zichtbaar zijn. Die route controleert of je ingelogd bent. */
const draftPreviewUrl = (slug?: string | null) => {
  const path = slug === 'home' ? '/' : `/${slug ?? ''}`
  return `${base()}/next/preview?path=${encodeURIComponent(path)}`
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
    livePreview: { url: ({ data }) => livePreviewUrl(data?.slug) },
    preview: (doc) => draftPreviewUrl(doc?.slug as string),
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
