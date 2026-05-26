import { z } from "zod";

/**
 * Schema for a single city entry. Every field except those marked
 * `.optional()` is required. Every statistic in `local_stats` must
 * carry an explicit source name + URL — non-negotiable for LLM citation.
 *
 * Populated by the `researcher` subagent via `/seed-cities` and
 * `/add-city` slash commands. Build fails if any entry is invalid.
 */
export const citySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  city: z.string(),
  state: z.string(),
  state_abbr: z.string().length(2),
  region: z.string().optional(),
  metro_area: z.string().optional(),
  service_areas: z.array(z.string()).min(1),
  business_districts: z.array(z.string()).default([]),
  notable_companies: z
    .array(
      z.object({
        name: z.string(),
        industry: z.string(),
      }),
    )
    .default([]),
  universities: z.array(z.string()).default([]),
  key_industries: z.array(z.string()).min(1),
  local_stats: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        source: z.string(),
        source_url: z.string().url(),
      }),
    )
    .default([]),
  hook: z.string(),
  coworking_spaces: z.array(z.string()).default([]),
});

export type City = z.infer<typeof citySchema>;

/**
 * Seed list — populated by `/seed-cities`.
 * Each entry must validate via `citySchema.parse(...)` before being added.
 */
export const cities: City[] = [
  // Populated by the researcher subagent.
];

/** Quick lookup by slug. */
export const cityBySlug = new Map(cities.map((c) => [c.slug, c]));
