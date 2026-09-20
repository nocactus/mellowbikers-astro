import type { Field } from 'payload'

/**
 * Gedeelde uiterlijk-instellingen die op vrijwel elk blok terugkomen.
 * Als groep toegevoegd zodat de admin-UI overzichtelijk blijft en de
 * gegenereerde types per blok consistent zijn.
 */
export const sectionAppearance: Field = {
  name: 'appearance',
  type: 'group',
  label: 'Weergave',
  admin: { description: 'Achtergrond en ruimte rond dit blok.' },
  fields: [
    {
      name: 'background',
      type: 'select',
      label: 'Achtergrondkleur',
      defaultValue: 'dark',
      options: [
        { label: 'Donker', value: 'dark' },
        { label: 'Rood', value: 'red' },
        { label: 'Wit', value: 'white' },
        { label: 'Blauw', value: 'blue' },
        { label: 'Geen', value: 'none' },
      ],
    },
    {
      name: 'padding',
      type: 'select',
      label: 'Ruimte boven/onder',
      defaultValue: 'md',
      options: [
        { label: 'Geen', value: 'none' },
        { label: 'Klein', value: 'sm' },
        { label: 'Normaal', value: 'md' },
        { label: 'Groot', value: 'lg' },
      ],
    },
    {
      name: 'separatorTop',
      type: 'checkbox',
      label: 'Bergrand aan de bovenkant',
      defaultValue: false,
    },
    {
      name: 'separatorBottom',
      type: 'checkbox',
      label: 'Bergrand aan de onderkant',
      defaultValue: false,
    },
  ],
}
