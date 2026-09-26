import { defineCollection, reference, z } from 'astro:content';
import { file } from 'astro/loaders';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

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
    // For roles that ran alongside another one, e.g. "Part-time contract".
    employmentType: z.string().optional(),
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

// Case studies, sourced from a hand-edited JSON file.
// Client names are left out on purpose; industry and country stand in for them.
const projects = defineCollection({
  loader: file('src/content/projects.json', {
    parser: (text) =>
      (JSON.parse(text) as Array<Record<string, unknown>>).map((item) => ({
        ...item,
        id: slugify(item.title as string),
      })),
  }),
  schema: z.object({
    title: z.string(),
    industry: z.string(),
    country: z.string().optional(),
    problem: z.string(),
    why: z.string(),
    did: z.array(z.string()),
    result: z.string().optional(),
    stack: z.array(z.string()),
    featured: z.boolean().optional().default(false),
    url: z.string().url().optional(),
    colorScheme: z.enum(['warm', 'blue', 'purple']).optional().default('warm'),
    order: z.number(),
  }),
});

// Testimonials, kept verbatim. Client and product names are redacted in square brackets.
const testimonials = defineCollection({
  loader: file('src/content/testimonials.json', {
    parser: (text) =>
      (JSON.parse(text) as Array<Record<string, unknown>>).map((item) => ({
        ...item,
        id: slugify(item.author as string),
      })),
  }),
  schema: z.object({
    author: z.string(),
    role: z.string(),
    // Relationship or source, e.g. "Managed me directly".
    note: z.string().optional(),
    project: reference('projects'),
    paragraphs: z.array(z.string()),
    order: z.number(),
  }),
});

// Conference and meetup talks, sourced from a hand-edited JSON file.
const talks = defineCollection({
  loader: file('src/content/talks.json', {
    parser: (text) =>
      (JSON.parse(text) as Array<Record<string, unknown>>).map((item) => ({
        ...item,
        id: slugify(item.title as string),
      })),
  }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.string(), // YYYY-MM
    url: z.string().url(),
    type: z.string().default('Talk'),
  }),
});

export const collections = { experience, skills, projects, testimonials, talks };
