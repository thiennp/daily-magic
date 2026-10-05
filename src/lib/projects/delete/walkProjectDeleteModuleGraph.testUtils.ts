import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { vitestResolveAlias } from "../../../../vitest.resolveAlias";

const ROOT = process.cwd();
export const DELETE_DIR = "src/lib/projects/delete";
export const FORBIDDEN_SPECIFIERS = [
  "fs",
  "node:fs",
  "node:fs/promises",
  "fs/promises",
  "child_process",
  "node:child_process",
  "net",
  "node:net",
  "http",
  "node:http",
];

const resolveFile = (base: string): string | null => {
  for (const candidate of [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}/index.ts`,
  ]) {
    const isSource = candidate.endsWith(".ts") || candidate.endsWith(".tsx");
    if (isSource && existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
};

/** Resolve @/…, @agent-witch/… and relative specifiers to source files; null for npm/node builtins. */
const resolveSpecifier = (from: string, specifier: string): string | null => {
  if (specifier.startsWith(".")) {
    return resolveFile(path.resolve(path.dirname(from), specifier));
  }
  if (specifier.startsWith("@/")) {
    return resolveFile(path.join(ROOT, "src", specifier.slice(2)));
  }
  const exact = vitestResolveAlias[specifier];
  return exact !== undefined && specifier.startsWith("@agent-witch/")
    ? resolveFile(exact)
    : null;
};

/** Runtime imports only: `import type` / `export type` are erased at build time. */
const importsOf = (file: string): string[] =>
  [
    ...readFileSync(file, "utf8").matchAll(
      /(?:import|export)(?!\s+type\b)[^"';]*?from\s+["']([^"']+)["']|import\s+["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)|require\(\s*["']([^"']+)["']\s*\)/g,
    ),
  ].map((m) => m[1] ?? m[2] ?? m[3] ?? m[4]);

/** Runtime import graph of src/lib/projects/delete (non-test files). */
export const walkGraph = (): { files: string[]; bare: Set<string> } => {
  const entries = readdirSync(path.join(ROOT, DELETE_DIR))
    .filter((name) => name.endsWith(".ts") && !name.includes(".test"))
    .map((name) => path.join(ROOT, DELETE_DIR, name));
  const seen = new Set<string>();
  const bare = new Set<string>();
  const queue = [...entries];
  while (queue.length > 0) {
    const file = queue.pop() as string;
    if (seen.has(file)) continue;
    seen.add(file);
    for (const specifier of importsOf(file)) {
      const resolved = resolveSpecifier(file, specifier);
      if (resolved !== null) {
        queue.push(resolved);
      } else {
        bare.add(specifier);
      }
    }
  }
  return { files: [...seen], bare };
};
