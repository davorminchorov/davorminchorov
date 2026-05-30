import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

// Work experience, sourced from the LinkedIn profile export.
// The source JSON has no `id` field (kept clean for hand-editing), so we
// inject a stable slug id in the parser to satisfy the file() loader.
const experience = defineCollection({
  loader: file('src/content/experience.json', {
    parser: (text) =>
      (JSON.parse(text) as Array<Record<string, unknown>>).map((item) => ({
        ...item,
        id: slugify(`${item.company}-${item.title}-${item.startDate}`),
      })),
  }),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    location: z.string().optional(),
    companyUrl: z.string().url().optional(),
    startDate: z.string(), // YYYY-MM
    endDate: z.string().nullable(), // null = current role
    industry: z.string(),
    clientLocation: z.string().optional(),
    outcomes: z.array(z.string()),
    skills: z.array(z.string()).default([]),
  }),
});

// Grouped skills, sourced from the LinkedIn profile.
const skills = defineCollection({
  loader: file('src/content/skills.json', {
    parser: (text) =>
      (JSON.parse(text) as Array<Record<string, unknown>>).map((group) => ({
        ...group,
        id: slugify(group.category as string),
      })),
  }),
  schema: z.object({
    category: z.string(),
    items: z.array(z.string()),
  }),
});

export const collections = { writing, experience, skills };
