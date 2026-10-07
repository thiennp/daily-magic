import type { ProjectTaskFieldError } from "@/lib/projects/tasks/parseProjectTaskFieldValues";
import {
  parseProjectTaskFields,
  type ProjectTaskFieldPatch,
} from "@/lib/projects/tasks/parseProjectTaskFields";
import {
  PROJECT_TASK_BODY_ARG_KEYS,
  PROJECT_TASK_INITIAL_STATUSES,
  PROJECT_TASK_STATUSES,
  type ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

export type ProjectTaskArgsError =
  | ProjectTaskFieldError
  | "invalid_arguments"
  | "body_not_allowed"
  | "task_id_required"
  | "invalid_status"
  | "nothing_to_update";

export type ParsedCreateProjectTaskArgs = {
  readonly projectId: string;
  readonly status: ProjectTaskStatus;
  readonly fields: ProjectTaskFieldPatch & { readonly title: string };
};

export type ParsedUpdateProjectTaskArgs = {
  readonly projectId: string;
  readonly taskId: string;
  readonly status: ProjectTaskStatus | null;
  readonly fields: ProjectTaskFieldPatch;
};

type Parsed<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly code: ProjectTaskArgsError };

const asRecord = (args: unknown): Record<string, unknown> | null =>
  args !== null && typeof args === "object" && !Array.isArray(args)
    ? (args as Record<string, unknown>)
    : null;

const text = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const parseStatus = (
  value: unknown,
  allowed: readonly ProjectTaskStatus[],
): ProjectTaskStatus | null => {
  const status = text(value).toLowerCase();
  return (allowed as readonly string[]).includes(status)
    ? (status as ProjectTaskStatus)
    : null;
};

const parseCommon = (
  args: unknown,
): Parsed<{
  readonly row: Record<string, unknown>;
  readonly projectId: string;
}> => {
  const row = asRecord(args);
  const projectId = text(row?.projectId);
  if (row === null || projectId.length === 0) {
    return { ok: false, code: "invalid_arguments" };
  }
  if (PROJECT_TASK_BODY_ARG_KEYS.some((key) => row[key] !== undefined)) {
    return { ok: false, code: "body_not_allowed" };
  }
  return { ok: true, value: { row, projectId } };
};

/** create_project_task args → meta (title required; status queued|planned). */
export const parseCreateProjectTaskArgs = (
  args: unknown,
): Parsed<ParsedCreateProjectTaskArgs> => {
  const common = parseCommon(args);
  if (!common.ok) return common;
  const { row, projectId } = common.value;
  if (row.title === undefined) return { ok: false, code: "title_required" };
  const status =
    row.status === undefined
      ? "queued"
      : parseStatus(row.status, PROJECT_TASK_INITIAL_STATUSES);
  if (status === null) return { ok: false, code: "invalid_status" };
  const fields = parseProjectTaskFields(row);
  if (!fields.ok) return fields;
  const title = fields.value.title ?? "";
  return {
    ok: true,
    value: { projectId, status, fields: { ...fields.value, title } },
  };
};

/** update_project_task args → { taskId, status?, field patch } (≥1 change). */
export const parseUpdateProjectTaskArgs = (
  args: unknown,
): Parsed<ParsedUpdateProjectTaskArgs> => {
  const common = parseCommon(args);
  if (!common.ok) return common;
  const { row, projectId } = common.value;
  const taskId = text(row.taskId);
  if (taskId.length === 0) return { ok: false, code: "task_id_required" };
  const status =
    row.status === undefined
      ? null
      : parseStatus(row.status, PROJECT_TASK_STATUSES);
  if (row.status !== undefined && status === null) {
    return { ok: false, code: "invalid_status" };
  }
  const fields = parseProjectTaskFields(row);
  if (!fields.ok) return fields;
  if (status === null && Object.keys(fields.value).length === 0) {
    return { ok: false, code: "nothing_to_update" };
  }
  return {
    ok: true,
    value: { projectId, taskId, status, fields: fields.value },
  };
};
