import {
  PROJECT_TASK_TRANSITIONS,
  type ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

export type ProjectTaskStatusUpdateDecision =
  | {
      readonly ok: true;
      readonly status: ProjectTaskStatus;
      readonly changed: boolean;
    }
  | { readonly ok: false; readonly code: "task_done" | "invalid_transition" };

/**
 * Explicit FSM (PROJECT_TASK_TRANSITIONS). Same status = no-op (idempotent
 * retries); done is terminal; anything else not listed → invalid_transition.
 */
export const decideProjectTaskStatusUpdate = (input: {
  readonly currentStatus: ProjectTaskStatus;
  readonly nextStatus: ProjectTaskStatus;
}): ProjectTaskStatusUpdateDecision => {
  if (input.currentStatus === input.nextStatus) {
    return { ok: true, status: input.nextStatus, changed: false };
  }
  if (input.currentStatus === "done") {
    return { ok: false, code: "task_done" };
  }
  return PROJECT_TASK_TRANSITIONS[input.currentStatus].includes(
    input.nextStatus,
  )
    ? { ok: true, status: input.nextStatus, changed: true }
    : { ok: false, code: "invalid_transition" };
};
