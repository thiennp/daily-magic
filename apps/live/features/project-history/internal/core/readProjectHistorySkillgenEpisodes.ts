import fs from "node:fs";
import path from "node:path";

import { emptyProjectHistorySkillgenEpisodesFile } from "./emptyProjectHistorySkillgenEpisodesFile";
import type { ProjectHistorySkillgenEpisodesFile } from "./projectHistorySkillgenEpisode.type";
import type { ProjectHistorySkillgenEpisodeRecord } from "./projectHistorySkillgenEpisode.type";
import type { ProjectHistorySkillgenState } from "./projectHistorySkillgenStateMachine";
import { PROJECT_HISTORY_SKILLGEN_STATES } from "./projectHistorySkillgenStateMachine";
import {
  PROJECT_HISTORY_SKILLGEN_DIR_NAME,
  PROJECT_HISTORY_SKILLGEN_EPISODES_FILE_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

const LOG_PREFIX = "[project-history-skillgen]";

const isState = (value: unknown): value is ProjectHistorySkillgenState =>
  typeof value === "string" &&
  (PROJECT_HISTORY_SKILLGEN_STATES as readonly string[]).includes(value);

const isEpisode = (value: unknown): value is ProjectHistorySkillgenEpisodeRecord => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const row = value as Record<string, unknown>;
  return (
    typeof row.episodeId === "string" &&
    typeof row.projectId === "string" &&
    isState(row.state) &&
    Array.isArray(row.messageIds) &&
    typeof row.startedAtMs === "number" &&
    typeof row.lastMessageAtMs === "number"
  );
};

const parseEpisodesFile = (raw: unknown): ProjectHistorySkillgenEpisodesFile | null => {
  if (typeof raw !== "object" || raw === null) {
    return null;
  }
  const row = raw as Record<string, unknown>;
  if (!Array.isArray(row.episodes)) {
    return null;
  }
  const episodes = row.episodes.filter(isEpisode);
  if (episodes.length !== row.episodes.length) {
    return null;
  }
  if (typeof row.updatedAt !== "string") {
    return null;
  }
  const cursorMessageId =
    row.cursorMessageId === null || typeof row.cursorMessageId === "string"
      ? (row.cursorMessageId as string | null)
      : null;
  const cursorSavedAtMs =
    row.cursorSavedAtMs === null || typeof row.cursorSavedAtMs === "number"
      ? (row.cursorSavedAtMs as number | null)
      : null;
  return {
    episodes,
    cursorMessageId,
    cursorSavedAtMs,
    updatedAt: row.updatedAt,
  };
};

/**
 * Reads `skillgen/episodes.json`. Missing or corrupt → empty default (logged, never thrown).
 */
export const readProjectHistorySkillgenEpisodes = (
  projectId: string,
): ProjectHistorySkillgenEpisodesFile => {
  const filePath = path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_SKILLGEN_DIR_NAME,
    PROJECT_HISTORY_SKILLGEN_EPISODES_FILE_NAME,
  );
  if (!fs.existsSync(filePath)) {
    return emptyProjectHistorySkillgenEpisodesFile();
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const file = parseEpisodesFile(parsed);
    if (file === null) {
      console.error(LOG_PREFIX, "episodes_corrupt", projectId);
      return emptyProjectHistorySkillgenEpisodesFile();
    }
    return file;
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "episodes_read_failed", projectId, error);
    return emptyProjectHistorySkillgenEpisodesFile();
  }
};
