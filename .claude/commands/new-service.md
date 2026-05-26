---
description: Create a new service page for ronankeane.com (src/content/services/)
allowed-tools: Read, Write, Edit, Glob, Grep, Skill, Agent
---

Create a new service page for ronankeane.com.

1. Ask the user for: service name, target slug, primary keyword, which PRIME phase(s) it covers (P/R/I/M/E)
2. If the service requires research (industry context, market data), dispatch the `researcher` subagent in `service` mode first
3. Dispatch the `content-writer` subagent with the research brief + `service-page-pattern` skill
4. Output destination: `src/content/services/{slug}.mdx`
5. After creation, dispatch the `seo-auditor` subagent on the new file
6. Return summary: file created, internal links included, existing pages that should add a link TO this one, any image needs

The page must follow the structure in the `service-page-pattern` skill.
