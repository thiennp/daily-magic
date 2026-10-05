import type { ProjectHistorySkillgenEpisodeRecord } from "./projectHistorySkillgenEpisode.type";
import {
  isProjectHistoryPitfallFailureState,
  type ProjectHistoryPitfallFailureState,
} from "./projectHistoryPitfallFailureStates.constant";

export type ProjectHistorySkillgenFailureEpisode = {
  readonly episodeId: string;
  readonly state: ProjectHistoryPitfallFailureState;
  readonly reason: string | null;
};

/**
 * Pure: pick terminal failure episodes for Pitfalls v1 (excludes excludeEpisodeId).
 */
export const selectProjectHistorySkillgenFailureEpisodes = (input: {
  readonly episodes: readonly ProjectHistorySkillgenEpisodeRecord[];
  readonly excludeEpisodeId?: string | null;
}): readonly ProjectHistorySkillgenFailureEpisode[] => {
  const out: ProjectHistorySkillgenFailureEpisode[] = [];
  for (const episode of input.episodes) {
    if (
      input.excludeEpisodeId !== undefined &&
      input.excludeEpisodeId !== null &&
      episode.episodeId === input.excludeEpisodeId
    ) {
      continue;
    }
    if (!isProjectHistoryPitfallFailureState(episode.state)) {
      continue;
    }
    out.push({
      episodeId: episode.episodeId,
      state: episode.state,
      reason: episode.reason,
    });
  }
  return out;
};
