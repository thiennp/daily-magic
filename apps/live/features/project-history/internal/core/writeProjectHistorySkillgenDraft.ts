import fs from "node:fs";
import path from "node:path";

import { computeProjectSkillContentHash } from "@agent-witch/shared/projectSkills";

import { atomicWriteFile0600, ensureDir0700 } from "./atomicWriteFile0600";
import {
  PROJECT_HISTORY_SKILL_DRAFT_META_FILE_NAME,
  PROJECT_HISTORY_SKILL_DRAFT_SKILL_FILE_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

export type WriteProjectHistorySkillgenDraftInput = {
  readonly projectId: string;
  readonly draftId: string;
  readonly skillMarkdown: string;
  readonly episodeId: string;
  readonly sourceMessageIds: readonly string[];
  readonly name: string;
  readonly description: string;
};

export type WriteProjectHistorySkillgenDraftResult = {
  readonly draftDir: string;
  readonly skillPath: string;
  readonly metaPath: string;
  readonly contentHash: string;
};

const isUsableDraftId = (draftId: string): boolean =>
  draftId.length > 0 &&
  !draftId.includes("/") &&
  !draftId.includes("\\") &&
  !draftId.includes("..");

/**
 * Step 12 — save draft under `skills/_drafts/<draftId>/` with 0700/0600
 * and atomic writes via `atomicWriteFile0600`.
 */
export const writeProjectHistorySkillgenDraft = (
  input: WriteProjectHistorySkillgenDraftInput,
): WriteProjectHistorySkillgenDraftResult => {
  if (!isUsableDraftId(input.draftId)) {
    throw new Error("invalid_draft_id");
  }
  const projectDataDir = ensureProjectDataTree(input.projectId);
  const draftDir = path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
    input.draftId,
  );
  ensureDir0700(draftDir);
  const skillPath = path.join(draftDir, PROJECT_HISTORY_SKILL_DRAFT_SKILL_FILE_NAME);
  const metaPath = path.join(draftDir, PROJECT_HISTORY_SKILL_DRAFT_META_FILE_NAME);
  const contentHash = computeProjectSkillContentHash(input.skillMarkdown);

  atomicWriteFile0600(skillPath, input.skillMarkdown);
  atomicWriteFile0600(
    metaPath,
    `${JSON.stringify({
      draftId: input.draftId,
      episodeId: input.episodeId,
      name: input.name,
      description: input.description,
      sourceMessageIds: input.sourceMessageIds,
      contentHash,
      status: "draft",
      updatedAt: new Date().toISOString(),
    })}\n`,
  );

  return { draftDir, skillPath, metaPath, contentHash };
};

/** Count open draft directories under `_drafts/` (excludes dotfiles). */
export const countProjectHistorySkillgenOpenDrafts = (
  projectId: string,
): number => {
  const projectDataDir = ensureProjectDataTree(projectId);
  const draftsDir = path.join(
    projectDataDir,
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
  );
  if (!fs.existsSync(draftsDir)) {
    return 0;
  }
  return fs
    .readdirSync(draftsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .length;
};
