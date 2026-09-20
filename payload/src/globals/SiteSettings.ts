import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site-instellingen',
  access: { read: () => true },
  admin: { description: 'Gegevens die op elke pagina terugkomen.' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Algemeen',
          fields: [
            { name: 'siteName', type: 'text', label: 'Naam van de site', defaultValue: 'Mellowbikers', required: true },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Standaard deelafbeelding',
              admin: {
                description:
                  'Wordt gebruikt als een pagina zelf geen deelafbeelding heeft ingesteld.',
              },
            },
            { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'email', type: 'email', label: 'E-mailadres' },
            { name: 'areaServed', type: 'text', label: 'Werkgebied', defaultValue: 'Bergen op Zoom, Brabantse Wal' },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socials',
              type: 'array',
              label: 'Social media',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  label: 'Platform',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Strava', value: 'strava' },
                    { label: 'Untappd', value: 'untappd' },
                    { label: 'Website', value: 'website' },
                  ],
                },
                { name: 'url', type: 'text', label: 'URL', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
