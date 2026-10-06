import fs from "node:fs";
import path from "node:path";

import type {
  ProjectHistorySkillgenDraftsReviewFlag,
  ProjectHistorySkillgenFlagsFile,
} from "./projectHistoryLearnedPitfall.type";
import {
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_FLAGS_FILE_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

const LOG_PREFIX = "[project-history-skillgen]";

const emptyFlags = (): ProjectHistorySkillgenFlagsFile => ({
  historyLearnedPitfalls: null,
  skillgenDraftsReview: null,
  updatedAt: new Date(0).toISOString(),
});

const parseDraftsReview = (
  value: unknown,
): ProjectHistorySkillgenDraftsReviewFlag | null => {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  const row = value as Partial<ProjectHistorySkillgenDraftsReviewFlag>;
  if (
    typeof row.active !== "boolean" ||
    typeof row.openDraftCount !== "number" ||
    typeof row.maxOpenDrafts !== "number" ||
    typeof row.miningPaused !== "boolean" ||
    typeof row.notifiedAt !== "string" ||
    typeof row.summary !== "string"
  ) {
    return null;
  }
  return {
    active: row.active,
    openDraftCount: Math.max(0, row.openDraftCount),
    maxOpenDrafts: Math.max(0, row.maxOpenDrafts),
    miningPaused: row.miningPaused,
    notifiedAt: row.notifiedAt,
    summary: row.summary,
  };
};

/** Reads skillgen/flags.json; missing/corrupt → empty (never throws). */
export const readProjectHistorySkillgenFlags = (
  projectId: string,
): ProjectHistorySkillgenFlagsFile => {
  const filePath = path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_SKILLGEN_DIR_NAME,
    PROJECT_HISTORY_SKILLGEN_FLAGS_FILE_NAME,
  );
  if (!fs.existsSync(filePath)) {
    return emptyFlags();
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (typeof parsed !== "object" || parsed === null) {
      console.error(LOG_PREFIX, "flags_corrupt", projectId);
      return emptyFlags();
    }
    const row = parsed as Partial<ProjectHistorySkillgenFlagsFile>;
    return {
      historyLearnedPitfalls: row.historyLearnedPitfalls ?? null,
      skillgenDraftsReview: parseDraftsReview(row.skillgenDraftsReview),
      updatedAt:
        typeof row.updatedAt === "string"
          ? row.updatedAt
          : emptyFlags().updatedAt,
    };
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "flags_read_failed", projectId, error);
    return emptyFlags();
  }
};
