---
name: mdx-frontmatter
description: Documents every required and optional frontmatter field per content collection in ronankeane.com, with examples and validation rules. Invoke whenever drafting or editing the YAML frontmatter block at the top of any MDX file. Single source of truth — backed by the Zod schemas in src/content.config.ts.
---

# MDX frontmatter — every collection

The Zod schemas in `src/content.config.ts` are authoritative. This skill summarizes them with examples. If the schema and this skill disagree, the schema wins.

## Shared fields (every collection requires these)

```yaml
title: "..."                # 10-70 chars (SEO recommends 50-60)
description: "..."          # 120-170 chars (SEO recommends 150-160)
publishDate: 2026-05-26
lastUpdated: 2026-05-26
intent: "informational"     # OR "commercial-investigation" OR "transactional"
schema_type: ["Article"]    # array of schema.org types
draft: false                # optional, defaults false
noindex: false              # optional, defaults false
```

## services

```yaml
# ...shared fields...
primary_keyword: "AI strategy consulting"
service_type: "AI Strategy Consulting"
prime_phases: ["P", "R"]    # optional — which PRIME phases this service covers
related_services: ["copilot-training"]
hero_image: "/images/services/strategy-hero.webp"  # optional
```

## topics

```yaml
# ...shared fields...
primary_keyword: "AI implementation roadmap"
pillar: true                # true for high-level pillars, false for cluster topics
in_nav: false               # default false — most topics stay out of nav
related_topics:             # required 3-8, builds the topical mesh
  - "ai-adoption-strategies"
  - "custom-gpts-vs-off-the-shelf"
  - "ai-roi-measurement"
related_services: ["ai-strategy-consulting"]
```

## geo

```yaml
# ...shared fields...
city: "Raleigh"
state: "North Carolina"
state_abbr: "NC"
region: "Research Triangle"            # optional
primary_keyword: "AI consultant Raleigh"
service_areas: ["Cary", "Durham", "Chapel Hill", "Morrisville"]
local_industries: ["SaaS", "Fintech", "Life Sciences"]
notable_companies: ["Red Hat", "Pendo", "nCino"]   # plain string array
hero_image: "/images/geo/raleigh-hero.webp"        # optional
schema_type: ["LocalBusiness", "ProfessionalService"]
intent: "transactional"
```

Geo pages MUST pull `service_areas`, `local_industries`, and `notable_companies` from `src/data/cities.ts` for the corresponding city. Never invent.

## case-studies

```yaml
# ...shared fields...
client_name: "Example SaaS Co"   # use "Confidential SaaS client" only if NDA
client_industry: "B2B SaaS"
engagement_type: "AI Implementation"
key_metrics:                     # minimum 2 required
  - label: "Revenue contribution via AI personalization"
    value: "$275M"
  - label: "Reduction in campaign build time"
    value: "70%"
testimonial:                     # optional but strongly preferred
  quote: "..."
  attribution: "Jane Doe"
  role: "VP of Marketing"        # optional
prime_phases_used: ["P", "I", "M", "E"]
schema_type: ["Article", "Review"]
intent: "commercial-investigation"
```

## blog

```yaml
# ...shared fields...
primary_keyword: "AI for B2B demand generation"
categories: ["AI Strategy"]      # NEVER "Uncategorized" — schema rejects it
tags: ["demand-gen", "marketing", "AI tools"]
author: "Ronan Keane"            # defaults to this
hero_image: "/images/blog/post-slug.webp"   # optional
```

## resources

```yaml
# ...shared fields...
resource_type: "pdf"             # one of: pdf, report, quiz, calculator, guide, template
file: "/files/120-page-ai-strategy.pdf"  # optional, path to file if applicable
gated: false                     # true if requires form submission
```

## pages

```yaml
# ...shared fields...
slug: "about"
```

## Things the schema enforces (failures block the build)

- Title length 10-70 chars
- Description length 120-170 chars
- Blog `categories` cannot contain "Uncategorized" (any case)
- Topic `related_topics` requires 3-8 entries (drives the mesh)
- Case study `key_metrics` requires at least 2 entries
- Geo `state_abbr` must be exactly 2 chars
- `intent` must be one of the 3 allowed values
- All dates parse via `z.coerce.date()` — write `YYYY-MM-DD`
