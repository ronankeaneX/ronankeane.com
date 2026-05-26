---
name: geo-page-pattern
description: Full anatomy of a geo (city-targeted) page for ronankeane.com — required H2s, FAQ structure, schema fields, internal linking rules, and the critical "never cross-contaminate cities" rule. Invoke when creating, editing, or auditing any file in src/content/geo/.
---

# Geo page pattern

## The single most important rule

**ONE CITY PER FILE. NEVER CROSS-CONTAMINATE.**

A Raleigh page must not reference Wilmington-area entities (Cape Fear region, New Hanover/Brunswick/Pender counties, TEKMountain, Common Desk). A Charlotte page must not reference Asheville landmarks. Every city/region/company name comes from THIS city's entry in `src/data/cities.ts`.

The existing WordPress site has this bug in the Raleigh page. Do not repeat it.

## Required frontmatter

See `src/content.config.ts` (geo collection). Required fields:
- `title` — `"AI Consultant {City} {State} | Ronan Keane"` (50-60 chars)
- `description` — 150-160 chars, include "AI consultant", city, state, value prop
- `city`, `state`, `state_abbr`, `region` (optional)
- `primary_keyword` — usually `"AI consultant {city}"` or similar
- `service_areas` — pulled from `cities.ts`
- `local_industries` — pulled from `cities.ts`
- `notable_companies` — pulled from `cities.ts`
- `schema_type` — `["LocalBusiness", "ProfessionalService"]`
- `intent` — `"transactional"`

## Page structure (H2 sections, in order)

1. **Hero** — `AI Strategic Consulting & Implementation in {City}, {State}`
2. **AI Adoption in {City}: {Local Hook}** — pull the `hook` from `cities.ts`
3. **Bespoke AI Implementation Services in {City}**
4. **The PRIME AI Framework for {City} Companies**
5. **AI Implementation for {City}'s Key Industries** — use `local_industries`
6. **Hands-On Implementation at Your Office** — list `service_areas`
7. **Frequently Asked Questions: {City} AI Consulting** — 4-6 Qs
8. **Serving the Greater {City} Area** — list service-area cities; link to 3 other geo pages

## Required internal links

- `/ai-consultant/` — at least 2x
- `/prime-framework/` — at least 1x
- 2 case studies
- 3 other geo pages in the "Serving the Greater {City} Area" footer
- `/contact/` in the CTA

## FAQ structure

Each question should be a real search query a buyer might type. Examples:
- "How do AI consultants in {city} differ from national firms?"
- "What does AI implementation cost for a {city} mid-market company?"
- "How long does an AI implementation engagement typically take?"
- "Which AI tools do you implement most often for {city} businesses?"

## CTAs

- Primary: "Schedule a consultation" → `https://calendly.com/ronankeane/ai-revenue-acceleration-readiness-discovery-call`
- Secondary: "Send a message" → `/contact/`

## After creating the page

- Add a link FROM `/ai-consultant/` city list TO this new geo page
- Flag image needs (hero image at minimum — give the expected path, don't invent)
