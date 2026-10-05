import { isValidProjectSkillId } from "@/features/project-skill-share/internal/core/isValidProjectSkillId";
import type {
  ProjectSkillHistoryPort,
  ProjectSkillLocalMirrorRef,
} from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";

/** Adapter over History `listProjectSkillIds`; drops `_`-prefixed / invalid ids. */
export const listProjectSkillIds = async (input: {
  readonly port: ProjectSkillHistoryPort;
  readonly projectId: string;
}): Promise<readonly ProjectSkillLocalMirrorRef[]> => {
  try {
    const refs = await input.port.listProjectSkillIds({
      projectId: input.projectId,
    });
    return refs.filter((ref) => isValidProjectSkillId(ref.skillId));
  } catch {
    return [];
  }
};
