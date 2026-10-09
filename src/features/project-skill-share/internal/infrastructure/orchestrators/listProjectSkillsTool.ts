import { listProjectSkills } from "@/features/project-skill-share/internal/infrastructure/orchestrators/listProjectSkills";
import { searchProjectSkills } from "@/features/project-skill-share/internal/infrastructure/orchestrators/searchProjectSkills";

const isSearch = (args: unknown): boolean => {
  const { query, limit } = (args ?? {}) as Record<string, unknown>;
  return (
    (typeof query === "string" && query.trim().length > 0) ||
    typeof limit === "number"
  );
};

/** MCP `list_project_skills`: compact search with `query` or `limit`, else the whole library. */
export const listProjectSkillsTool = (input: {
  readonly actorUserId: string;
  readonly args: unknown;
}) =>
  isSearch(input.args) ? searchProjectSkills(input) : listProjectSkills(input);
