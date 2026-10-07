import {
  fail,
  isBlank,
  ok,
  oneOf,
  parseDependsOn,
  parseDescription,
  parseTipSha,
  parseTitle,
  type ProjectTaskFieldResult as Result,
} from "@/lib/projects/tasks/parseProjectTaskFieldValues";
import {
  PROJECT_TASK_PRIORITIES,
  PROJECT_TASK_STAGES,
  type ProjectTaskPriority,
  type ProjectTaskStage,
} from "@/lib/projects/tasks/projectTaskTools.constant";

/** undefined = not sent (keep), null = clear. */
export type ProjectTaskFieldPatch = {
  readonly title?: string;
  readonly description?: string | null;
  readonly priority?: ProjectTaskPriority | null;
  readonly stage?: ProjectTaskStage | null;
  readonly tipSha?: string | null;
  readonly ownerMembershipId?: string | null;
  readonly dependsOn?: readonly string[];
  readonly planItemId?: string | null;
};

const parseOne = (
  key: keyof ProjectTaskFieldPatch,
  v: unknown,
): Result<unknown> => {
  switch (key) {
    case "title":
      return parseTitle(v);
    case "description":
      return parseDescription(v);
    case "tipSha":
      return parseTipSha(v);
    case "dependsOn":
      return parseDependsOn(v);
    case "priority": {
      if (isBlank(v)) return ok(null);
      const p = oneOf(PROJECT_TASK_PRIORITIES, v);
      return p === null ? fail("invalid_priority") : ok(p);
    }
    case "stage": {
      if (isBlank(v)) return ok(null);
      const s = oneOf(PROJECT_TASK_STAGES, v);
      return s === null ? fail("invalid_stage") : ok(s);
    }
    case "ownerMembershipId":
      if (isBlank(v)) return ok(null);
      return typeof v === "string" ? ok(v.trim()) : fail("invalid_owner");
    case "planItemId":
      if (isBlank(v)) return ok(null);
      return typeof v === "string" ? ok(v.trim()) : fail("invalid_plan_item");
  }
};

const FIELD_KEYS: readonly (keyof ProjectTaskFieldPatch)[] = [
  "title",
  "description",
  "priority",
  "stage",
  "tipSha",
  "ownerMembershipId",
  "dependsOn",
  "planItemId",
];

/** Validates the meta fields present in args (caps, enums, sha, ids). */
export const parseProjectTaskFields = (
  args: Record<string, unknown>,
): Result<ProjectTaskFieldPatch> => {
  const patch: Record<string, unknown> = {};
  // Brief names it `summary`; Lead spec `description` — same ≤200 column.
  const source: Record<string, unknown> = {
    ...args,
    description: args.description ?? args.summary,
  };
  for (const key of FIELD_KEYS) {
    if (source[key] === undefined) continue;
    const parsed = parseOne(key, source[key]);
    if (!parsed.ok) return parsed;
    patch[key] = parsed.value;
  }
  return ok(patch as ProjectTaskFieldPatch);
};
