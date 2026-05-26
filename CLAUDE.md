# ronankeane.com — Claude Code instructions

You are helping Ronan Keane build and maintain ronankeane.com, a B2B AI consulting site optimized for organic search and LLM citation.

## About Ronan

- AI Strategy & Implementation Consultant, 20+ years B2B operations
- Based in North Carolina, serves clients nationally
- Background: GTT Communications, Vonage Business, Verizon
- Framework: **PRIME** (Potential Mapping, Roadmap & Strategy, Implementation Planning, Migration & Execution, Enablement & Adoption)
- **Never write "PRISMA"** — it's always PRIME. A pre-commit hook will fail any commit containing it.

## Audience

SMB and mid-market B2B leaders (CEOs, Presidents, Founders, COOs, CROs, CMOs, VPs of Operations) evaluating AI implementation. Skeptical of hype, focused on measurable ROI. Read at executive level — direct, evidence-rich, no fluff. **NEVER frame content as enterprise.**

## Voice

- Direct, confident, second-person ("you," "your team")
- Concrete over abstract: name tools (Claude Code, Claude Cowork, ChatGPT, Perplexity, Clay, n8n), cite specific numbers ($275M, 70%, 5%→65%), reference real companies where appropriate
- **Do NOT mention Make.com** in default content (case studies may reference it where historically accurate)
- No marketing-speak — avoid: "leverage," "synergy," "unlock potential," "revolutionary," "game-changer," "in today's fast-paced world"
- Short sentences. Paragraphs of 2-4 sentences max.

## Brand (v2 — locked 2026-05-22)

- Typography: **Geist** (display + body), **Geist Mono** (labels, eyebrows, technical callouts). No serif.
- Base: warm off-white `#FAF7F2`
- Accent: **burnt orange `#C2410C`** (deep `#9A3412`, soft `#FED7AA`)
- Devices: 1px hairline grid background, selective slash-prefix labels (`/the problem`, `/the framework`), oversized numeric proof, dark sections with subtle dot grid
- Tokens live in `src/styles/global.css` under `@theme` — change them there, not inline. Tailwind 4 generates all utility classes (`bg-accent`, `text-ink-muted`, `font-mono`, etc.) from these variables.

## Stack

- Astro 5 + MDX content collections
- Tailwind 4 via `@tailwindcss/vite` (NOT the old `@astrojs/tailwind` integration). Configuration lives in `src/styles/global.css` `@theme` block — there is no `tailwind.config.ts`.
- TypeScript strict
- Cloudflare Pages
- Formspree (forms → ronan@ronankeane.com) + Cloudflare Turnstile (spam)
- Calendly: `https://calendly.com/ronankeane/ai-revenue-acceleration-readiness-discovery-call` — the **only** approved URL.

## Content model

Every page is an MDX file in `src/content/{collection}/`. Collections:

- `services/` — what Ronan offers
- `topics/` — educational pillar pages (mostly NOT in primary nav)
- `geo/` — location-targeted (one file per city, NEVER cross-contaminate)
- `case-studies/` — proof
- `blog/` — articles
- `resources/` — downloadables, quiz
- `pages/` — home, about, contact

Topic pages must link to 3-5 other topic pages plus relevant service/geo pages via the `related_topics` frontmatter field — this drives an auto-rendered Related section that builds the topical mesh.

## Frontmatter is enforced via Zod schemas

Every file MUST include the required fields for its collection. See `src/content.config.ts`. Required across all collections: `title`, `description`, `publishDate`, `lastUpdated`, `intent`, `schema_type`.

## SEO + LLM citation rules

1. Title tag: 50-60 chars, include primary keyword + brand
2. Meta description: 150-160 chars, action-oriented, include keyword
3. H1 = page title, exactly one per page
4. H2 sections answer specific search queries (use question phrasing where natural)
5. Include a FAQ section with 4-8 questions on most pages (drives `FAQPage` schema + LLM Q&A citation)
6. Cite specific numbers, named entities, and proper nouns. LLMs cite pages with concrete claims, not vague ones.
7. Reference the current year naturally ("As of 2026...")
8. `lastUpdated` date is dynamic, pulled from frontmatter
9. Internal links: every new page links to at least 3 existing relevant pages, and we add a link TO the new page from at least one existing page
10. Add JSON-LD schema appropriate to the page type (auto-generated from frontmatter — don't hand-write)

## Geo pages — special rules

- **ONE city per file.** Never mix regional content from other cities.
- Each must include: local market data, named local companies/institutions, service area, local industries served, FAQ section.
- Available data lives in `src/data/cities.ts` — pull from there, don't invent.

## CTAs

- **Primary** (everywhere): "Schedule a consultation" → `https://calendly.com/ronankeane/ai-revenue-acceleration-readiness-discovery-call`
- **Secondary** (everywhere): "Send a message" → `/contact/`
- **Never use any other Calendly URL.** The old WordPress site had a contractor's Calendly link by mistake — verify on every migration.

## When creating a new page

1. Confirm content type, slug, primary keyword, intent
2. Draft frontmatter (validate against the collection's Zod schema)
3. Draft body following voice rules above
4. Identify 3+ internal links to existing pages
5. Identify 1+ existing page that should link TO this new page
6. Output the file to the correct collection
7. Note any image needs (don't invent image paths)

## Hooks (guardrails)

Three layers — each enforces a different class of rule. Don't try to bypass them.

**Git pre-commit** (via `husky` + `scripts/precommit-checks.mjs`) — blocks any commit that contains:
- "PRISMA" anywhere
- A Calendly URL that isn't the approved one
- Placeholder hrefs (`href="#"`, `(#)`, `TODO`, `FIXME`) in MDX
- Frontmatter that fails `astro check` (when content files or `src/content.config.ts` are staged)

**Claude Code PostToolUse** (via `.claude/settings.json` + `scripts/bump-last-updated.mjs`) — fires on every Write/Edit and auto-bumps `lastUpdated` to today on any MDX file in `src/content/`. Silent on every other file. Guards against re-triggering itself.

**GitHub Actions** (via `.github/workflows/preview-quality.yml`) — runs Lighthouse CI + schema validation on every PR and on push to `main`. Fails the build if SEO score < 95 or accessibility < 95. Dormant until the repo is on GitHub.

If a hook fails, fix the underlying issue. Never use `--no-verify` without first telling Ronan and recording why.

## When editing

- Preserve existing URLs unless explicitly told to change them
- If changing a URL, add a 301 redirect entry to `public/_redirects`
- Update `lastUpdated` in frontmatter

## Things to never do

- Write "PRISMA" (it's PRIME)
- Use placeholder links like `(#)`, `href="#"`, `TODO`, or `FIXME` — every link must point somewhere real or be removed
- Copy content from one geo page to another without substituting all city/region/company references
- Invent statistics, client names, or testimonials
- Use the wrong Calendly URL
- Frame content as "enterprise" — audience is SMB and mid-market
- Mention Make.com in default content
- Use Fraunces or any other display font — brand v2 is all-Geist
- Add a `tailwind.config.ts` — Tailwind 4 uses `@theme` in `src/styles/global.css`
