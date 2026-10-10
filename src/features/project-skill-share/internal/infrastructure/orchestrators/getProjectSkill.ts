import { canViewProjectSkill } from "@/features/project-skill-share/internal/core/canViewProjectSkill";
import { isProjectSkillRefArgs } from "@/features/project-skill-share/internal/core/isProjectSkillRefArgs.guardz";
import type { GetProjectSkillResult } from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import { resolveProjectSkillReadVersion } from "@/features/project-skill-share/internal/core/resolveProjectSkillReadVersion";
import { toProjectSkillView } from "@/features/project-skill-share/internal/core/toProjectSkillView";
import { chooseSkillVersionToServe } from "@/lib/knowledge/skillUses/chooseSkillVersionToServe";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";
import { selectProjectSkillVersionRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillVersionRow";
import { resolveProjectSkillMemberRole } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRole";

/**
 * Orchestrator: get_project_skill. Body always comes from AWC (store of record).
 * Owner | member | viewer: published (or older non-draft) versions only;
 * drafts for publisher/owner; hidden skills = not_found.
 */
export const getProjectSkill = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<GetProjectSkillResult> => {
  if (!isProjectSkillRefArgs(input.args)) {
    return { ok: false, code: "invalid_arguments" };
  }
  const { projectId, skillId, version } = input.args;
  const access = await resolveProjectSkillMemberRole({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!access.ok) return access;
  const record = await selectProjectSkillRow({ projectId, skillId });
  const viewer = {
    role: access.role,
    actorUserId: input.actorUserId,
    rights: access.rights,
  };
  if (
    record === null ||
    !canViewProjectSkill({
      role: viewer.role,
      actorUserId: viewer.actorUserId,
      ...record,
    })
  ) {
    return { ok: false, code: "not_found" };
  }
  /** Owner + active members read drafts (viewers: published only). */
  const canManage = access.role === "owner" || access.role === "member";
  // While two versions are compared, an assistant gets one of them in turn.
  const comparedVersion =
    version === undefined && canManage
      ? await chooseSkillVersionToServe({
          projectId,
          skillId,
          actorUserId: input.actorUserId,
        })
      : null;
  const readVersion = resolveProjectSkillReadVersion({
    requestedVersion: version ?? comparedVersion ?? undefined,
    publishedVersion: record.publishedVersion,
    latestVersion: record.latestVersion,
    canManage,
  });
  const row =
    readVersion === null
      ? null
      : await selectProjectSkillVersionRow({
          skillRowId: record.rowId,
          version: readVersion,
        });
  if (row === null || (row.isDraft && !canManage)) {
    return { ok: false, code: "not_found" };
  }
  return {
    ok: true,
    skill: {
      ...toProjectSkillView({ ...viewer, record }),
      version: row.version,
      body: row.body,
      versionContentHash: row.contentHash,
      byteSize: row.byteSize,
      isDraftVersion: row.isDraft,
    },
  };
};
