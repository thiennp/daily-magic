/**
 * Architecture and coding-standard checks scoped to changed files only.
 *
 * Run: npm run cursor:architecture [--staged|--base[=ref]|--all] [file...]
 *
 * Default (no flags): unstaged + staged changes vs HEAD under src/.
 * --staged: pre-commit scope (index only).
 * --base[=ref]: CI/PR scope (default ref origin/main).
 * --all: scan entire src/ tree (audit mode; avoid in hooks).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { ALLOWED_INDEX_PATHS } from "./lib/barrelAllowlist.constant";
import {
  filterChangedSrcSources,
  getChangedFiles,
  type ChangedFilesMode,
} from "./lib/getChangedFiles";
import { countEffectiveSourceLines } from "./lib/countEffectiveSourceLines";
import { parseImportStatements } from "./lib/parseImportStatements";
import { findLayerImportViolations } from "./lib/srcLayerImportRules";

const MAX_EFFECTIVE_SOURCE_LINES = 100;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const SRC_PREFIX = "src/";

const CAMEL_CASE = /^[a-z][a-zA-Z0-9]*$/;
const UTILITY_SKIP_SUFFIXES = [
  ".test.ts",
  ".test.tsx",
  ".spec.ts",
  ".spec.tsx",
  ".type.ts",
  ".types.ts",
  ".type.tsx",
  ".types.tsx",
  ".constant.ts",
  ".constants.ts",
  ".dto.ts",
  ".enum.ts",
] as const;

interface Violation {
  readonly file: string;
  readonly line?: number;
  readonly rule: string;
  readonly message: string;
}

const argv = process.argv.slice(2);

const parseMode = (): {
  readonly mode: ChangedFilesMode | "all";
  readonly baseRef?: string;
} => {
  if (argv.includes("--all")) {
    return { mode: "all" };
  }
  const staged = argv.includes("--staged");
  const baseArg = argv.find((arg) => arg.startsWith("--base"));
  if (staged) {
    return { mode: "staged" };
  }
  if (baseArg !== undefined) {
    const baseRef = baseArg.includes("=")
      ? baseArg.split("=")[1]
      : "origin/main";
    return { mode: "base", baseRef };
  }
  return { mode: "working" };
};

const explicitPaths = argv.filter((arg) => !arg.startsWith("--"));

const isTestFile = (srcRelativePath: string): boolean =>
  /\.(test|spec)\.(ts|tsx)$/i.test(srcRelativePath);

const isUtilityCandidate = (srcRelativePath: string): boolean => {
  const normalized = srcRelativePath.replace(/^src\//, "").replace(/\\/g, "/");
  if (!normalized.startsWith("lib/") && !normalized.includes("/utils/")) {
    return false;
  }
  if (UTILITY_SKIP_SUFFIXES.some((suffix) => normalized.endsWith(suffix))) {
    return false;
  }
  return true;
};

const isPascalCase = (name: string): boolean =>
  name.length > 0 &&
  name[0] === name[0].toUpperCase() &&
  name[0] !== name[0].toLowerCase();

const primaryBaseName = (basenameWithoutExt: string): string => {
  const dotIndex = basenameWithoutExt.indexOf(".");
  if (dotIndex === -1) {
    return basenameWithoutExt;
  }
  return basenameWithoutExt.slice(0, dotIndex);
};

const walkSrcSources = (dir: string, base: string): string[] => {
  const result: string[] = [];
  if (!fs.existsSync(dir)) {
    return result;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules") {
      result.push(...walkSrcSources(full, base));
      return;
    }
    if (
      (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) &&
      !entry.name.endsWith(".d.ts")
    ) {
      result.push(path.relative(base, full).replace(/\\/g, "/"));
    }
  });
  return result;
};

const resolveTargetFiles = (): readonly string[] => {
  const { mode, baseRef } = parseMode();
  if (mode === "all") {
    return walkSrcSources(path.join(REPO_ROOT, "src"), REPO_ROOT);
  }
  const changed = getChangedFiles({
    appRoot: REPO_ROOT,
    mode,
    baseRef,
    explicitPaths: explicitPaths.length > 0 ? explicitPaths : undefined,
  });
  return filterChangedSrcSources(changed, [".ts", ".tsx"]);
};

const checkBarrelAllowlist = (srcRelativePath: string): Violation | null => {
  const normalized = srcRelativePath.replace(/\\/g, "/");
  const basename = path.basename(normalized);
  if (basename !== "index.ts" && basename !== "index.tsx") {
    return null;
  }
  const srcPath = normalized.replace(/^src\//, "");
  if (ALLOWED_INDEX_PATHS.includes(srcPath)) {
    return null;
  }
  return {
    file: normalized,
    rule: "barrel-allowlist",
    message:
      "Barrel files must be allowlisted in .agents/scripts/lib/barrelAllowlist.constant.ts",
  };
};

const checkUtilityNaming = (srcRelativePath: string): Violation | null => {
  if (!isUtilityCandidate(srcRelativePath)) {
    return null;
  }
  const basename = path.basename(
    srcRelativePath,
    path.extname(srcRelativePath),
  );
  const primary = primaryBaseName(basename);
  if (CAMEL_CASE.test(primary) && !isPascalCase(primary)) {
    return null;
  }
  return {
    file: srcRelativePath,
    rule: "utility-naming",
    message:
      "Utility files must use camelCase (see utility-naming-conventions.mdc)",
  };
};

const isVendoredUiFile = (srcRelativePath: string): boolean =>
  srcRelativePath.replace(/\\/g, "/").startsWith("src/components/");

const checkMaxEffectiveSourceLines = (
  srcRelativePath: string,
  content: string,
): Violation | null => {
  const effectiveLineCount = countEffectiveSourceLines(content);
  if (effectiveLineCount <= MAX_EFFECTIVE_SOURCE_LINES) {
    return null;
  }

  return {
    file: srcRelativePath,
    rule: "max-effective-lines",
    message: `File exceeds ${MAX_EFFECTIVE_SOURCE_LINES} effective lines (${effectiveLineCount} lines excluding blank lines and imports)`,
  };
};

const checkSourceStandards = (
  srcRelativePath: string,
  content: string,
): readonly Violation[] => {
  const violations: Violation[] = [];
  const skipStrictSourceRules =
    isTestFile(srcRelativePath) || isVendoredUiFile(srcRelativePath);

  if (!skipStrictSourceRules) {
    content.split("\n").forEach((line, index) => {
      if (/\blet\b/.test(line) && !/^\s*\/\//.test(line)) {
        violations.push({
          file: srcRelativePath,
          line: index + 1,
          rule: "no-let",
          message: "Use const instead of let",
        });
      }
      if (/:\s*any\b|<any>|as\s+any\b/.test(line)) {
        violations.push({
          file: srcRelativePath,
          line: index + 1,
          rule: "no-any",
          message: "Avoid any; use explicit types or unknown with narrowing",
        });
      }
      if (/^\s*import\s+React\s+from\s+['"]react['"]/.test(line)) {
        violations.push({
          file: srcRelativePath,
          line: index + 1,
          rule: "react-import-style",
          message:
            'Use named imports from "react" instead of default React namespace import',
        });
      }
    });
  }

  return violations;
};

export const runArchitectureChecks = (
  targetFiles: readonly string[],
): readonly Violation[] => {
  const srcSources = targetFiles.filter((filePath) =>
    filePath.startsWith(SRC_PREFIX),
  );
  return srcSources.flatMap((filePath) => {
    const absolutePath = path.join(REPO_ROOT, filePath);
    if (!fs.existsSync(absolutePath)) {
      return [];
    }

    const violations: Violation[] = [];

    const barrelViolation = checkBarrelAllowlist(filePath);
    if (barrelViolation !== null) {
      violations.push(barrelViolation);
    }

    const utilityViolation = checkUtilityNaming(filePath);
    if (utilityViolation !== null) {
      violations.push(utilityViolation);
    }

    const content = fs.readFileSync(absolutePath, "utf-8");

    const maxLinesViolation = checkMaxEffectiveSourceLines(filePath, content);
    if (maxLinesViolation !== null) {
      violations.push(maxLinesViolation);
    }

    violations.push(...checkSourceStandards(filePath, content));

    const imports = parseImportStatements(content);
    violations.push(
      ...findLayerImportViolations(filePath, imports).map((violation) => ({
        file: violation.file,
        line: violation.line,
        rule: violation.ruleId,
        message: `${violation.message} (${violation.specifier})`,
      })),
    );

    return violations;
  });
};

function main(): void {
  const targetFiles = resolveTargetFiles();
  if (targetFiles.length === 0) {
    console.log("cursor:architecture — no changed src sources to check.");
    return;
  }

  const violations = runArchitectureChecks(targetFiles);
  if (violations.length === 0) {
    console.log(
      `cursor:architecture — OK (${targetFiles.length} changed file(s)).`,
    );
    return;
  }

  console.error(
    `cursor:architecture — ${violations.length} violation(s) in changed file(s):`,
  );
  violations.forEach((violation) => {
    const location =
      violation.line !== undefined
        ? `${violation.file}:${violation.line}`
        : violation.file;
    console.error(`  [${violation.rule}] ${location} — ${violation.message}`);
  });
  process.exit(1);
}

main();
