#!/usr/bin/env node
/**
 * Pre-commit guardrails for ronankeane.com.
 *
 * Runs five mechanical checks against staged files. Any failure
 * blocks the commit with an explanation; use --no-verify only in
 * an emergency (and tell Ronan).
 *
 *   1. PRISMA detector — the framework is PRIME (never PRISMA)
 *   2. Wrong-Calendly detector — only the approved URL is allowed
 *   3. Placeholder-link check — no href="#", (#), TODO, FIXME
 *   4. Schema validation — `npm run check` if content/schema changed
 *   5. Broken-internal-link check — stubbed; implement after first 5+ pages
 */

import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const APPROVED_CALENDLY =
  "calendly.com/ronankeane/ai-revenue-acceleration-readiness-discovery-call";
const ROOT = process.cwd();

function getStagedFiles() {
  try {
    return execSync("git diff --cached --name-only --diff-filter=ACMR", {
      encoding: "utf8",
    })
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}

function read(file) {
  const path = join(ROOT, file);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

const stagedFiles = getStagedFiles();

// Only scan files that will become published content or render published content.
// Meta-docs (CLAUDE.md, .claude/, scripts/, brand-preview-*.html) describe the
// rules themselves and would false-positive every check.
const PUBLISHED_PATH = /^src\/(content|pages|layouts|components)\//;
const publishedFiles = stagedFiles.filter((f) =>
  PUBLISHED_PATH.test(f.replace(/\\/g, "/")),
);

const mdxFiles = publishedFiles.filter((f) => /\.(md|mdx)$/.test(f));
const codeFiles = publishedFiles.filter((f) =>
  /\.(ts|tsx|astro|mjs|cjs|js)$/.test(f),
);
const scanFiles = [...new Set([...mdxFiles, ...codeFiles])];
const contentChanged = stagedFiles.some(
  (f) => f.startsWith("src/content/") || f === "src/content.config.ts",
);

const failures = [];
const warnings = [];

// === 1. PRISMA detector ===
for (const file of scanFiles) {
  const content = read(file);
  if (!content) continue;
  const re = /\bPRISMA\b/gi;
  let m;
  while ((m = re.exec(content)) !== null) {
    failures.push(
      `${file}:${lineOf(content, m.index)} — "PRISMA" found. The framework is PRIME.`,
    );
  }
}

// === 2. Wrong Calendly URL ===
for (const file of scanFiles) {
  const content = read(file);
  if (!content) continue;
  const re = /calendly\.com\/[^\s)"'<>]+/gi;
  let m;
  while ((m = re.exec(content)) !== null) {
    const url = m[0].toLowerCase();
    if (!url.includes(APPROVED_CALENDLY)) {
      failures.push(
        `${file}:${lineOf(content, m.index)} — Wrong Calendly URL: ${m[0]}\n        Approved: https://${APPROVED_CALENDLY}`,
      );
    }
  }
}

// === 3a. Placeholder href="#" — all published files (MDX + templates) ===
for (const file of scanFiles) {
  const content = read(file);
  if (!content) continue;
  const re = /href\s*=\s*["']#["']/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    failures.push(
      `${file}:${lineOf(content, m.index)} — Placeholder href="#" found. Every link must point somewhere real or be removed.`,
    );
  }
}

// === 3b. Markdown placeholders + TODO/FIXME (MDX only) ===
const mdxPlaceholders = [
  { re: /\]\(\s*#\s*\)/g, desc: "markdown link (#)" },
  { re: /\bTODO\b/g, desc: "TODO marker" },
  { re: /\bFIXME\b/g, desc: "FIXME marker" },
];

for (const file of mdxFiles) {
  const content = read(file);
  if (!content) continue;
  for (const { re, desc } of mdxPlaceholders) {
    let m;
    while ((m = re.exec(content)) !== null) {
      failures.push(
        `${file}:${lineOf(content, m.index)} — Placeholder found (${desc}). Every link must point somewhere real or be removed.`,
      );
    }
  }
}

// === 4. Schema validation (only if content or schema files changed) ===
if (contentChanged) {
  try {
    execSync("npm run check", { stdio: "inherit", cwd: ROOT });
  } catch {
    failures.push(
      "Schema validation failed (astro check). Fix the frontmatter / content errors above.",
    );
  }
}

// === 5. Broken internal links — stubbed ===
warnings.push(
  "Broken-internal-link check is stubbed. Implement after the first ~5 pages exist (needs collection enumeration).",
);

// === Report ===
if (failures.length > 0) {
  console.error("\n  [FAIL] Pre-commit checks failed:\n");
  for (const f of failures) console.error("    " + f);
  console.error(
    "\n  Commit blocked. Fix the issues above and try again. Do NOT use --no-verify without telling Ronan.\n",
  );
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn("\n  [WARN]");
  for (const w of warnings) console.warn("    " + w);
}

console.log("\n  [OK] Pre-commit checks passed.\n");
process.exit(0);
