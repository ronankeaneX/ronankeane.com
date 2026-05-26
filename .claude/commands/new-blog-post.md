---
description: Create a new blog post for ronankeane.com (src/content/blog/)
allowed-tools: Read, Write, Edit, Glob, Grep, Skill, Agent
---

Create a new blog post for ronankeane.com.

1. Ask the user: post title, target slug, primary keyword, category (NEVER "Uncategorized"), tags
2. If the post requires research, dispatch the `researcher` subagent in `topic` mode
3. Dispatch the `content-writer` subagent with the research brief + `voice-and-style` and `mdx-frontmatter` skills
4. Output destination: `src/content/blog/{slug}.mdx`
5. After creation, dispatch the `seo-auditor` subagent
6. Return summary: file created, internal links included, existing pages that should add a link TO this one, image needs

Blog posts should follow the same voice rules as everything else — direct, evidence-rich, no marketing-speak. Cite real numbers and real companies.
