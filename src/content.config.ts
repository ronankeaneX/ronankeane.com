import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Fields shared across every collection.
 * Frontmatter validation is enforced at build time — files missing any
 * required field will fail `astro check` and block the deploy.
 */
const baseFields = {
  title: z.string().min(10).max(70),
  description: z.string().min(120).max(170),
  publishDate: z.coerce.date(),
  lastUpdated: z.coerce.date(),
  intent: z.enum([
    "informational",
    "commercial-investigation",
    "transactional",
  ]),
  schema_type: z.array(z.string()).min(1),
  draft: z.boolean().default(false),
  noindex: z.boolean().default(false),
};

const services = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/services" }),
  schema: z.object({
    ...baseFields,
    primary_keyword: z.string(),
    service_type: z.string(),
    prime_phases: z.array(z.enum(["P", "R", "I", "M", "E"])).optional(),
    related_services: z.array(z.string()).default([]),
    hero_image: z.string().optional(),
  }),
});

const topics = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/topics" }),
  schema: z.object({
    ...baseFields,
    primary_keyword: z.string(),
    pillar: z.boolean().default(false),
    in_nav: z.boolean().default(false),
    related_topics: z.array(z.string()).min(3).max(8),
    related_services: z.array(z.string()).default([]),
  }),
});

const geo = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/geo" }),
  schema: z.object({
    ...baseFields,
    city: z.string(),
    state: z.string(),
    state_abbr: z.string().length(2),
    region: z.string().optional(),
    primary_keyword: z.string(),
    service_areas: z.array(z.string()).min(1),
    local_industries: z.array(z.string()).min(1),
    notable_companies: z.array(z.string()).default([]),
    hero_image: z.string().optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/case-studies",
  }),
  schema: z.object({
    ...baseFields,
    client_name: z.string(),
    client_industry: z.string(),
    engagement_type: z.string(),
    key_metrics: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .min(2),
    testimonial: z
      .object({
        quote: z.string(),
        attribution: z.string(),
        role: z.string().optional(),
      })
      .optional(),
    prime_phases_used: z.array(z.enum(["P", "R", "I", "M", "E"])).min(1),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    ...baseFields,
    primary_keyword: z.string(),
    categories: z
      .array(z.string())
      .min(1)
      .refine(
        (cats) => !cats.some((c) => c.toLowerCase() === "uncategorized"),
        {
          message:
            'Category "Uncategorized" is banned — pick a real topic category.',
        },
      ),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Ronan Keane"),
    hero_image: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resources" }),
  schema: z.object({
    ...baseFields,
    resource_type: z.enum([
      "pdf",
      "report",
      "quiz",
      "calculator",
      "guide",
      "template",
    ]),
    file: z.string().optional(),
    gated: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    ...baseFields,
    slug: z.string(),
  }),
});

export const collections = {
  services,
  topics,
  geo,
  "case-studies": caseStudies,
  blog,
  resources,
  pages,
};
