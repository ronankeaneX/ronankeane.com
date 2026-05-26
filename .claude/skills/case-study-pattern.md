---
name: case-study-pattern
description: Anatomy of a case study for ronankeane.com — required H2s, proof-density requirements, the specific schema fields (client, industry, key metrics, testimonial, PRIME phases used). Invoke when creating, editing, or auditing any file in src/content/case-studies/.
---

# Case study pattern

## Proof density is the whole point

Every case study is a proof asset. If it doesn't include concrete numbers (revenue, time saved, adoption rate, conversion lift, etc.), it isn't a case study — it's a testimonial. Always include `key_metrics` (minimum 2) in frontmatter.

## Required frontmatter

See `src/content.config.ts` (case-studies collection). Required:
- `title` — `"{Outcome headline} | {Client} Case Study"` (50-60 chars)
- `description` — 150-160 chars, lead with the metric
- `client_name` — real company name (use "Confidential SaaS client" only if NDA prevents naming)
- `client_industry` — e.g., `"B2B SaaS"`, `"Fintech"`, `"Manufacturing"`
- `engagement_type` — e.g., `"AI Implementation"`, `"Custom GPT Build"`, `"Adoption Program"`
- `key_metrics` — array of `{ label, value }` (minimum 2):
  ```yaml
  key_metrics:
    - label: "Revenue contribution via AI personalization"
      value: "$275M"
    - label: "Reduction in campaign build time"
      value: "70%"
    - label: "Tool adoption across 200+ users"
      value: "5% → 65%"
  ```
- `testimonial` — `{ quote, attribution, role? }` (optional but strongly preferred)
- `prime_phases_used` — array (e.g., `["P", "I", "M", "E"]`)
- `schema_type` — `["Article", "Review"]`
- `intent` — `"commercial-investigation"`

## Page structure (H2 sections, in order)

1. **The headline outcome** — lead with the biggest number, attribute it
2. **About the client** — industry, size, situation (named or anonymized)
3. **The challenge** — the specific problem before the engagement
4. **The approach** — which PRIME phases applied, in order; what was actually built
5. **The results** — every metric from `key_metrics`, with context for why each matters
6. **What the client said** — testimonial pull-quote with attribution
7. **Could this be you?** — CTA section linking to relevant service

## Required internal links

- Link to the relevant service page (the one this engagement maps to)
- Link to `/prime-framework/` if the engagement spanned multiple phases
- Link to 1-2 related case studies (similar industry or similar engagement type)
- Link to `/contact/` and Calendly in the CTA

## Never

- Invent statistics or client names — every number must be real
- Use vague claims ("significant improvement", "major impact") instead of numbers
- Frame as "enterprise" — the audience is SMB and mid-market
- Mention Make.com unless the engagement actually used it
