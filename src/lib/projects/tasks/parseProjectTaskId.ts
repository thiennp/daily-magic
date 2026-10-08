import { PROJECT_TASK_ID_MAX_CHARS } from "@/lib/projects/tasks/projectTaskTools.constant";

/**
 * Trimmed id text (task / seat / plan item / project), or null when not a
 * string, blank, or longer than PROJECT_TASK_ID_MAX_CHARS (bounded input).
 */
export const parseProjectTaskId = (v: unknown): string | null => {
  if (typeof v !== "string") return null;
  const id = v.trim();
  return id.length > 0 && id.length <= PROJECT_TASK_ID_MAX_CHARS ? id : null;
};

/** update_project_task taskId: missing / blank vs. over-long or non-string. */
export const parseRequiredProjectTaskId = (
  v: unknown,
):
  | { readonly ok: true; readonly value: string }
  | {
      readonly ok: false;
      readonly code: "task_id_required" | "invalid_task_id";
    } => {
  const id = parseProjectTaskId(v);
  if (id !== null) return { ok: true, value: id };
  const blank = typeof v !== "string" || v.trim().length === 0;
  return { ok: false, code: blank ? "task_id_required" : "invalid_task_id" };
};
