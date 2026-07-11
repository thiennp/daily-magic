import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
);
const DRY_RUN = process.argv.includes("--dry-run");
const GENERATED_MARKER = "@generated-by write-component-test.ts";

function isGeneratedTest(content: string): boolean {
  if (content.includes(GENERATED_MARKER)) return true;
  return (
    content.includes("createSnapshotRootElm") &&
    content.includes("toMatchSnapshot") &&
    /it\s*\(\s*["']renders correctly \(case 1\)["']/.test(content)
  );
}

function walk(dir: string, collected: string[]): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue;
      walk(fullPath, collected);
    } else if (entry.isFile() && entry.name.endsWith(".test.tsx")) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (isGeneratedTest(content)) {
        collected.push(fullPath);
      }
    }
  }
}

const toRemove: string[] = [];
walk(path.join(REPO_ROOT, "app"), toRemove);
for (const file of toRemove) {
  if (DRY_RUN) {
    console.log("[dry-run] would remove:", path.relative(REPO_ROOT, file));
    const dir = path.dirname(file);
    const base = path.basename(file);
    const snapshotPath = path.join(dir, "__snapshots__", `${base}.snap`);
    if (fs.existsSync(snapshotPath)) {
      console.log(
        "[dry-run] would remove snapshot:",
        path.relative(REPO_ROOT, snapshotPath),
      );
    }
    continue;
  }
  fs.unlinkSync(file);
  console.log("Removed:", path.relative(REPO_ROOT, file));
  const dir = path.dirname(file);
  const base = path.basename(file);
  const snapshotPath = path.join(dir, "__snapshots__", `${base}.snap`);
  if (fs.existsSync(snapshotPath)) {
    fs.unlinkSync(snapshotPath);
    console.log("Removed snapshot:", path.relative(REPO_ROOT, snapshotPath));
  }
}
console.log(
  DRY_RUN
    ? `[dry-run] would remove ${toRemove.length} generated test file(s).`
    : `Removed ${toRemove.length} generated test file(s).`,
);
