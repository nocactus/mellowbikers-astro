import type { Field } from 'payload'

type LinkOptions = {
  name?: string
  label?: string
  withStyle?: boolean
}

/**
 * Eén linkveld voor de hele site. Interne links wijzen naar een pagina
 * (relationship), zodat een slug-wijziging niet stilletjes een dode link
 * oplevert. Externe links zijn vrije URL's.
 */
export const linkField = ({ name = 'link', label = 'Link', withStyle = true }: LinkOptions = {}): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Knoptekst',
      required: true,
    },
    {
      name: 'type',
      type: 'radio',
      label: 'Soort link',
      defaultValue: 'internal',
      options: [
        { label: 'Pagina op deze site', value: 'internal' },
        { label: 'Externe URL', value: 'external' },
        { label: 'Anker op deze pagina', value: 'anchor' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Pagina',
      required: true,
      admin: { condition: (_, siblingData) => siblingData?.type === 'internal' },
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      required: true,
      admin: { condition: (_, siblingData) => siblingData?.type === 'external' },
    },
    {
      name: 'anchor',
      type: 'text',
      label: 'Anker (zonder #)',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'anchor',
        description: 'Bijvoorbeeld: contact',
      },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'In nieuw tabblad openen',
      defaultValue: false,
      admin: { condition: (_, siblingData) => siblingData?.type === 'external' },
    },
    ...(withStyle
      ? ([
          {
            name: 'style',
            type: 'select',
            label: 'Stijl',
            defaultValue: 'primary',
            options: [
              { label: 'Blauwe knop', value: 'primary' },
              { label: 'Omlijnde knop', value: 'secondary' },
              { label: 'Alleen tekst', value: 'ghost' },
            ],
          },
        ] as Field[])
      : []),
  ],
})
