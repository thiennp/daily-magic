import { isValidProjectSkillId } from "@/features/project-skill-share/internal/core/isValidProjectSkillId";
import type {
  ProjectSkillHistoryPort,
  ProjectSkillTombstoneInput,
  ProjectSkillTombstoneResult,
} from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";

/**
 * Adapter over History `tombstoneProjectSkill`. Rejects `_`-prefixed ids;
 * never unlinks from Share — History owns the FS edge.
 */
export const tombstoneProjectSkill = async (
  input: ProjectSkillTombstoneInput & {
    readonly port: ProjectSkillHistoryPort;
  },
): Promise<ProjectSkillTombstoneResult> => {
  if (!isValidProjectSkillId(input.skillId)) {
    throw new Error("invalid_project_skill_id");
  }
  return input.port.tombstoneProjectSkill({
    projectId: input.projectId,
    skillId: input.skillId,
    lastContentHash: input.lastContentHash,
    ...(input.revokedAt !== undefined ? { revokedAt: input.revokedAt } : {}),
  });
};
