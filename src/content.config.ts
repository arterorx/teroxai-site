import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* Blog posts: src/content/blog/<lang>/<slug>.md → /blog/<slug>/ or /de/blog/<slug>/.
   `translationOf` names the slug of the same post in the other language so
   hreflang can pair them. */
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

export const collections = { blog };
