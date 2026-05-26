---
description: Create a new case study for ronankeane.com (src/content/case-studies/)
allowed-tools: Read, Write, Edit, Glob, Grep, Skill, Agent
---

Create a new case study for ronankeane.com.

1. Ask the user for: client name (or "Confidential X client" if NDA), client industry, engagement type, key metrics (minimum 2 — `label` + `value`), which PRIME phases were used, testimonial quote + attribution + role (if available)
2. **Never invent metrics or client details.** If the user can't supply real numbers, stop and ask for them.
3. Dispatch the `content-writer` subagent with the user-provided brief + `case-study-pattern` skill
4. Output destination: `src/content/case-studies/{slug}.mdx`
5. After creation, dispatch the `seo-auditor` subagent
6. Return summary: file created, internal links included, the service page(s) that should add a link TO this case study, image needs

Case studies are proof assets — they live or die by the concrete metrics in `key_metrics`. No metrics = no case study.
