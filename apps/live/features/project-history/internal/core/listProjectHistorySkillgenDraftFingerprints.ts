import fs from "node:fs";
import path from "node:path";

import type { ProjectHistorySkillgenDraftFingerprint } from "./mergeOrSkipProjectHistorySkillgenDraft";
import {
  PROJECT_HISTORY_SKILL_DRAFT_META_FILE_NAME,
  PROJECT_HISTORY_SKILL_DRAFT_SKILL_FILE_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";
import { extractProjectHistorySkillgenStepLines } from "./validateProjectHistorySkillgenDraft";

/**
 * Fingerprints open drafts under `skills/_drafts/` for rules-based dedup.
 */
export const listProjectHistorySkillgenDraftFingerprints = (
  projectId: string,
): readonly ProjectHistorySkillgenDraftFingerprint[] => {
  const draftsDir = path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
  );
  if (!fs.existsSync(draftsDir)) {
    return [];
  }
  const out: ProjectHistorySkillgenDraftFingerprint[] = [];
  for (const entry of fs.readdirSync(draftsDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) {
      continue;
    }
    const skillPath = path.join(
      draftsDir,
      entry.name,
      PROJECT_HISTORY_SKILL_DRAFT_SKILL_FILE_NAME,
    );
    const metaPath = path.join(
      draftsDir,
      entry.name,
      PROJECT_HISTORY_SKILL_DRAFT_META_FILE_NAME,
    );
    if (!fs.existsSync(skillPath)) {
      continue;
    }
    try {
      const body = fs.readFileSync(skillPath, "utf8");
      let contentHash = "";
      let name = entry.name;
      if (fs.existsSync(metaPath)) {
        const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as {
          contentHash?: unknown;
          name?: unknown;
        };
        if (typeof meta.contentHash === "string") {
          contentHash = meta.contentHash;
        }
        if (typeof meta.name === "string" && meta.name.length > 0) {
          name = meta.name;
        }
      }
      if (contentHash.length === 0) {
        continue;
      }
      out.push({
        id: entry.name,
        contentHash,
        name,
        stepLines: extractProjectHistorySkillgenStepLines(body),
      });
    } catch {
      // skip corrupt draft
    }
  }
  return out;
};
