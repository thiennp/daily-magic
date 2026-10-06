import { decideProjectSkillPublishAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillPublishAccess";
import { deriveProjectSkillIdFromName } from "@/features/project-skill-share/internal/core/deriveProjectSkillIdFromName";
import { isPublishProjectSkillArgs } from "@/features/project-skill-share/internal/core/isPublishProjectSkillArgs.guardz";
import { isValidProjectSkillId } from "@/features/project-skill-share/internal/core/isValidProjectSkillId";
import type {
  ProjectSkillActorRole,
  ProjectSkillFailure,
  ProjectSkillRecord,
} from "@/features/project-skill-share/internal/core/projectSkill.type";
import type { PublishProjectSkillArgs } from "@/features/project-skill-share/internal/core/projectSkillArgs.type";
import {
  PROJECT_SKILL_DESCRIPTION_MAX_LENGTH,
  PROJECT_SKILL_NAME_MAX_LENGTH,
} from "@/features/project-skill-share/internal/core/projectSkillShare.constant";
import { resolveProjectSkillActorRole } from "@/features/project-skill-share/internal/infrastructure/db/resolveProjectSkillActorRole";
import { selectProjectSkillRow } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRow";

export type PublishProjectSkillTarget = {
  readonly ok: true;
  readonly args: PublishProjectSkillArgs;
  readonly role: ProjectSkillActorRole;
  readonly skillId: string;
  readonly name: string;
  readonly existing: ProjectSkillRecord | null;
};

const fail = (code: ProjectSkillFailure["code"]): ProjectSkillFailure => ({
  ok: false,
  code,
});

/** Parse args, resolve role + skill, apply publish access (project owner only). */
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
  if (role === "none") return fail("forbidden");
  const skillId =
    args.skillId ??
    (args.name !== undefined ? deriveProjectSkillIdFromName(args.name) : null);
  if (skillId === null || !isValidProjectSkillId(skillId)) {
    return fail("invalid_skill_id");
  }
  const existing = await selectProjectSkillRow({
    projectId: args.projectId,
    skillId,
  });
  const allowed = decideProjectSkillPublishAccess({
    role,
    actorUserId: input.actorUserId,
    existingPublisherUserId: existing?.publisherUserId ?? null,
  });
  if (!allowed) return fail("forbidden");
  const name = args.name ?? existing?.name;
  if (name === undefined) return fail("invalid_arguments");
  return { ok: true, args, role, skillId, name, existing };
};
