import type { ProjectHistorySkillgenEpisodeRecord } from "./projectHistorySkillgenEpisode.type";
import { PROJECT_HISTORY_SKILLGEN_ACTIVE_STATES } from "./projectHistorySkillgenStateMachine";

/** Most recent active (non-terminal) episode for the project, if any. */
export const findActiveProjectHistorySkillgenEpisode = (
  episodes: readonly ProjectHistorySkillgenEpisodeRecord[],
  projectId: string,
): ProjectHistorySkillgenEpisodeRecord | null => {
  for (let i = episodes.length - 1; i >= 0; i -= 1) {
    const episode = episodes[i]!;
    if (
      episode.projectId === projectId &&
      (PROJECT_HISTORY_SKILLGEN_ACTIVE_STATES as readonly string[]).includes(
        episode.state,
      )
    ) {
      return episode;
    }
  }
  return null;
};
