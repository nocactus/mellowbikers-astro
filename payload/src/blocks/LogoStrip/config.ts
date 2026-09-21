import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'
import { linkField } from '@/fields/link'

export const LogoStrip: Block = {
  slug: 'logoStrip',
  interfaceName: 'LogoStripBlock',
  labels: { singular: 'Logobalk', plural: 'Logobalken' },
  fields: [
    { name: 'title', type: 'text', label: 'Kopje', defaultValue: 'Mede mogelijk gemaakt door' },
    {
      name: 'logos',
      type: 'array',
      label: "Logo's",
      minRows: 1,
      required: true,
      admin: { initCollapsed: true },
      fields: [
        { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo', required: true },
        linkField({ name: 'link', label: 'Link', withStyle: false, optional: true }),
      ],
    },
    sectionAppearance,
  ],
}
