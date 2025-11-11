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

export const collections = {
  'agenda-items': agendaItemsCollection,
  'agenda-settings': agendaSettingsCollection,
};
