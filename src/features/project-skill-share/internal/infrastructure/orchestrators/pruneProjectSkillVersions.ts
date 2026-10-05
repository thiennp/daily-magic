import type { ProjectSkillRecord } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { PROJECT_SKILL_MAX_VERSIONS } from "@/features/project-skill-share/internal/core/projectSkillShare.constant";
import { selectProjectSkillVersionsToPrune } from "@/features/project-skill-share/internal/core/selectProjectSkillVersionsToPrune";
import { deleteProjectSkillVersionRows } from "@/features/project-skill-share/internal/infrastructure/db/deleteProjectSkillVersionRows";
import { selectProjectSkillVersionNumbers } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionNumbers";

/** Keep ≤ 20 versions: drop oldest on overflow, never the live published one. */
export const pruneProjectSkillVersions = async (
  record: ProjectSkillRecord,
): Promise<readonly number[]> => {
  const versions = await selectProjectSkillVersionNumbers(record.rowId);
  const pruned = selectProjectSkillVersionsToPrune({
    versions,
    keep: PROJECT_SKILL_MAX_VERSIONS,
    protectedVersion: record.publishedVersion,
  });
  await deleteProjectSkillVersionRows({
    skillRowId: record.rowId,
    versions: pruned,
  });
  return pruned;
};
