import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(155),
    date: z.coerce.date(),
    lang: z.enum(['en', 'de']),
    translationOf: z.string().optional(),
  }),
});

/* Legal texts. `app` is the app slug for app policies, absent for the site. */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    updated: z.coerce.date(),
    app: z.string().optional(),
  }),
});

export const collections = { blog, legal };
