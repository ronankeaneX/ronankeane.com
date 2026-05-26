---
name: topic-page-pattern
description: Anatomy of a topic page (educational pillar or cluster content) for ronankeane.com — pillar/cluster distinction, required H2s, FAQ structure, the related_topics mesh that builds topical authority. Invoke when creating, editing, or auditing any file in src/content/topics/.
---

# Topic page pattern

## Pillar vs cluster

A **pillar** topic is a broad authority page covering a high-level concept (e.g., "AI Implementation Strategy"). Set `pillar: true`. Pillars are typically longer (1500-3000 words) and link to many cluster topics under them.

A **cluster** topic is a narrower deep-dive on one sub-aspect (e.g., "How to Choose Between Custom GPTs and Off-the-Shelf AI Tools"). Set `pillar: false`. Clusters link UP to their pillar and SIDEWAYS to related clusters.

## Most topics stay OUT of primary nav

`in_nav: false` is the default. Only the 3-5 main pillars belong in nav. The rest connect via the `related_topics` mesh, which auto-renders a "Related" section at the bottom of every topic page.

## Required frontmatter

See `src/content.config.ts` (topics collection). Required:
- `title` — clear, search-aware (50-60 chars)
- `description` — 150-160 chars
- `primary_keyword` — the search intent
- `pillar` — boolean
- `in_nav` — boolean (default false)
- `related_topics` — array of 3-8 topic slugs (the topical mesh)
- `related_services` — array of service slugs (optional)
- `schema_type` — `["Article", "TechArticle"]` or similar
- `intent` — `"informational"`

## Page structure (H2 sections)

1. **Hero / definition** — what is this topic, who should care, in one paragraph
2. **Why it matters now** — current context, recent shifts, why this isn't a 2-years-ago question
3. **The 3-5 core sub-questions** — each as its own H2, each answered in 2-4 paragraphs with stats and named examples
4. **Common mistakes / anti-patterns** — what people get wrong
5. **How we approach this** — link to the service that addresses this; reference PRIME if relevant
6. **FAQ** — 4-8 search-aware questions
7. **Related topics** — auto-rendered from `related_topics` frontmatter

## Internal linking rules

- Link to 3-5 other topic pages via `related_topics` (mandatory for the mesh)
- Link to at least 1 service page
- Link to 1-2 case studies if the topic has proof connected to it
- Link to relevant resources (PDFs, the AI Ready Revenue Quiz)

## Voice

- Educational, not promotional
- Cite specific numbers and named sources
- Avoid "in today's fast-paced world"-style filler — get to the point
