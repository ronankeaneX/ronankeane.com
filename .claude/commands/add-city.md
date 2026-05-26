---
description: Research and add a single city to src/data/cities.ts
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Skill, Agent
---

Research one new city and add it to `src/data/cities.ts`.

1. Ask the user for: city name + state
2. Dispatch the `researcher` subagent in `city` mode
3. The researcher returns a JSON object matching `citySchema` (see `src/data/cities.ts`)
4. Edit `src/data/cities.ts` to append the new entry to the `cities` array
5. Run `npm run check` to verify the new entry validates against the Zod schema
6. Return a summary: city added, source URLs used for each statistic, any flags from the researcher

Every statistic in `local_stats` MUST include `source` (name) and `source_url`. Entries without sources fail validation.
