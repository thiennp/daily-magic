import type {
  ProjectSkillRehomeRow,
  RehomeProjectSkillsToCloudResult,
} from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";
import { PROJECT_SKILL_HISTORY_STUB_PORT } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryStubPort.constant";
import type { ProjectSkillShareDeps } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareDeps.type";
import { rehomeOneProjectSkillToCloud } from "@/features/project-skill-share/internal/infrastructure/orchestrators/rehomeOneProjectSkillToCloud";
import { resolveProjectSkillMemberRole } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRole";

const PURGE_SAFE = new Set(["verified", "uploaded"]);

/**
 * Orchestrator for History toggle OFF: before local skill mirrors are purged,
 * every published skill body must be in AWC with a matching contentHash.
 * Restores from the mirror when AWC is missing/corrupt; any failure → purgeReady false.
 */
export const rehomeProjectSkillsToCloud = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly deps?: ProjectSkillShareDeps;
}): Promise<RehomeProjectSkillsToCloudResult> => {
  const access = await resolveProjectSkillMemberRole(input);
  if (!access.ok) {
    return { ok: false, purgeReady: false, code: access.code, skills: [] };
  }
  const port = input.deps?.history ?? PROJECT_SKILL_HISTORY_STUB_PORT;
  const records = await selectProjectSkillRows({
    projectId: input.projectId,
    states: ["published"],
  });
  const skills: readonly ProjectSkillRehomeRow[] = await Promise.all(
    records.map(
      (record): ProjectSkillRehomeRow | Promise<ProjectSkillRehomeRow> => {
        const { publishedVersion, contentHash } = record;
        if (publishedVersion === null || contentHash === null) {
          return { skillId: record.skillId, version: 0, action: "missing" };
        }
        return rehomeOneProjectSkillToCloud({
          port,
          record: { ...record, publishedVersion, contentHash },
          actorUserId: input.actorUserId,
        });
      },
    ),
  );
  if (skills.every((row) => PURGE_SAFE.has(row.action))) {
    return { ok: true, purgeReady: true, skills };
  }
  return { ok: false, purgeReady: false, code: "rehome_failed", skills };
};
