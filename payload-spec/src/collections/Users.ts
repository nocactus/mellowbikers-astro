import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Gebruiker', plural: 'Gebruikers' },
  auth: true,
  admin: { useAsTitle: 'email', defaultColumns: ['name', 'email', 'role'] },
  access: {
    // Alleen beheerders maken nieuwe accounts of wijzigen rollen.
    create: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
    update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', label: 'Naam', required: true },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Beheerder', value: 'admin' },
        { label: 'Redacteur', value: 'editor' },
      ],
      access: {
        // Een redacteur mag zichzelf niet tot beheerder promoveren.
        update: ({ req }) => req.user?.role === 'admin',
      },
      admin: {
        description: 'Redacteuren beheren content. Beheerders beheren ook gebruikers en instellingen.',
      },
    },
  ],
}
