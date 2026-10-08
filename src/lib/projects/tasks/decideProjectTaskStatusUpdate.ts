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
  | { readonly ok: false; readonly code: "invalid_transition" };

/**
 * Explicit FSM (PROJECT_TASK_TRANSITIONS). Same status = no-op (idempotent
 * retries); anything not listed → invalid_transition. Done can be reopened.
 */
export const decideProjectTaskStatusUpdate = (input: {
  readonly currentStatus: ProjectTaskStatus;
  readonly nextStatus: ProjectTaskStatus;
}): ProjectTaskStatusUpdateDecision => {
  if (input.currentStatus === input.nextStatus) {
    return { ok: true, status: input.nextStatus, changed: false };
  }
  return PROJECT_TASK_TRANSITIONS[input.currentStatus].includes(
    input.nextStatus,
  )
    ? { ok: true, status: input.nextStatus, changed: true }
    : { ok: false, code: "invalid_transition" };
};
