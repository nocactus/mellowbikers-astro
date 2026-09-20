import type { Block } from 'payload'

/**
 * Losse bergrand tussen twee blokken die verder geen eigen separator
 * hebben. In de meeste gevallen gebruik je de separatorTop/Bottom
 * vinkjes op het blok zelf; dit blok is voor de uitzonderingen.
 */
export const SeparatorBlock: Block = {
  slug: 'separator',
  interfaceName: 'SeparatorBlockType',
  labels: { singular: 'Bergrand', plural: 'Bergranden' },
  fields: [
    {
      name: 'color',
      type: 'select',
      label: 'Kleur',
      defaultValue: 'dark',
      options: [
        { label: 'Donker', value: 'dark' },
        { label: 'Rood', value: 'red' },
        { label: 'Wit', value: 'white' },
        { label: 'Blauw', value: 'blue' },
      ],
    },
    {
      name: 'position',
      type: 'select',
      label: 'Richting',
      defaultValue: 'top',
      options: [
        { label: 'Punten omhoog', value: 'top' },
        { label: 'Punten omlaag', value: 'bottom' },
      ],
    },
  ],
}
