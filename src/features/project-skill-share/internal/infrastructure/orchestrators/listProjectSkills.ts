import {
  filterProjectSkillsByQuery,
  sortProjectSkillsNewestFirst,
} from "@/features/project-skill-share/internal/core/filterProjectSkillsByQuery";
import { canViewProjectSkill } from "@/features/project-skill-share/internal/core/canViewProjectSkill";
import { isListProjectSkillsArgs } from "@/features/project-skill-share/internal/core/isListProjectSkillsArgs.guardz";
import type { ListProjectSkillsResult } from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import {
  PROJECT_SKILL_LIST_DEFAULT_LIMIT,
  PROJECT_SKILL_LIST_MAX_LIMIT,
} from "@/features/project-skill-share/internal/core/projectSkillShare.constant";
import { toProjectSkillView } from "@/features/project-skill-share/internal/core/toProjectSkillView";
import { selectProjectSkillRows } from "@/features/project-skill-share/internal/infrastructure/db/selectProjectSkillRows";
import { resolveProjectSkillMemberRole } from "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRole";

/**
 * Orchestrator: list_project_skills. Published for owner | member | viewer;
 * drafts owner-only. Revoked are not listed. Optional `kind` filter
 * ("skill" | "playbook"); omitted = every kind. With `query` and/or `limit`
 * only the best matches come back (default 5, max 20) plus `total`, so a bot
 * does not read the whole library every task.
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
  const query = input.args.query?.trim();
  const wantsQuery = query !== undefined && query.length > 0;
  if (!wantsQuery && input.args.limit === undefined) {
    return { ok: true, skills };
  }
  const matched = wantsQuery
    ? filterProjectSkillsByQuery(skills, query)
    : sortProjectSkillsNewestFirst(skills);
  const limit = Math.min(
    Math.max(
      Math.floor(input.args.limit ?? PROJECT_SKILL_LIST_DEFAULT_LIMIT),
      1,
    ),
    PROJECT_SKILL_LIST_MAX_LIMIT,
  );
  return { ok: true, skills: matched.slice(0, limit), total: matched.length };
};
