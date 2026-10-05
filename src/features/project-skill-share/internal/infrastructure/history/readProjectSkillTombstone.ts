import { isValidProjectSkillId } from "@/features/project-skill-share/internal/core/isValidProjectSkillId";
import type {
  ProjectSkillHistoryPort,
  ProjectSkillTombstoneRecord,
} from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";

/** Adapter over History `readProjectSkillTombstone`; invalid id → null. */
export const readProjectSkillTombstone = async (input: {
  readonly port: ProjectSkillHistoryPort;
  readonly projectId: string;
  readonly skillId: string;
}): Promise<ProjectSkillTombstoneRecord | null> => {
  if (!isValidProjectSkillId(input.skillId)) {
    return null;
  }
  try {
    return await input.port.readProjectSkillTombstone({
      projectId: input.projectId,
      skillId: input.skillId,
    });
  } catch {
    return null;
  }
};
