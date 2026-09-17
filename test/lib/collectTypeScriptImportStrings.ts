import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const IMPORT_PATTERN =
  /(?:import|export)\s+(?:type\s+)?(?:[\w*{}\s,]+from\s+)?["']([^"']+)["']/g;

const walkTsFiles = (rootDir: string): string[] => {
  const entries = readdirSync(rootDir);
  return entries.flatMap((entry) => {
    const fullPath = path.join(rootDir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === "dist") {
        return [];
      }
      return walkTsFiles(fullPath);
    }
    if (/\.(ts|tsx|mts|cts)$/.test(entry) && !entry.endsWith(".d.ts")) {
      return [fullPath];
    }
    return [];
  });
};

export const collectTypeScriptImportStrings = (rootPath: string): string[] => {
  const stat = statSync(rootPath);
  const files = stat.isDirectory()
    ? walkTsFiles(rootPath)
    : /\.(ts|tsx|mts|cts)$/.test(rootPath) && !rootPath.endsWith(".d.ts")
      ? [rootPath]
      : [];
  const imports = new Set<string>();
  files.forEach((filePath) => {
    const source = readFileSync(filePath, "utf8");
    let match = IMPORT_PATTERN.exec(source);
    while (match) {
      imports.add(match[1]);
      match = IMPORT_PATTERN.exec(source);
    }
    IMPORT_PATTERN.lastIndex = 0;
  });
  return [...imports].sort();
};
