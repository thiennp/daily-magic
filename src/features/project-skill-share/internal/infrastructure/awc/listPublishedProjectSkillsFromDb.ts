import type { ProjectSkillPublishedMeta } from "@/features/project-skill-share/internal/core/projectSkillPull.type";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";

/**
 * Neon-backed list of published skills (meta + contentHash only).
 * Throws on DB error, non-array rows, or a published row missing
 * version/hash — never drops/coerces to `[]` (that would tombstone).
 */
export const listPublishedProjectSkillsFromDb = async (
  projectId: string,
): Promise<readonly ProjectSkillPublishedMeta[]> => {
  const records = await selectProjectSkillRows({
    projectId,
    states: ["published"],
    strict: true,
  });
  return records.map((record) => {
    if (record.publishedVersion === null || record.contentHash === null) {
      throw new Error(
        `project-skill listPublished: published row ${record.rowId} missing version/contentHash`,
      );
    }
    return {
      skillId: record.skillId,
      publishedVersion: record.publishedVersion,
      contentHash: record.contentHash,
      skillRowId: record.rowId,
    };
  });
};
