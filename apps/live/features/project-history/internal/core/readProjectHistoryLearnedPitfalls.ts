import fs from "node:fs";
import path from "node:path";

import type { ProjectHistoryLearnedPitfallsFile } from "./projectHistoryLearnedPitfall.type";
import {
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_LEARNED_PITFALLS_FILE_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

const LOG_PREFIX = "[project-history-skillgen]";

const emptyFile = (): ProjectHistoryLearnedPitfallsFile => ({
  items: [],
  updatedAt: new Date(0).toISOString(),
});

/** Reads skillgen/learned-pitfalls.json; missing/corrupt → empty (never throws). */
export const readProjectHistoryLearnedPitfalls = (
  projectId: string,
): ProjectHistoryLearnedPitfallsFile => {
  const filePath = path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_SKILLGEN_DIR_NAME,
    PROJECT_HISTORY_SKILLGEN_LEARNED_PITFALLS_FILE_NAME,
  );
  if (!fs.existsSync(filePath)) {
    return emptyFile();
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !Array.isArray((parsed as { items?: unknown }).items)
    ) {
      console.error(LOG_PREFIX, "learned_pitfalls_corrupt", projectId);
      return emptyFile();
    }
    return {
      items: (parsed as ProjectHistoryLearnedPitfallsFile).items,
      updatedAt:
        typeof (parsed as { updatedAt?: unknown }).updatedAt === "string"
          ? (parsed as { updatedAt: string }).updatedAt
          : emptyFile().updatedAt,
    };
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "learned_pitfalls_read_failed", projectId, error);
    return emptyFile();
  }
};
