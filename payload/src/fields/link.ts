import type { Field } from 'payload'

type LinkOptions = {
  name?: string
  label?: string
  withStyle?: boolean
  /**
   * Bij een optionele knop mag alles leeg blijven. Zodra er wel een
   * knoptekst staat, is een bestemming verplicht — anders zou een half
   * ingevulde knop stilzwijgend van de pagina verdwijnen.
   */
  optional?: boolean
}

/**
 * Eén linkveld voor de hele site. Interne links wijzen naar een pagina
 * (relationship), zodat een slug-wijziging niet stilletjes een dode link
 * oplevert. Externe links zijn vrije URL's.
 */
export const linkField = ({
  name = 'link',
  label = 'Link',
  withStyle = true,
  optional = false,
}: LinkOptions = {}): Field => {
  /** Verplicht zodra er een knoptekst is ingevuld. */
  const requiredWithLabel = (value: unknown, siblingData: { label?: unknown }) => {
    if (!optional) return value ? true : 'Dit veld is verplicht.'
    if (!siblingData?.label) return true
    return value ? true : 'Vul een bestemming in, of maak de knoptekst leeg.'
  }

  return ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Knoptekst',
      required: !optional,
      ...(optional ? { admin: { description: 'Leeg laten als je hier geen knop wilt.' } } : {}),
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
      required: !optional,
      validate: (value: unknown, { siblingData }: { siblingData: { type?: string; label?: unknown } }) =>
        siblingData?.type === 'internal' ? requiredWithLabel(value, siblingData) : true,
      admin: { condition: (_, siblingData) => siblingData?.type === 'internal' },
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
      required: !optional,
      validate: (value: unknown, { siblingData }: { siblingData: { type?: string; label?: unknown } }) =>
        siblingData?.type === 'external' ? requiredWithLabel(value, siblingData) : true,
      admin: { condition: (_, siblingData) => siblingData?.type === 'external' },
    },
    {
      name: 'anchor',
      type: 'text',
      label: 'Anker (zonder #)',
      required: !optional,
      validate: (value: unknown, { siblingData }: { siblingData: { type?: string; label?: unknown } }) =>
        siblingData?.type === 'anchor' ? requiredWithLabel(value, siblingData) : true,
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
}
