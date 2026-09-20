import type { CollectionConfig } from 'payload'

/**
 * De agenda. Het verschil met de oude opzet zit in archiveAfter: die
 * wordt automatisch afgeleid en geindexeerd, zodat het filteren op
 * "komend" of "geweest" een gewone databasequery is in plaats van een
 * handmatig completed-vinkje dat niemand bijwerkt.
 */
export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Rit', plural: 'Agenda' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'location'],
    description: 'Clubritten, weekenden en evenementen.',
  },
  defaultSort: 'startDate',
  fields: [
    { name: 'title', type: 'text', label: 'Titel', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          label: 'Datum',
          required: true,
          index: true,
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
          },
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'Einddatum',
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
            description: 'Alleen invullen bij meerdaagse ritten of weekenden.',
          },
        },
      ],
    },
    { name: 'location', type: 'text', label: 'Locatie' },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Korte omschrijving',
      admin: { description: 'Een of twee zinnen. Verschijnt in de agendalijst.' },
    },
    { name: 'description', type: 'richText', label: 'Uitgebreide omschrijving' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Foto' },
    {
      name: 'signupUrl',
      type: 'text',
      label: 'Aanmeldlink',
      admin: { description: 'Optioneel, bijvoorbeeld een inschrijfformulier.' },
    },
    {
      name: 'archiveAfter',
      type: 'date',
      index: true,
      admin: {
        hidden: true,
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            const last = siblingData?.endDate ?? siblingData?.startDate
            if (!last) return last
            // Einde van de dag, anders valt een rit om 00:00 op de dag
            // zelf al uit de lijst met komende ritten.
            const date = new Date(last)
            date.setHours(23, 59, 59, 999)
            return date.toISOString()
          },
        ],
      },
    },
  ],
}
