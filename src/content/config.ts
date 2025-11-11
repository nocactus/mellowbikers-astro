import { defineCollection, z } from 'astro:content';

const agendaCollection = defineCollection({
  type: 'data',
  schema: z.object({
    introText: z.string(),
    leadText: z.string(),
    items: z.array(z.object({
      date: z.string(),
      title: z.string(),
      description: z.string(),
      completed: z.boolean(),
    })),
  }),
});

export const collections = {
  'agenda': agendaCollection,
};
