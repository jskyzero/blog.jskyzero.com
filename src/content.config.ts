import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        date: z.date().optional(),
        tags: z.array(z.string()).default([]),
        category: z.string().optional(),
        image: z.string().optional(),
        description: z.string().optional(),
      }),
    }),
  }),
};
