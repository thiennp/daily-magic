import type { PublishProjectSkillResult } from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import { toProjectSkillView } from "@/features/project-skill-share/internal/core/toProjectSkillView";
import { mirrorProjectSkillVersionToAwl } from "@/features/project-skill-share/internal/infrastructure/history/mirrorProjectSkillVersionToAwl";
import { PROJECT_SKILL_HISTORY_STUB_PORT } from "@/features/project-skill-share/internal/infrastructure/history/projectSkillHistoryStubPort.constant";
import { promoteLatestProjectSkillDraft } from "@/features/project-skill-share/internal/infrastructure/orchestrators/promoteLatestProjectSkillDraft";
import type { ProjectSkillShareDeps } from "@/features/project-skill-share/internal/infrastructure/orchestrators/projectSkillShareDeps.type";
import { pruneProjectSkillVersions } from "@/features/project-skill-share/internal/infrastructure/orchestrators/pruneProjectSkillVersions";
import { resolvePublishProjectSkillTarget } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolvePublishProjectSkillTarget";
import { storeProjectSkillVersion } from "@/features/project-skill-share/internal/infrastructure/orchestrators/storeProjectSkillVersion";

/**
 * Orchestrator: publish_project_skill (owner; members for their own skills).
 * resolve target → store in AWC (or promote draft) → prune to 20 → mirror to AWL when History ON.
 */
export const publishProjectSkill = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
  readonly deps?: ProjectSkillShareDeps;
}): Promise<PublishProjectSkillResult> => {
  const target = await resolvePublishProjectSkillTarget(input);
  if (!target.ok) {
    return target;
  }
  const body = target.args.body;
  const stored =
    body === undefined
      ? await promoteLatestProjectSkillDraft({ target })
      : await storeProjectSkillVersion({
          target,
          body,
          actorUserId: input.actorUserId,
        });
  if (!stored.ok) {
    return stored;
  }
  const prunedVersions = await pruneProjectSkillVersions(stored.record);
  const isPublished =
    stored.record.state === "published" &&
    stored.record.publishedVersion === stored.version;
  const mirror = isPublished
    ? await mirrorProjectSkillVersionToAwl({
        port: input.deps?.history ?? PROJECT_SKILL_HISTORY_STUB_PORT,
        projectId: stored.record.projectId,
        skillId: stored.record.skillId,
        version: stored.version,
        body: stored.body,
        awcContentHash: stored.contentHash,
      })
    : "not_applicable";
  return {
    ok: true,
    skill: toProjectSkillView({
      record: stored.record,
      role: target.role,
      actorUserId: input.actorUserId,
    }),
    version: stored.version,
    contentHash: stored.contentHash,
    prunedVersions,
    mirror,
  };
};
