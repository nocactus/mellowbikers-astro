import type { Block } from 'payload'
import { sectionAppearance } from '@/fields/sectionAppearance'

/**
 * Vervangt src/pages/api/contact.ts en src/pages/api/lid-worden.ts.
 *
 * Die routes hadden twee problemen die hier structureel weg zijn:
 * - Turnstile werd overgeslagen als de secret ontbrak (fail-open).
 * - Bij een Postmark-fout kreeg de bezoeker alsnog "Bedankt!", terwijl
 *   de aanmelding nergens werd bewaard.
 * De Form Builder slaat elke inzending eerst op in de database; de mail
 * is een extra actie, geen enige bewaarplaats.
 */
export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlockType',
  labels: { singular: 'Formulier', plural: 'Formulieren' },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Welk formulier?',
      required: true,
    },
    { name: 'title', type: 'text', label: 'Kopje boven het formulier' },
    { name: 'intro', type: 'richText', label: 'Tekst boven het formulier' },
    {
      name: 'privacyNote',
      type: 'richText',
      label: 'Privacytoelichting',
      admin: {
        description:
          'Verplicht bij formulieren die persoonsgegevens verzamelen (AVG). Verwijs naar de privacyverklaring.',
      },
    },
    sectionAppearance,
  ],
}
