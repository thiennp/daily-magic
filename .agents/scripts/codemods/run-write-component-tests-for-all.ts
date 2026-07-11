import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { listTsxWithoutTest } from "./list-tsx-without-test";
import { writeComponentTest } from "./write-component-test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const DRY_RUN = process.argv.includes("--dry-run");

function parseMaxArg(): number | null {
  const idx = process.argv.indexOf("--max");
  if (idx === -1 || idx + 1 >= process.argv.length) {
    return null;
  }
  const n = Number(process.argv[idx + 1]);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : null;
}

const maxPaths = parseMaxArg();
const pathsRaw = listTsxWithoutTest(REPO_ROOT);
const paths = maxPaths !== null ? pathsRaw.slice(0, maxPaths) : pathsRaw;
const total = paths.length;
const errors: string[] = [];

for (let i = 0; i < paths.length; i += 1) {
  const p = paths[i];
  process.stdout.write(
    `--- ${i + 1}/${total} ${path.relative(REPO_ROOT, p)}\n`,
  );
  try {
    writeComponentTest(p, { dryRun: DRY_RUN });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(`${p}: ${msg}`);
  }
}

const writtenCount = total - errors.length;
process.stdout.write(`\nDone. Wrote tests for ${writtenCount} components.\n`);

if (errors.length > 0) {
  process.stderr.write(`\nFailed ${errors.length}/${total}:\n`);
  for (const e of errors) {
    process.stderr.write(`${e}\n`);
  }
}

if (!DRY_RUN && writtenCount > 0) {
  process.stdout.write("\nUpdating snapshots (vitest -u)...\n");
  try {
    execSync("pnpm exec vitest run --config vite.test.config.ts -u", {
      cwd: REPO_ROOT,
      stdio: "inherit",
    });
  } catch {
    process.stderr.write(
      "\nNote: Some generated tests may fail at runtime (e.g. components that require non-empty object props).\n",
    );
  }
}
if (DRY_RUN) {
  process.stdout.write("\n[dry-run] skipped vitest -u.\n");
}

if (errors.length > 0 && !DRY_RUN) {
  process.exit(1);
}
