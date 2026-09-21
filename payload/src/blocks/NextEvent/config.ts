import type { Block } from 'payload'
import { linkField } from '@/fields/link'
import { sectionAppearance } from '@/fields/sectionAppearance'

/**
 * De eerstvolgende rit, rechtstreeks uit de agenda.
 *
 * Op de oude site was dit een handgetypte kaart, en bij de migratie is
 * dat een gewoon tekstblok geworden. Gevolg: in september 2026 stond er
 * nog "op zondag 16 november stond de eerste Torenrit op het programma",
 * in de verleden tijd, terwijl de eerstvolgende rit vier dagen later was.
 * Dit blok kan niet verouderen, want het leest de agenda.
 *
 * Er is geen veld om een rit te kiezen. Dat is opzet: zodra een redacteur
 * er een handmatig kan aanwijzen, staat er vroeg of laat weer een
 * verlopen rit op de homepage.
 */
export const NextEvent: Block = {
  slug: 'nextEvent',
  interfaceName: 'NextEventBlock',
  labels: { singular: 'Komende rit', plural: 'Komende ritten' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Bovenkopje',
      defaultValue: 'Mellowbikers: Next Ride',
    },
    {
      name: 'emptyText',
      type: 'textarea',
      label: 'Tekst als er geen rit gepland staat',
      required: true,
      defaultValue: 'De agenda voor het nieuwe seizoen komt eraan. Hou de socials in de gaten.',
      admin: {
        description:
          'Aan het eind van het seizoen staat er niets in de agenda. Dan toont dit blok deze tekst, in plaats van van de pagina te verdwijnen.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Terugvalafbeelding',
      admin: {
        description:
          'Gebruikt wanneer de rit zelf geen foto heeft, en bij de terugvaltekst.',
      },
    },
    { name: 'button', type: 'group', label: 'Knop', fields: [linkField({ optional: true })] },
    {
      name: 'mediaPosition',
      type: 'select',
      label: 'Beeld staat',
      defaultValue: 'right',
      options: [
        { label: 'Rechts', value: 'right' },
        { label: 'Links', value: 'left' },
      ],
    },
    sectionAppearance,
  ],
}
