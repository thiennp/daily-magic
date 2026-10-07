import fs from "node:fs";
import path from "node:path";

import { computeProjectSkillContentHash } from "@agent-witch/shared/projectSkills";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import type { ProjectHistorySkillgenDraftReviewItem } from "./projectHistorySkillgenDraftReview.type";
import {
  PROJECT_HISTORY_SKILL_DRAFT_META_FILE_NAME,
  PROJECT_HISTORY_SKILL_DRAFT_SKILL_FILE_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";
import { readProjectHistorySkillgenDraftForReview } from "./listProjectHistorySkillgenDraftsForReview";

const isDraftId = (id: string): boolean =>
  id.length > 0 &&
  !id.startsWith(".") &&
  !id.includes("/") &&
  !id.includes("\\") &&
  !id.includes("..");

export type SaveProjectHistorySkillgenDraftForReviewInput = {
  readonly projectId: string;
  readonly draftId: string;
  readonly title: string;
  readonly body: string;
  readonly tags?: readonly string[];
};

/** Persist title/body/tags on an existing `skills/_drafts/<id>/` draft. */
export const saveProjectHistorySkillgenDraftForReview = (
  input: SaveProjectHistorySkillgenDraftForReviewInput,
): ProjectHistorySkillgenDraftReviewItem => {
  if (!isDraftId(input.draftId)) {
    throw new Error("invalid_draft_id");
  }
  const existing = readProjectHistorySkillgenDraftForReview(
    input.projectId,
    input.draftId,
  );
  if (existing === null) {
    throw new Error("draft_not_found");
  }
  const draftDir = path.join(
    resolveProjectDataDir(input.projectId),
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
    input.draftId,
  );
  const skillPath = path.join(draftDir, PROJECT_HISTORY_SKILL_DRAFT_SKILL_FILE_NAME);
  const metaPath = path.join(draftDir, PROJECT_HISTORY_SKILL_DRAFT_META_FILE_NAME);
  const title = input.title.trim() || existing.title;
  const body = input.body;
  const tags = (input.tags ?? existing.tags)
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0);
  const contentHash = computeProjectSkillContentHash(body);
  const updatedAt = new Date().toISOString();

  let episodeId = "";
  let sourceMessageIds: readonly string[] = [];
  let description = existing.description;
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as Record<
        string,
        unknown
      >;
      if (typeof meta.episodeId === "string") episodeId = meta.episodeId;
      if (Array.isArray(meta.sourceMessageIds)) {
        sourceMessageIds = meta.sourceMessageIds.filter(
          (x): x is string => typeof x === "string",
        );
      }
      if (typeof meta.description === "string") description = meta.description;
    } catch {
      // rewrite below
    }
  }

  atomicWriteFile0600(skillPath, body);
  atomicWriteFile0600(
    metaPath,
    `${JSON.stringify({
      draftId: input.draftId,
      episodeId,
      name: title,
      description,
      sourceMessageIds,
      contentHash,
      status: "draft",
      tags,
      source: existing.source,
      updatedAt,
    })}\n`,
  );

  return {
    id: input.draftId,
    title,
    body,
    description,
    tags,
    source: existing.source,
    updatedAt,
    pathLabel: `skills/_drafts/${input.draftId}`,
  };
};
