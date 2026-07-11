/**
 * Verifies utility file naming: camelCase primary name under app/.../utils.
 * Run: tsx .agents/scripts/utility-naming.ts
 * See utility-naming-conventions.mdc.
 *
 * Skips tests, type-only modules, constants, guardz/DTO shims, and validates compound names (e.g. foo.util.ts → foo).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "../..");
const APP_DIR = path.join(APP_ROOT, "app");

const CAMEL_CASE = /^[a-z][a-zA-Z0-9]*$/;

const SKIP_SUFFIXES = [
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
  ".guardz.ts",
  ".dto.ts",
  ".enum.ts",
] as const;

function shouldSkipPath(normalizedRel: string): boolean {
  if (SKIP_SUFFIXES.some((s) => normalizedRel.endsWith(s))) {
    return true;
  }
  const withSlash = `/${normalizedRel.replace(/\\/g, "/")}/`;
  if (withSlash.includes("/utils/storybook/")) {
    return true;
  }
  if (withSlash.includes("/enums/")) {
    return true;
  }
  if (withSlash.includes("/form/validations/")) {
    return true;
  }
  if (withSlash.includes("/typeguards/")) {
    return true;
  }
  return false;
}

function isPascalCase(name: string): boolean {
  return (
    name.length > 0 &&
    name[0] === name[0].toUpperCase() &&
    name[0] !== name[0].toLowerCase()
  );
}

function primaryBaseName(basenameWithoutExt: string): string {
  const dotIndex = basenameWithoutExt.indexOf(".");
  if (dotIndex === -1) {
    return basenameWithoutExt;
  }
  return basenameWithoutExt.slice(0, dotIndex);
}

function isValidUtilityBaseName(basenameWithoutExt: string): boolean {
  const primary = primaryBaseName(basenameWithoutExt);
  return CAMEL_CASE.test(primary) && !isPascalCase(primary);
}

function walkUtils(dir: string, base: string): string[] {
  const result: string[] = [];
  if (!fs.existsSync(dir)) return result;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(base, full);
    if (e.isDirectory() && e.name !== "node_modules") {
      result.push(...walkUtils(full, base));
    } else if (
      (e.name.endsWith(".ts") || e.name.endsWith(".tsx")) &&
      !e.name.endsWith(".d.ts")
    ) {
      const normalized = rel.replace(/\\/g, "/");
      if (normalized.startsWith("utils/") || normalized.includes("/utils/")) {
        result.push(rel);
      }
    }
  }
  return result;
}

function main(): void {
  const violations: string[] = [];
  for (const rel of walkUtils(APP_DIR, APP_DIR)) {
    const normalized = rel.replace(/\\/g, "/");
    if (shouldSkipPath(normalized)) {
      continue;
    }
    const ext = path.extname(rel);
    const basename = path.basename(rel, ext);
    if (!isValidUtilityBaseName(basename)) {
      violations.push(
        `app/${rel}: utility files must use camelCase (e.g. handleNumericInput.ts)`,
      );
    }
  }
  if (violations.length > 0) {
    console.error("Utility naming (see utility-naming-conventions.mdc):");
    violations.forEach((v) => console.error(`  - ${v}`));
    process.exit(1);
  }
}

main();
