---
description: One-time bulk research for the entire launch city list — populates src/data/cities.ts before any geo pages are created
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Skill, Agent
---

One-time seed for the geo program. Dispatches the `researcher` subagent in parallel for every city in the launch list, then validates and writes the full `src/data/cities.ts`.

1. Ask the user to confirm the launch city list. Default (NC-only, mirroring the current WordPress site):
   - Raleigh, NC
   - Charlotte, NC
   - Wilmington, NC
   - Greensboro, NC
   - Asheville, NC
   - Durham, NC

   Ronan may want to expand beyond NC — confirm before proceeding.

2. For each city, dispatch the `researcher` subagent in `city` mode (in parallel where possible)
3. Validate every returned entry against `citySchema` (rejecting any missing sources or required fields)
4. Write the consolidated array to `src/data/cities.ts`, preserving the schema definition at the top of the file
5. Run `npm run check` to verify everything validates
6. Return a summary: cities seeded, total source citations, any flags

After seeding, **Ronan reviews the file once** before any geo pages get generated. Geo pages then pull from this file deterministically — no per-page research needed.
