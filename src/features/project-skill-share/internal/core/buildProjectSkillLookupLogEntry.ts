export type ProjectSkillLookupLogEntry = {
  readonly projectId: string;
  readonly tool: "list" | "get";
  readonly hadQuery: boolean;
  readonly queryChars: number;
  readonly returned: number;
  readonly total: number | null;
  readonly responseTokens: number;
  readonly topIds: readonly string[];
  readonly skillId: string | null;
};

const TOP_IDS = 5;

const rec = (value: unknown): Record<string, unknown> =>
  typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};

const ids = (rows: unknown): readonly string[] =>
  Array.isArray(rows)
    ? rows
        .map((row) => rec(row).skillId)
        .filter((id): id is string => typeof id === "string")
    : [];

/**
 * Metadata-only record of one list / get call: counts, sizes and skill ids.
 * Never the query text. Null when the call has no project or failed.
 */
export const buildProjectSkillLookupLogEntry = (input: {
  readonly tool: string;
  readonly args: unknown;
  readonly result: unknown;
}): ProjectSkillLookupLogEntry | null => {
  const args = rec(input.args);
  const result = rec(input.result);
  const projectId = args.projectId;
  if (typeof projectId !== "string" || result.ok !== true) {
    return null;
  }
  const responseTokens = Math.ceil(JSON.stringify(input.result).length / 4);
  if (input.tool === "get_project_skill") {
    return {
      projectId,
      tool: "get",
      hadQuery: false,
      queryChars: 0,
      returned: 1,
      total: null,
      responseTokens,
      topIds: [],
      skillId: typeof args.skillId === "string" ? args.skillId : null,
    };
  }
  if (input.tool !== "list_project_skills") {
    return null;
  }
  const rows = Array.isArray(result.matches) ? result.matches : result.skills;
  const query = typeof args.query === "string" ? args.query.trim() : "";
  return {
    projectId,
    tool: "list",
    hadQuery: query.length > 0,
    queryChars: query.length,
    returned: Array.isArray(rows) ? rows.length : 0,
    total: typeof result.total === "number" ? result.total : null,
    responseTokens,
    topIds: ids(rows).slice(0, TOP_IDS),
    skillId: null,
  };
};
