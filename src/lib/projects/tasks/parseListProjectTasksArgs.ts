import {
  decodeProjectActivityCursor,
  type ProjectActivityCursor,
} from "@/lib/projects/acl/activity/projectActivityCursor";
import {
  decodeProjectTaskPriorityCursor,
  type ProjectTaskPriorityCursor,
} from "@/lib/projects/tasks/projectTaskPriorityCursor";
import {
  PROJECT_TASK_STATUSES,
  type ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

export const LIST_PROJECT_TASKS_DEFAULT_LIMIT = 50;
export const LIST_PROJECT_TASKS_MAX_LIMIT = 100;

export type ListProjectTasksArgsError =
  "invalid_arguments" | "invalid_status" | "invalid_sort" | "invalid_cursor";

export type ListProjectTasksSort = "updated" | "priority";

export type ParsedListProjectTasksArgs = {
  readonly projectId: string;
  readonly status: ProjectTaskStatus | null;
  readonly limit: number;
  readonly sort: ListProjectTasksSort;
  readonly mine: boolean;
  readonly ownerMembershipId: string | null;
  /** Set for sort "updated". */
  readonly cursor: ProjectActivityCursor | null;
  /** Set for sort "priority". */
  readonly priorityCursor: ProjectTaskPriorityCursor | null;
};

const text = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const parseLimit = (value: unknown): number => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return LIST_PROJECT_TASKS_DEFAULT_LIMIT;
  }
  return Math.min(LIST_PROJECT_TASKS_MAX_LIMIT, Math.max(1, Math.floor(value)));
};

/** list_project_tasks args: projectId, status?, sort?, mine?, ownerMembershipId?, limit 1–100 (50), cursor?. */
export const parseListProjectTasksArgs = (
  args: unknown,
):
  | { readonly ok: true; readonly value: ParsedListProjectTasksArgs }
  | { readonly ok: false; readonly code: ListProjectTasksArgsError } => {
  const row =
    args !== null && typeof args === "object" && !Array.isArray(args)
      ? (args as Record<string, unknown>)
      : null;
  const projectId = text(row?.projectId);
  if (row === null || projectId.length === 0) {
    return { ok: false, code: "invalid_arguments" };
  }
  const rawStatus = text(row.status).toLowerCase();
  const status = rawStatus.length === 0 ? null : rawStatus;
  if (
    status !== null &&
    !(PROJECT_TASK_STATUSES as readonly string[]).includes(status)
  ) {
    return { ok: false, code: "invalid_status" };
  }
  const rawSort = text(row.sort).toLowerCase();
  const sort = rawSort.length === 0 ? "updated" : rawSort;
  if (sort !== "updated" && sort !== "priority") {
    return { ok: false, code: "invalid_sort" };
  }
  const rawCursor = typeof row.cursor === "string" ? row.cursor : null;
  const cursor =
    sort === "updated" ? decodeProjectActivityCursor(rawCursor) : null;
  const priorityCursor =
    sort === "priority" ? decodeProjectTaskPriorityCursor(rawCursor) : null;
  if (cursor === "invalid" || priorityCursor === "invalid") {
    return { ok: false, code: "invalid_cursor" };
  }
  return {
    ok: true,
    value: {
      projectId,
      status: status as ProjectTaskStatus | null,
      limit: parseLimit(row.limit),
      sort,
      mine: row.mine === true,
      ownerMembershipId: text(row.ownerMembershipId) || null,
      cursor,
      priorityCursor,
    },
  };
};
