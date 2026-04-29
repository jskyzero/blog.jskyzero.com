import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      // Extra metadata used by custom archive/tag pages. Starlight handles
      // title/description/sidebar fields; these fields are blog-specific.
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
