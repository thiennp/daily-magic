import fs from "node:fs";
import path from "node:path";

import type { ProjectHistorySkillgenDraftFingerprint } from "./mergeOrSkipProjectHistorySkillgenDraft";
import {
  PROJECT_HISTORY_SKILL_META_FILE_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

/**
 * Fingerprints mirrored published skills (excludes `_`-prefixed dirs).
 */
export const listProjectHistorySkillgenPublishedFingerprints = (
  projectId: string,
): readonly ProjectHistorySkillgenDraftFingerprint[] => {
  const skillsDir = path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_SKILLS_DIR_NAME,
  );
  if (!fs.existsSync(skillsDir)) {
    return [];
  }
  const out: ProjectHistorySkillgenDraftFingerprint[] = [];
  for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) {
      continue;
    }
    const metaPath = path.join(
      skillsDir,
      entry.name,
      PROJECT_HISTORY_SKILL_META_FILE_NAME,
    );
    if (!fs.existsSync(metaPath)) {
      continue;
    }
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as {
        contentHash?: unknown;
        skillId?: unknown;
      };
      if (typeof meta.contentHash !== "string") {
        continue;
      }
      out.push({
        id: entry.name,
        contentHash: meta.contentHash,
        name: typeof meta.skillId === "string" ? meta.skillId : entry.name,
        stepLines: [],
      });
    } catch {
      // skip
    }
  }
  return out;
};
