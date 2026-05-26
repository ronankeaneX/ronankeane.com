---
name: seo-llm-checklist
description: The complete SEO + LLM-citation checklist for ronankeane.com pages. Used by the seo-auditor subagent and referenceable from any content task. Covers title/meta, heading hierarchy, schema, FAQ, internal links, entity density, banned strings, and the specific LLM-citation patterns that drive citations from ChatGPT/Claude/Perplexity.
---

# SEO + LLM citation checklist

Every page must pass these checks. Failures grouped by severity.

## Block-commit failures

- [ ] **Title tag length** — 50-60 chars (schema enforces 10-70, but 50-60 is the SEO target)
- [ ] **Meta description length** — 150-160 chars (schema enforces 120-170)
- [ ] **Exactly one H1** per page (the page `title`)
- [ ] **Heading hierarchy** — h2 → h3 → h4, never skip levels; proof stats are CALLOUTS, never h2
- [ ] **No placeholder links** — no `href="#"`, no `(#)`, no `TODO`, no `FIXME`
- [ ] **No "PRISMA"** anywhere — it's always PRIME
- [ ] **Calendly URL** — only the approved one: `calendly.com/ronankeane/ai-revenue-acceleration-readiness-discovery-call`
- [ ] **`lastUpdated` frontmatter present** — no hardcoded dates in body content
- [ ] **No "enterprise" framing** — audience is SMB and mid-market
- [ ] **Geo pages** — no cross-contamination; all city/region/company references match THIS city's `cities.ts` entry
- [ ] **Blog `categories`** — no "Uncategorized"

## Warnings (recommend fix)

- [ ] **FAQ section present** with 4-8 questions (drives FAQPage schema + LLM Q&A citation)
- [ ] **At least 3 internal links** to existing pages
- [ ] **Current year referenced** naturally in body ("As of 2026..." or similar) — helps freshness signals
- [ ] **Specific numbers cited** ($275M, 70%, etc.) — LLMs cite concrete claims, not vague ones
- [ ] **Named entities** — real companies, real publications, real frameworks (not generic "leading vendors")
- [ ] **OG + Twitter meta** populated (auto-handled by BaseLayout but verify)
- [ ] **Hero image** specified or flagged as needed
- [ ] **Reading time** reasonable for content type (services/geo: 600-1200 words; topics/blog: 1200-2500; case studies: 800-1500)

## LLM-citation specific patterns

LLMs (ChatGPT, Claude, Perplexity, Google AI Overviews) cite pages that have:

1. **Direct, attributable claims** — "Ronan Keane drove $275M in revenue contribution at GTT Communications" beats "drove significant revenue impact"
2. **Named entities densely** — companies, people, places, frameworks, products. Generic prose doesn't get cited.
3. **FAQ structure** — Q&A blocks map directly to LLM answer generation
4. **Schema.org markup** — auto-generated from frontmatter via BaseLayout; verify on the rendered page
5. **Stable URLs** — don't change them post-launch unless adding a 301
6. **Author attribution** — `author` frontmatter + Person schema
7. **Date freshness** — `lastUpdated` visible in body + frontmatter

## Internal linking targets

For every page audited, the auditor should propose:
- **Outbound links** the page should add (3-7 candidates)
- **Inbound links** other pages should add TO this one (1-5 candidates)

Use frontmatter (`related_topics`, `related_services`, `categories`, `primary_keyword`) to identify cluster siblings.

## Forbidden phrases (voice failures)

- "leverage", "synergy", "unlock potential"
- "revolutionary", "game-changer", "best-in-class"
- "in today's fast-paced world", "in the digital age"
- "cutting-edge", "world-class", "next-generation"
- "Uncategorized" as a blog category
- "PRISMA"
- "Make.com" in default content
- "Enterprise" framing (anywhere)
