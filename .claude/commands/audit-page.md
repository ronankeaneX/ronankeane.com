---
description: Run the seo-auditor subagent on a specific page or glob of pages
allowed-tools: Read, Edit, Glob, Grep, Skill, Agent
---

Audit a content page (or set of pages) against the SEO + LLM citation checklist.

1. Ask the user for: a file path or a glob pattern (e.g., `src/content/geo/**/*.mdx`)
2. Dispatch the `seo-auditor` subagent with the path(s)
3. Return the auditor's structured report — failures (block commit), warnings (recommend fix), internal linking opportunities
4. Optionally apply the proposed fixes if the user approves
