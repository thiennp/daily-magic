import fs from "node:fs";
import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import { discardProjectHistorySkillgenDraftForReview } from "./discardProjectHistorySkillgenDraftForReview";
import { readProjectHistorySkillgenDraftForReview } from "./listProjectHistorySkillgenDraftsForReview";
import {
  PROJECT_HISTORY_SKILL_META_FILE_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";
import { writeProjectSkillVersion } from "./writeProjectSkillVersion";

const isUsableSkillId = (skillId: string): boolean =>
  skillId.length > 0 &&
  !skillId.startsWith("_") &&
  !skillId.includes("/") &&
  !skillId.includes("\\") &&
  !skillId.includes("..");

const nextVersion = (projectId: string, skillId: string): number => {
  const skillDir = path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    skillId,
  );
  const metaPath = path.join(skillDir, PROJECT_HISTORY_SKILL_META_FILE_NAME);
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as {
        version?: unknown;
      };
      if (typeof meta.version === "number" && Number.isInteger(meta.version)) {
        return meta.version + 1;
      }
    } catch {
      // fall through
    }
  }
  if (!fs.existsSync(skillDir)) return 1;
  let max = 0;
  for (const name of fs.readdirSync(skillDir)) {
    const m = /^v(\d+)\.md$/.exec(name);
    if (m) max = Math.max(max, Number.parseInt(m[1] ?? "0", 10));
  }
  return max + 1;
};

/**
 * Publish draft → `skills/<skillId>/vNNNN.md`, then discard the draft dir.
 * skillId defaults to draftId when usable (not `_`-prefixed).
 */
export const publishProjectHistorySkillgenDraftForReview = (input: {
  readonly projectId: string;
  readonly draftId: string;
  readonly title?: string;
  readonly body?: string;
}): {
  readonly skillId: string;
  readonly version: number;
  readonly path: string;
} => {
  const draft = readProjectHistorySkillgenDraftForReview(
    input.projectId,
    input.draftId,
  );
  if (draft === null) {
    throw new Error("draft_not_found");
  }
  const body = input.body ?? draft.body;
  const title = (input.title ?? draft.title).trim() || draft.title;
  if (!body.trim() || !title.trim()) {
    throw new Error("draft_incomplete");
  }
  const skillId = isUsableSkillId(input.draftId)
    ? input.draftId
    : `skill-${input.draftId}`.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 64);
  if (!isUsableSkillId(skillId)) {
    throw new Error("invalid_project_skill_id");
  }
  const version = nextVersion(input.projectId, skillId);
  const written = writeProjectSkillVersion({
    projectId: input.projectId,
    skillId,
    version,
    body,
  });
  try {
    const metaPath = path.join(
      resolveProjectDataDir(input.projectId),
      PROJECT_HISTORY_SKILLS_DIR_NAME,
      skillId,
      PROJECT_HISTORY_SKILL_META_FILE_NAME,
    );
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as Record<
      string,
      unknown
    >;
    atomicWriteFile0600(
      metaPath,
      `${JSON.stringify({
        ...meta,
        name: title,
        version: meta.version ?? version,
        contentHash: meta.contentHash ?? written.contentHash,
        updatedAt: new Date().toISOString(),
      })}\n`,
    );
  } catch {
    // version file already written
  }
  discardProjectHistorySkillgenDraftForReview({
    projectId: input.projectId,
    draftId: input.draftId,
  });
  return { skillId, version, path: written.path };
};
