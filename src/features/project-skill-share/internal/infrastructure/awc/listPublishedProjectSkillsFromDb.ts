import type { ProjectSkillPublishedMeta } from "@/features/project-skill-share/internal/core/projectSkillPull.type";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";

/** Neon-backed list of published skills (meta + contentHash only). */
export const listPublishedProjectSkillsFromDb = async (
  projectId: string,
): Promise<readonly ProjectSkillPublishedMeta[]> => {
  const records = await selectProjectSkillRows({
    projectId,
    states: ["published"],
  });
  return records.flatMap((record) => {
    if (record.publishedVersion === null || record.contentHash === null) {
      return [];
    }
    return [
      {
        skillId: record.skillId,
        publishedVersion: record.publishedVersion,
        contentHash: record.contentHash,
        skillRowId: record.rowId,
      },
    ];
  });
};
