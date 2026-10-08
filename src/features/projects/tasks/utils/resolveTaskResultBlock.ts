import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";

export const TASK_RESULT_PREVIEW_MAX_CHARS = 600;

export type TaskResultBlock = {
  readonly tone: "bad" | "neutral";
  readonly title: string;
  readonly body: string;
  readonly preview: string;
  readonly truncated: boolean;
};

const block = (
  tone: TaskResultBlock["tone"],
  title: string,
  body: string,
): TaskResultBlock => ({
  tone,
  title,
  body,
  preview: body.slice(0, TASK_RESULT_PREVIEW_MAX_CHARS),
  truncated: body.length > TASK_RESULT_PREVIEW_MAX_CHARS,
});

/** Terminal-state explanation shown in task detail; null for other states. */
export const resolveTaskResultBlock = (
  task: Pick<ProjectTaskMeta, "status" | "resultOutput" | "denialReason">,
): TaskResultBlock | null => {
  if (task.status === "failed") {
    const output = task.resultOutput?.trim() ?? "";
    return block(
      "bad",
      "Why it failed",
      output.length > 0 ? output : "No details were reported.",
    );
  }
  if (task.status === "denied") {
    return block("neutral", "Denied", task.denialReason?.trim() ?? "");
  }
  if (task.status === "timed_out") {
    return block(
      "neutral",
      "Timed out",
      "Nobody answered in time. Nothing ran.",
    );
  }
  return null;
};
