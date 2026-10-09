import {
  filterProjectSkillsByQuery,
  sortProjectSkillsNewestFirst,
} from "@/features/project-skill-share/internal/core/filterProjectSkillsByQuery";
import type { SearchProjectSkillsResult } from "@/features/project-skill-share/internal/core/projectSkillResults.type";
import {
  PROJECT_SKILL_LIST_DEFAULT_LIMIT,
  PROJECT_SKILL_LIST_MAX_LIMIT,
} from "@/features/project-skill-share/internal/core/projectSkillShare.constant";
import { toProjectSkillMatch } from "@/features/project-skill-share/internal/core/toProjectSkillMatch";
import { loadVisibleProjectSkillRecords } from "@/features/project-skill-share/internal/infrastructure/orchestrators/loadVisibleProjectSkillRecords";

/**
 * Orchestrator: best compact matches for a short task description (`query`),
 * or the newest rows when only `limit` is given. Default 3 rows, max 10, plus
 * `total` before the limit, so a bot never reads the whole library.
 */
export const searchProjectSkills = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<SearchProjectSkillsResult> => {
  const loaded = await loadVisibleProjectSkillRecords(input);
  if (!loaded.ok) {
    return loaded;
  }
  const query = loaded.args.query?.trim();
  const matched =
    query !== undefined && query.length > 0
      ? filterProjectSkillsByQuery(loaded.records, query)
      : sortProjectSkillsNewestFirst(loaded.records);
  const limit = Math.min(
    Math.max(
      Math.floor(loaded.args.limit ?? PROJECT_SKILL_LIST_DEFAULT_LIMIT),
      1,
    ),
    PROJECT_SKILL_LIST_MAX_LIMIT,
  );
  return {
    ok: true,
    matches: matched.slice(0, limit).map(toProjectSkillMatch),
    total: matched.length,
  };
};
