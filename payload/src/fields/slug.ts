import type { Field, FieldHook } from 'payload'

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const formatSlug: FieldHook = ({ data, operation, value }) => {
  if (typeof value === 'string' && value.length > 0) return toSlug(value)
  // Alleen bij aanmaken automatisch afleiden uit de titel; daarna nooit
  // meer stilzwijgend wijzigen, want dat breekt bestaande URL's.
  if (operation === 'create' && typeof data?.title === 'string') return toSlug(data.title)
  return value
}

export const slugField = (options?: { description?: string }): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  label: 'URL-pad',
  admin: {
    position: 'sidebar',
    description:
      options?.description ?? 'Wijzig je dit na publicatie? Maak dan een redirect aan.',
  },
  hooks: { beforeValidate: [formatSlug] },
})
