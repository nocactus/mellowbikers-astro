import { defineCollection, z } from 'astro:content';

// Collection voor agenda items (individuele markdown bestanden)
const agendaItemsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
    completed: z.boolean(),
    order: z.number(), // Voor sortering
  }),
});

// Collection voor agenda settings (introText, leadText)
const agendaSettingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    introText: z.string(),
    leadText: z.string(),
  }),
});

// Collection voor page headers (background image, title, subtitle per page)
const pageHeadersCollection = defineCollection({
  type: 'data',
  schema: z.object({
    backgroundImage: z.string(),
    backgroundPosition: z.string().optional().default('50% 50%'),
    title: z.string(),
    subtitle: z.string().optional(),
  }),
});

export const collections = {
  'agenda-items': agendaItemsCollection,
  'agenda-settings': agendaSettingsCollection,
  'page-headers': pageHeadersCollection,
};
