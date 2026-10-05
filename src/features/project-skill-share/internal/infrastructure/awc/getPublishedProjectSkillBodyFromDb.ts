import type { ProjectSkillPublishedBody } from "@/features/project-skill-share/internal/core/projectSkillPull.type";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { selectProjectSkillVersionRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionRow";

/** Neon-backed published body + contentHash for one skill version. */
export const getPublishedProjectSkillBodyFromDb = async (input: {
  readonly projectId: string;
  readonly skillId: string;
  readonly version: number;
  readonly skillRowId?: string;
}): Promise<ProjectSkillPublishedBody | null> => {
  const skillRowId =
    input.skillRowId ??
    (
      await selectProjectSkillRow({
        projectId: input.projectId,
        skillId: input.skillId,
      })
    )?.rowId;
  if (skillRowId === undefined) {
    return null;
  }
  const row = await selectProjectSkillVersionRow({
    skillRowId,
    version: input.version,
  });
  if (row === null || row.isDraft) {
    return null;
  }
  return { body: row.body, contentHash: row.contentHash };
};
