import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "src/content/projects" }),
  schema: ({ image }) => z.object({
    name: z.string(),
    purpose: z.string(),
    link: z.string().url(),
    image: image(),
    accentColor: z.string(),
    theme: z.enum(['bear', 'hijrah', 'dentex', 'crypto', 'pizza', 'murtajiz', 'medin']),
    tags: z.array(z.string()),
    skills: z.array(z.string()),
  }),
});

export const collections = {
  projects,
};
