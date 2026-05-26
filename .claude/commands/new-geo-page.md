---
description: Create a new city-targeted geo page for ronankeane.com (src/content/geo/)
allowed-tools: Read, Write, Edit, Glob, Grep, Skill, Agent
---

Create a new geo page for ronankeane.com:

1. Ask the user which city + state (autocomplete from `src/data/cities.ts` if the city is already seeded)
2. If the city is NOT in `src/data/cities.ts`:
   - Dispatch the `researcher` subagent in `city` mode to populate the city data
   - Validate the new entry against `citySchema` before proceeding
3. Dispatch the `content-writer` subagent with the city data + `geo-page-pattern` skill
4. Output destination: `src/content/geo/ai-consultant-{city-slug}-{state-abbr}.mdx`

## Required frontmatter
- `title`: `"AI Consultant {City} {State} | Ronan Keane"`
- `description`: ~155 chars including "AI consultant", city, state, value prop
- `city`, `state`, `state_abbr`, `region` (optional)
- `publishDate`, `lastUpdated`: today
- `intent`: `"transactional"`
- `schema_type`: `["LocalBusiness", "ProfessionalService"]`
- `service_areas`, `local_industries`, `notable_companies`: pulled from `cities.ts`

## Required structure (H2s)
- `AI Strategic Consulting & Implementation in {City}, {State}`
- `AI Adoption in {City}: {Local Hook}` (hook from cities.ts)
- `Bespoke AI Implementation Services in {City}`
- `The PRIME AI Framework for {City} Companies`
- `AI Implementation for {City}'s Key Industries`
- `Hands-On Implementation at Your Office`
- `Frequently Asked Questions: {City} AI Consulting` (4-6 Qs)
- `Serving the Greater {City} Area`

## Required internal links
- `/ai-consultant/` at least 2x
- `/prime-framework/` at least 1x
- 2 case studies
- 3 other geo pages in the "Serving the Greater {City} Area" footer
- `/contact/` in CTAs

## After creation
5. Dispatch the `seo-auditor` subagent on the new file
6. Add a link FROM `/ai-consultant/` city list TO this new geo page
7. Return summary: file created, links added, image needs

**CRITICAL:** Never copy content from another city's geo page without fully substituting all city/region/company references. The old WordPress site has a Raleigh page that references Wilmington — do not repeat that mistake.
