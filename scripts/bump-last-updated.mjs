#!/usr/bin/env node
/**
 * Claude Code PostToolUse hook — auto-bumps the `lastUpdated`
 * frontmatter field whenever an MDX file in src/content/ is
 * modified via Write or Edit.
 *
 * Wired in .claude/settings.json. Receives the tool event as JSON
 * on stdin (see Claude Code hooks docs). Exits silently on any
 * non-applicable event so we never block the agent's flow.
 *
 * Guard against infinite recursion: if `lastUpdated` is already
 * today's date, skip — that prevents our own write from re-triggering
 * the same hook.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  try {
    run(JSON.parse(raw));
  } catch {
    // Never block on errors — this hook is non-essential.
    process.exit(0);
  }
});

function run(event) {
  const filePath = event?.tool_input?.file_path;
  if (!filePath || typeof filePath !== "string") process.exit(0);

  const normalized = filePath.replace(/\\/g, "/");
  if (!/\/src\/content\/.+\.(md|mdx)$/.test(normalized)) process.exit(0);
  if (!existsSync(filePath)) process.exit(0);

  const today = new Date().toISOString().slice(0, 10);
  const content = readFileSync(filePath, "utf8");

  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) process.exit(0);

  const fm = fmMatch[1];
  const luMatch = fm.match(/^lastUpdated:\s*(.+)$/m);
  if (!luMatch) process.exit(0);

  const currentRaw = luMatch[1].trim().replace(/^["']|["']$/g, "");
  // Strip any time / TZ suffix for comparison
  const currentDate = currentRaw.slice(0, 10);
  if (currentDate === today) process.exit(0); // already today — break the loop

  const newFm = fm.replace(
    /^lastUpdated:\s*.+$/m,
    `lastUpdated: ${today}`,
  );
  const newContent = content.replace(fm, newFm);
  writeFileSync(filePath, newContent, "utf8");
  process.exit(0);
}
