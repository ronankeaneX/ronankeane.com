---
description: Create a new topic page (educational pillar or cluster) for ronankeane.com (src/content/topics/)
allowed-tools: Read, Write, Edit, Glob, Grep, Skill, Agent
---

Create a new topic page for ronankeane.com.

1. Ask the user: topic title, target slug, primary keyword, pillar or cluster?, which existing topics should appear in `related_topics` (3-8)
2. Dispatch the `researcher` subagent in `topic` mode to produce the outline + sourced facts
3. Dispatch the `content-writer` subagent with the research brief + `topic-page-pattern` skill
4. Output destination: `src/content/topics/{slug}.mdx`
5. After creation, dispatch the `seo-auditor` subagent
6. Update the `related_topics` field on each linked topic to add a reciprocal link to this new topic (mesh-building)
7. Return summary: file created, links added, image needs, reciprocal updates to other topics

Most topics stay out of primary nav (`in_nav: false`). Only confirm `in_nav: true` if the user explicitly says so.
