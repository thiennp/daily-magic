import fs from "node:fs";
import path from "node:path";

import {
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

const isDraftId = (id: string): boolean =>
  id.length > 0 &&
  !id.startsWith(".") &&
  !id.includes("/") &&
  !id.includes("\\") &&
  !id.includes("..");

/** Delete `skills/_drafts/<draftId>/` recursively. */
export const discardProjectHistorySkillgenDraftForReview = (input: {
  readonly projectId: string;
  readonly draftId: string;
}): void => {
  if (!isDraftId(input.draftId)) {
    throw new Error("invalid_draft_id");
  }
  const draftDir = path.join(
    resolveProjectDataDir(input.projectId),
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
    input.draftId,
  );
  if (!fs.existsSync(draftDir)) {
    throw new Error("draft_not_found");
  }
  fs.rmSync(draftDir, { recursive: true, force: false });
};
