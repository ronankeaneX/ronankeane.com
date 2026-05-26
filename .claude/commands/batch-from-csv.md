---
description: Generate many content pages in one pass from a CSV input
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Skill, Agent
---

Bulk-generate content pages from a CSV file.

1. Ask the user for: path to the CSV, content type (service/geo/topic/blog/case-study)
2. Expected CSV columns (varies by type):
   - **geo:** `city, state, state_abbr, primary_keyword` (rest pulled from `cities.ts`)
   - **service:** `service_name, slug, primary_keyword, prime_phases (comma-separated)`
   - **topic:** `title, slug, primary_keyword, pillar (true/false), related_topics (semicolon-separated)`
   - **blog:** `title, slug, primary_keyword, category, tags (semicolon-separated)`
   - **case-study:** `client_name, client_industry, engagement_type, slug, key_metrics_json, prime_phases (comma-separated)`
3. For each row:
   - If geo/topic/blog requires research, dispatch the `researcher` subagent
   - Dispatch the `content-writer` subagent with the row data
   - Write the MDX to the correct collection
4. After all rows complete, dispatch the `seo-auditor` subagent on the full set
5. Return a summary table: row → file → status (created / skipped / failed)

Default behavior: skip rows where the target file already exists. Override with `--force` if the user wants to regenerate.
