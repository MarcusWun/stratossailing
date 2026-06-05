import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const trackEnum = z.enum(['offshore', 'coastal', 'inshore']);
const crewingEnum = z.enum(['singlehanded', 'doublehanded', 'fully crewed']);

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    event: z.string(),
    track: trackEnum,
    class: z.string(),
    crewing: crewingEnum,
    location: z.string(),
    result: z.string().optional(),
    crew: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const regattas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/regattas' }),
  schema: z.object({
    name: z.string(),
    track: trackEnum,
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    host: z.string().optional(),
    class: z.string().optional(),
    crewing: crewingEnum,
    url: z.string().url().optional(),
    norUrl: z.string().url().optional(),
    siUrl: z.string().url().optional(),
    location: z.string(),
    status: z.enum(['confirmed', 'tentative', 'cancelled']),
  }),
});

const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documents' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['B&G', 'Victron', 'Efoy', 'E-Bar', 'Yanmar', 'Other']),
    file: z.string(),
    fileSize: z.string().optional(),
    date: z.coerce.date(),
    description: z.string(),
  }),
});

export const collections = { posts, regattas, documents };
