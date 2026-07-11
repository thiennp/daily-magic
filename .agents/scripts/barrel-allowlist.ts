/**
 * Verifies that index.ts barrel files under app/ are in the allowlist only.
 * Run: tsx .agents/scripts/barrel-allowlist.ts
 * See code-standard.mdc § Component Organization and folder-organization.mdc.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ALLOWED_INDEX_PATHS } from "./lib/barrelAllowlist.constant";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "../..");
const APP_DIR = path.join(APP_ROOT, "app");

function findIndexFiles(dir: string, base: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const result: string[] = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(base, full);
    if (e.isDirectory()) {
      result.push(...findIndexFiles(full, base));
    } else if (e.name === "index.ts" || e.name === "index.tsx") {
      result.push(rel);
    }
  }
  return result;
}

function main(): void {
  if (!fs.existsSync(APP_DIR)) {
    console.error("app/ not found");
    process.exit(1);
  }
  const found = findIndexFiles(APP_DIR, APP_DIR);
  const allowedSet = new Set(ALLOWED_INDEX_PATHS);
  const disallowed = found.filter((f) => !allowedSet.has(f));
  if (disallowed.length > 0) {
    console.error(
      "Barrel files (index.ts/index.tsx) must be in allowlist. See code-standard.mdc, folder-organization.mdc.",
    );
    console.error("Disallowed:");
    disallowed.forEach((f) => console.error(`  - app/${f}`));
    console.error(
      "To allow a new barrel, add it to ALLOWED_INDEX_PATHS in .agents/scripts/barrel-allowlist.ts",
    );
    process.exit(1);
  }
}

main();
