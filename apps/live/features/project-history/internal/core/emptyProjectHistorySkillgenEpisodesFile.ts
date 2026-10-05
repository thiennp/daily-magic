import type { ProjectHistorySkillgenEpisodesFile } from "./projectHistorySkillgenEpisode.type";

/** Default episodes file when missing or unreadable. */
export const emptyProjectHistorySkillgenEpisodesFile = (
  nowIso = new Date(0).toISOString(),
): ProjectHistorySkillgenEpisodesFile => ({
  episodes: [],
  cursorMessageId: null,
  cursorSavedAtMs: null,
  updatedAt: nowIso,
});
