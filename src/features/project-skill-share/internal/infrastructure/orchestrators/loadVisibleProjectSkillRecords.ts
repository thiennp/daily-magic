import { canViewProjectSkill } from "@/features/project-skill-share/internal/core/canViewProjectSkill";
import { isListProjectSkillsArgs } from "@/features/project-skill-share/internal/core/isListProjectSkillsArgs.guardz";
import type {
  ProjectSkillActorRole,
  ProjectSkillFailure,
  ProjectSkillRecord,
} from "@/features/project-skill-share/internal/core/projectSkill.type";
import type { ListProjectSkillsArgs } from "@/features/project-skill-share/internal/core/projectSkillArgs.type";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";
import { resolveProjectSkillMemberRole } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRole";

export type VisibleProjectSkills =
  | {
      readonly ok: true;
      readonly args: ListProjectSkillsArgs;
      readonly role: ProjectSkillActorRole;
      readonly records: readonly ProjectSkillRecord[];
    }
  | ProjectSkillFailure;

/**
 * Shared by list and search: validate args, check membership, and keep the
 * rows this actor may see (published for everyone, drafts for owner and
 * members, revoked never) in the optional `kind`.
 */
export const loadVisibleProjectSkillRecords = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<VisibleProjectSkills> => {
  if (!isListProjectSkillsArgs(input.args)) {
    return { ok: false, code: "invalid_arguments" };
  }
  const args = input.args;
  const access = await resolveProjectSkillMemberRole({
    projectId: args.projectId,
    actorUserId: input.actorUserId,
  });
  if (!access.ok) {
    return access;
  }
  const rows = await selectProjectSkillRows({
    projectId: args.projectId,
    states: ["draft", "published"],
  });
  const records = rows
    .filter((record) => args.kind === undefined || record.kind === args.kind)
    .filter((record) =>
      canViewProjectSkill({
        role: access.role,
        actorUserId: input.actorUserId,
        state: record.state,
        publisherUserId: record.publisherUserId,
      }),
    );
  return { ok: true, args, role: access.role, records };
};
