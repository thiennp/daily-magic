import { decideProjectSkillPullAction } from "@/features/project-skill-share/internal/core/decideProjectSkillPullAction";
import type { ProjectSkillPullRow } from "@/features/project-skill-share/internal/core/projectSkillPull.type";
import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
import { tombstoneProjectSkill } from "@/features/project-skill-share/internal/infrastructure/history/tombstoneProjectSkill";

/**
 * Local skill absent from a successfully fetched AWC published set → decide
 * remove → History tombstone (lastContentHash from local meta when known).
 * Share never unlinks FS itself.
 */
export const tombstoneOrphanMirroredProjectSkill = async (input: {
  readonly projectId: string;
  readonly skillId: string;
  readonly lastContentHash: string;
  readonly port: ProjectSkillHistoryPort;
  readonly revokedAt?: string;
}): Promise<ProjectSkillPullRow> => {
  const action = decideProjectSkillPullAction({ onPublishedSet: false });
  if (action !== "remove") {
    return { skillId: input.skillId, version: 0, action: "unavailable" };
  }
  await tombstoneProjectSkill({
    port: input.port,
    projectId: input.projectId,
    skillId: input.skillId,
    lastContentHash: input.lastContentHash,
    ...(input.revokedAt !== undefined ? { revokedAt: input.revokedAt } : {}),
  });
  return { skillId: input.skillId, version: 0, action: "removed" };
};
