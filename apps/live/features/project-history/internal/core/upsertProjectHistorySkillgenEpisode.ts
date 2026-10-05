import type { ProjectHistorySkillgenEpisodeRecord } from "./projectHistorySkillgenEpisode.type";

/** Replace or append one episode record by episodeId. */
export const upsertProjectHistorySkillgenEpisode = (
  episodes: readonly ProjectHistorySkillgenEpisodeRecord[],
  episode: ProjectHistorySkillgenEpisodeRecord,
): readonly ProjectHistorySkillgenEpisodeRecord[] => {
  const idx = episodes.findIndex((row) => row.episodeId === episode.episodeId);
  if (idx < 0) {
    return [...episodes, episode];
  }
  return episodes.map((row, i) => (i === idx ? episode : row));
};
