import type { ProjectSkillMirrorStatus } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { isProjectHistoryEnabled } from "@/features/project-skill-share/internal/infrastructure/history/isProjectHistoryEnabled";
import type { ProjectSkillHistoryPort } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryPort.type";
import { writeProjectSkillVersion } from "@/features/project-skill-share/internal/infrastructure/history/writeProjectSkillVersion";

/**
 * History ON: mirror a published version to AWL after AWC stored it.
 * Mirror hash must equal the AWC contentHash. Never fails the publish.
 */
export const mirrorProjectSkillVersionToAwl = async (input: {
  readonly port: ProjectSkillHistoryPort;
  readonly projectId: string;
  readonly skillId: string;
  readonly version: number;
  readonly body: string;
  readonly awcContentHash: string;
}): Promise<ProjectSkillMirrorStatus> => {
  const enabled = await isProjectHistoryEnabled({
    port: input.port,
    projectId: input.projectId,
  });
  if (!enabled) {
    return "not_applicable";
  }
  const written = await writeProjectSkillVersion(input);
  if (!written.ok) {
    return written.code;
  }
  return written.contentHash === input.awcContentHash
    ? "mirrored"
    : "hash_mismatch";
};
