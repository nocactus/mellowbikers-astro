import type { GlobalConfig } from 'payload'
import { linkField } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Voettekst',
  access: { read: () => true },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Standaard achtergrondfoto',
      admin: { description: "Pagina's kunnen dit overschrijven." },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Links',
      fields: [linkField({ withStyle: false })],
    },
    {
      name: 'legalItems',
      type: 'array',
      label: 'Juridische links',
      admin: { description: 'Privacyverklaring, voorwaarden. Verplicht zodra je formulieren persoonsgegevens verzamelen.' },
      fields: [linkField({ withStyle: false })],
    },
  ],
}
