import fs from "node:fs";
import path from "node:path";

import type { ProjectHistorySkillgenFlagsFile } from "./projectHistoryLearnedPitfall.type";
import {
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_FLAGS_FILE_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

const LOG_PREFIX = "[project-history-skillgen]";

const emptyFlags = (): ProjectHistorySkillgenFlagsFile => ({
  historyLearnedPitfalls: null,
  updatedAt: new Date(0).toISOString(),
});

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
    return {
      historyLearnedPitfalls:
        (parsed as ProjectHistorySkillgenFlagsFile).historyLearnedPitfalls ??
        null,
      updatedAt:
        typeof (parsed as { updatedAt?: unknown }).updatedAt === "string"
          ? (parsed as { updatedAt: string }).updatedAt
          : emptyFlags().updatedAt,
    };
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "flags_read_failed", projectId, error);
    return emptyFlags();
  }
};
