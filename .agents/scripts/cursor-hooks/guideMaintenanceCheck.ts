#!/usr/bin/env tsx
/**
 * Maps changed repo paths to user/developer guide chapters.
 * Used by Cursor hooks to remind agents to read and update guides.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../..");

export type GuideSection = {
  readonly id: string;
  readonly title: string;
  readonly userGuide: string;
  readonly developerGuide: string;
  readonly pathPrefixes: readonly string[];
};

export type GuideMaintenanceMap = {
  readonly version: number;
  readonly sections: readonly GuideSection[];
};

const MAP_PATH = path.join(REPO_ROOT, "docs/guides/guide-maintenance.map.json");

export const loadGuideMaintenanceMap = (): GuideMaintenanceMap => {
  const raw = readFileSync(MAP_PATH, "utf8");
  return JSON.parse(raw) as GuideMaintenanceMap;
};

const normalizePath = (filePath: string): string =>
  filePath.replace(/\\/g, "/").replace(/^\.\//, "");

const pathMatchesPrefix = (filePath: string, prefix: string): boolean => {
  const normalized = normalizePath(filePath);
  const p = normalizePath(prefix);
  if (p.endsWith(".md") || p.includes(".")) {
    return normalized === p || normalized.endsWith(`/${p}`);
  }
  return (
    normalized === p ||
    normalized.startsWith(`${p}/`) ||
    normalized.startsWith(p)
  );
};

export const sectionsForChangedPath = (
  filePath: string,
  map: GuideMaintenanceMap = loadGuideMaintenanceMap(),
): readonly GuideSection[] =>
  map.sections.filter((section) =>
    section.pathPrefixes.some((prefix) => pathMatchesPrefix(filePath, prefix)),
  );

export const sectionsForChangedPaths = (
  filePaths: readonly string[],
  map: GuideMaintenanceMap = loadGuideMaintenanceMap(),
): readonly GuideSection[] => {
  const byId = new Map<string, GuideSection>();
  for (const filePath of filePaths) {
    for (const section of sectionsForChangedPath(filePath, map)) {
      byId.set(section.id, section);
    }
  }
  return [...byId.values()];
};

export const formatGuideReminder = (
  sections: readonly GuideSection[],
): string => {
  if (sections.length === 0) {
    return "";
  }
  const lines = sections.map(
    (s) =>
      `- **${s.title}** — read/update \`${s.userGuide}\` and \`${s.developerGuide}\``,
  );
  return [
    "## Agent Witch guides (required for this edit)",
    "",
    "You touched code mapped to these chapters. Before finishing:",
    "",
    "1. Read the matching chapters (user + developer).",
    "2. If behavior, UX, or examples changed, update those markdown files in **this PR**.",
    "3. Run `npm run feature-knowledge:index` when any guide or `docs/` file changed.",
    "",
    ...lines,
  ].join("\n");
};

const isGuidePath = (filePath: string): boolean =>
  normalizePath(filePath).includes("docs/guides/");

export const guideMaintenanceStopMessage = (params: {
  readonly changedPaths: readonly string[];
}): string => {
  const codePaths = params.changedPaths.filter(
    (p) =>
      !isGuidePath(p) &&
      (p.startsWith("src/") || p.startsWith("db/") || p === "server.ts"),
  );
  if (codePaths.length === 0) {
    return "";
  }

  const sections = sectionsForChangedPaths(codePaths);
  if (sections.length === 0) {
    return "";
  }

  const guideTouched = params.changedPaths.some(isGuidePath);
  if (guideTouched) {
    return "";
  }

  return [
    "## Guide maintenance",
    "",
    "Code changed under Agent Witch–mapped paths but **no** `docs/guides/**` file appears in this session diff.",
    "",
    "Confirm user/developer guide chapters and examples still match behavior—or update them now.",
    "",
    formatGuideReminder(sections),
  ].join("\n");
};
