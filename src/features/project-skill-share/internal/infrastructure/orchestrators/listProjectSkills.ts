import { canViewProjectSkill } from "@/features/project-skill-share/internal/core/canViewProjectSkill";
import { isListProjectSkillsArgs } from "@/features/project-skill-share/internal/core/isListProjectSkillsArgs.guardz";
import type { ListProjectSkillsResult } from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import { toProjectSkillView } from "@/features/project-skill-share/internal/core/toProjectSkillView";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";
import { resolveProjectSkillMemberRole } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRole";

/**
 * Orchestrator: list_project_skills. Published for owner | member | viewer;
 * drafts owner-only. Revoked are not listed. Optional `kind` filter
 * ("skill" | "playbook"); omitted = every kind.
 */
export const listProjectSkills = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<ListProjectSkillsResult> => {
  if (!isListProjectSkillsArgs(input.args)) {
    return { ok: false, code: "invalid_arguments" };
  }
  const projectId = input.args.projectId;
  const access = await resolveProjectSkillMemberRole({
    projectId,
    actorUserId: input.actorUserId,
  });
  if (!access.ok) {
    return access;
  }
  const records = await selectProjectSkillRows({
    projectId,
    states: ["draft", "published"],
  });
  const kind = input.args.kind;
  const skills = records
    .filter((record) => kind === undefined || record.kind === kind)
    .filter((record) =>
      canViewProjectSkill({
        role: access.role,
        actorUserId: input.actorUserId,
        state: record.state,
        publisherUserId: record.publisherUserId,
      }),
    )
    .map((record) =>
      toProjectSkillView({
        record,
        role: access.role,
        actorUserId: input.actorUserId,
      }),
    );
  return { ok: true, skills };
};
