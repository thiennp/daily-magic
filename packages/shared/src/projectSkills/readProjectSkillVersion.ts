import { computeProjectSkillContentHash } from "./computeProjectSkillContentHash";
import type {
  ProjectSkillHistoryPort,
  ProjectSkillVersionReadInput,
  ProjectSkillVersionReadResult,
} from "./projectSkillHistoryPort.type";

/** Adapter over History `readProjectSkillVersion`. Hash mismatch on read = missing. */
export const readProjectSkillVersion = async (
  input: ProjectSkillVersionReadInput & {
    readonly port: ProjectSkillHistoryPort;
  },
): Promise<ProjectSkillVersionReadResult | null> => {
  try {
    const read = await input.port.readProjectSkillVersion({
      projectId: input.projectId,
      skillId: input.skillId,
      version: input.version,
    });
    if (read === null) {
      return null;
    }
    return computeProjectSkillContentHash(read.body) === read.contentHash
      ? read
      : null;
  } catch {
    return null;
  }
};
