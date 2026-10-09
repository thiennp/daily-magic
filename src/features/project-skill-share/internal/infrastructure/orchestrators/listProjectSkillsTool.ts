import { listProjectSkills } from "@/features/project-skill-share/internal/infrastructure/orchestrators/listProjectSkills";
import { searchProjectSkills } from "@/features/project-skill-share/internal/infrastructure/orchestrators/searchProjectSkills";

const isSearch = (args: unknown): boolean => {
  const { query, limit } = (args ?? {}) as Record<string, unknown>;
  return (
    (typeof query === "string" && query.trim().length > 0) ||
    typeof limit === "number"
  );
};

const WHOLE_LIBRARY_WARNING =
  "Whole library returned. Pass query (a short task description) to get only the best 3 and save tokens.";

/** MCP `list_project_skills`: compact search with `query` or `limit`, else the whole library plus a warning. */
export const listProjectSkillsTool = async (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}) => {
  if (isSearch(input.args)) {
    return searchProjectSkills(input);
  }
  const result = await listProjectSkills(input);
  return result.ok ? { ...result, warning: WHOLE_LIBRARY_WARNING } : result;
};
