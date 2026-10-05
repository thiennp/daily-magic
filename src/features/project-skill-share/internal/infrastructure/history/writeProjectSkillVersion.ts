import { computeProjectSkillContentHash } from "@/features/project-skill-share/internal/core/computeProjectSkillContentHash";
import { isValidProjectSkillId } from "@/features/project-skill-share/internal/core/isValidProjectSkillId";
import type {
  ProjectSkillHistoryPort,
  ProjectSkillVersionWriteInput,
} from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";

export type WriteProjectSkillVersionOutcome =
  | { readonly ok: true; readonly path: string; readonly contentHash: string }
  | { readonly ok: false; readonly code: "unavailable" | "hash_mismatch" };

/**
 * Adapter over History `writeProjectSkillVersion`. The hash History reports
 * must equal ours for the exact bytes, else the mirror is not trusted.
 */
export const writeProjectSkillVersion = async (
  input: ProjectSkillVersionWriteInput & {
    readonly port: ProjectSkillHistoryPort;
  },
): Promise<WriteProjectSkillVersionOutcome> => {
  if (!isValidProjectSkillId(input.skillId)) {
    return { ok: false, code: "unavailable" };
  }
  const expected = computeProjectSkillContentHash(input.body);
  try {
    const written = await input.port.writeProjectSkillVersion({
      projectId: input.projectId,
      skillId: input.skillId,
      version: input.version,
      body: input.body,
    });
    return written.contentHash === expected
      ? { ok: true, path: written.path, contentHash: written.contentHash }
      : { ok: false, code: "hash_mismatch" };
  } catch {
    return { ok: false, code: "unavailable" };
  }
};
