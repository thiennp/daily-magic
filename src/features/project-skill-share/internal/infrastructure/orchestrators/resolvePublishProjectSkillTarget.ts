import { decideProjectSkillPublishAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillPublishAccess";
import { deriveProjectSkillIdFromName } from "@/features/project-skill-share/internal/core/deriveProjectSkillIdFromName";
import { isPublishProjectSkillArgs } from "@/features/project-skill-share/internal/core/isPublishProjectSkillArgs.guardz";
import { isValidProjectSkillId } from "@/features/project-skill-share/internal/core/isValidProjectSkillId";
import type {
  ProjectSkillActorRole,
  ProjectSkillFailure,
  ProjectSkillKind,
  ProjectSkillRecord,
} from "@/features/project-skill-share/internal/core/projectSkill.type";
import type { PublishProjectSkillArgs } from "@/features/project-skill-share/internal/core/projectSkillArgs.type";
import {
  PROJECT_SKILL_DEFAULT_KIND,
  PROJECT_SKILL_DESCRIPTION_MAX_LENGTH,
  PROJECT_SKILL_NAME_MAX_LENGTH,
} from "@/features/project-skill-share/internal/core/projectSkillShare.constant";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import type { ProjectSkillMemberRights } from "@/features/project-skill-share/internal/core/projectSkillMemberRights.type";
import { resolveProjectSkillMemberRights } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRights";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";

export type PublishProjectSkillTarget = {
  readonly ok: true;
  readonly args: PublishProjectSkillArgs;
  readonly role: ProjectSkillActorRole;
  readonly rights: ProjectSkillMemberRights;
  readonly skillId: string;
  readonly kind: ProjectSkillKind;
  readonly name: string;
  /** Member draft: add a draft version only (row state/meta untouched). */
  readonly draftOnly: boolean;
  readonly existing: ProjectSkillRecord | null;
};

const fail = (
  code: ProjectSkillFailure["code"],
  message?: string,
): ProjectSkillFailure =>
  message === undefined ? { ok: false, code } : { ok: false, code, message };

/** Parse args, resolve role, apply the shared publish ACL, resolve the skill row. */
export const resolvePublishProjectSkillTarget = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<PublishProjectSkillTarget | ProjectSkillFailure> => {
  const args = input.args;
  if (
    !isPublishProjectSkillArgs(args) ||
    (args.name?.length ?? 0) > PROJECT_SKILL_NAME_MAX_LENGTH ||
    (args.description?.length ?? 0) > PROJECT_SKILL_DESCRIPTION_MAX_LENGTH
  ) {
    return fail("invalid_arguments");
  }
  const role = await resolveProjectSkillActorRole({
    projectId: args.projectId,
    actorUserId: input.actorUserId,
  });
  if (role === "project_not_found") return fail("not_found");
  const skillId =
    args.skillId ??
    (args.name !== undefined ? deriveProjectSkillIdFromName(args.name) : null);
  if (skillId === null || !isValidProjectSkillId(skillId)) {
    return fail("invalid_skill_id");
  }
  const rights = await resolveProjectSkillMemberRights({
    projectId: args.projectId,
    role,
  });
  const existing = await selectProjectSkillRow({
    projectId: args.projectId,
    skillId,
  });
  const access = decideProjectSkillPublishAccess({
    role,
    asDraft: args.asDraft === true,
    hasBody: args.body !== undefined,
    isOwnSkill:
      existing === null || existing.publisherUserId === input.actorUserId,
    memberMayPublish: rights.publish,
  });
  if (!access.allowed) return fail("forbidden", access.message);
  const name = args.name ?? existing?.name;
  if (name === undefined) return fail("invalid_arguments");
  const draftOnly = access.draftOnly && existing !== null;
  const kind = draftOnly
    ? (existing?.kind ?? PROJECT_SKILL_DEFAULT_KIND)
    : (args.kind ?? existing?.kind ?? PROJECT_SKILL_DEFAULT_KIND);
  return {
    ok: true,
    args,
    role,
    rights,
    skillId,
    kind,
    name,
    draftOnly,
    existing,
  };
};
