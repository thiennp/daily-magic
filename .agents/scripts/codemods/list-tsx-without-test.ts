import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
);

export function listTsxWithoutTest(root: string = REPO_ROOT): string[] {
  const results: string[] = [];
  const nodeModules = path.join(root, "node_modules");

  function walk(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || fullPath === nodeModules) continue;
        walk(fullPath);
      } else if (
        entry.isFile() &&
        entry.name.endsWith(".tsx") &&
        !entry.name.endsWith(".test.tsx") &&
        !entry.name.endsWith(".spec.tsx")
      ) {
        const base = entry.name.replace(/\.tsx$/, "");
        if (/^[a-z]/.test(base)) continue;
        if (/\.(meta|constant|type|enum)$/.test(base)) continue;
        const testPath = path.join(dir, `${base}.test.tsx`);
        const specPath = path.join(dir, `${base}.spec.tsx`);
        if (fs.existsSync(testPath) || fs.existsSync(specPath)) continue;
        results.push(path.resolve(fullPath));
      }
    }
  }

  walk(root);
  return results.sort();
}

process.stdout.on("error", () => process.exit(0));

const files = listTsxWithoutTest(REPO_ROOT);
for (const file of files) {
  console.log(file);
}
