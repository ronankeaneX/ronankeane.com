---
name: service-page-pattern
description: Anatomy of a service page for ronankeane.com — required H2s, FAQ structure, schema fields, internal linking rules, PRIME phase tagging. Invoke when creating, editing, or auditing any file in src/content/services/.
---

# Service page pattern

## Required frontmatter

See `src/content.config.ts` (services collection). Required:
- `title` — `"{Service Name} | Ronan Keane"` (50-60 chars)
- `description` — 150-160 chars, include the service keyword + value prop
- `primary_keyword` — the search intent
- `service_type` — e.g., `"AI Strategy Consulting"`, `"Copilot Training"`
- `prime_phases` — array of letters indicating which PRIME phases this service covers (e.g., `["P", "R"]` for Potential Mapping + Roadmap & Strategy)
- `schema_type` — `["Service", "ProfessionalService"]`
- `intent` — `"commercial-investigation"`

## Page structure (H2 sections, in order)

1. **Hero** — `{Service Name}: {One-line value prop}`
2. **Who this is for** — explicit fit (SMB, mid-market, specific roles, specific situations)
3. **What you get** — concrete deliverables, not abstract benefits
4. **How it works** — process steps; reference the relevant PRIME phases
5. **Outcomes our clients see** — with specific numbers from real case studies (link to them)
6. **Common questions** — 4-6 FAQs
7. **Ready to start?** — CTA section

## Required internal links

- Link to 2+ relevant case studies
- Link to `/prime-framework/` if the service spans multiple PRIME phases
- Link to 1-2 related services
- Link to `/contact/` and Calendly in CTAs

## FAQ examples

- "Who is this service for?"
- "How long does a typical engagement last?"
- "What does this cost?" (be honest — ranges or "depends on" with what it depends on)
- "How is this different from buying a tool / hiring an agency / hiring full-time?"
- "What if we're still in the research phase?"

## CTAs

- Primary: "Schedule a consultation" → Calendly
- Secondary: "Send a message" → `/contact/`

## Voice

- Lead with concrete deliverables, not adjectives
- Name the tools you implement (Claude, ChatGPT, n8n, Clay, etc.) — never Make.com in default content
- Reference real outcomes ($275M, 70%, 5%→65%) where they apply
