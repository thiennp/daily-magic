import type { ListProjectSkillsResult } from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import { toProjectSkillView } from "@/features/project-skill-share/internal/core/toProjectSkillView";
import { loadVisibleProjectSkillRecords } from "@/features/project-skill-share/internal/infrastructure/orchestrators/loadVisibleProjectSkillRecords";

/**
 * Orchestrator: the whole library as meta views (UI and internal callers).
 * Published for owner | member | viewer; drafts owner and members; revoked
 * never. Optional `kind` filter ("skill" | "playbook"). Bots search with
 * `query` through searchProjectSkills instead.
 */
export const listProjectSkills = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<ListProjectSkillsResult> => {
  const loaded = await loadVisibleProjectSkillRecords(input);
  if (!loaded.ok) {
    return loaded;
  }
  return {
    ok: true,
    skills: loaded.records.map((record) =>
      toProjectSkillView({
        record,
        role: loaded.role,
        actorUserId: input.actorUserId,
      }),
    ),
  };
};
