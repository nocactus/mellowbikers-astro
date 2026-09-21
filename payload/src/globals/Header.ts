import type { GlobalConfig } from 'payload'
import { linkField } from '@/fields/link'

/**
 * In de Astro-versie stond het menu hardcoded in Default.astro, terwijl
 * er wel een navigation-collection was gedefinieerd die nergens gebruikt
 * werd. Hier is het echt beheerbaar.
 */
export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Menu bovenaan',
  access: { read: () => true },
  admin: { description: 'Het hoofdmenu, op desktop en mobiel.' },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Menu-items',
      maxRows: 8,
      fields: [linkField({ withStyle: false })],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Knop rechts',
      fields: [linkField({ label: 'Knop' })],
    },
  ],
}
