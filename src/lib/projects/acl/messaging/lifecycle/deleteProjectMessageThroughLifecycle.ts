import { isProjectMessageReadyToLeaveRead } from "@/lib/projects/acl/messaging/lifecycle/isProjectMessageRead";
import {
  deleteProjectMessageWithOutcome,
  type DeleteProjectMessageWithOutcomeResult,
} from "@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome";
import type { ProjectMessageDeleteSnapshot } from "@/lib/projects/acl/messaging/loadProjectMessageDeleteSnapshot";
import type { ProjectMessageDeletedReason } from "@/lib/projects/acl/messaging/writeProjectMessageOutcome";

export type DeleteProjectMessageThroughLifecycleResult =
  | DeleteProjectMessageWithOutcomeResult
  | { readonly ok: false; readonly code: "not_ready_for_delete_on_read" };

/**
 * deleteFromCloud arrow, in order:
 * 1. DOR readiness (Dispatch) — isProjectMessageReadyToLeaveRead.
 * 2. History gate — runs last inside deleteProjectMessageWithOutcome
 *    (gateProjectMessageDelete). Not duplicated here.
 * 3. deleteProjectMessageWithOutcome — outcome row + hard delete.
 * History ON: the gate requires SAVED_TO_PROJECT_FOLDER; age/7d/timeout never
 * bypasses it (see isCloudDeleteAllowedFromLifecycleState). History OFF: the
 * OFF-only exception lets DOR delete from READ.
 */
export const deleteProjectMessageThroughLifecycle = async (input: {
  readonly snapshot: Pick<
    ProjectMessageDeleteSnapshot,
    "messageId" | "readAt" | "deliveryStates" | "kind"
  >;
  readonly deletedReason: ProjectMessageDeletedReason;
}): Promise<DeleteProjectMessageThroughLifecycleResult> => {
  if (!isProjectMessageReadyToLeaveRead(input.snapshot)) {
    return { ok: false, code: "not_ready_for_delete_on_read" };
  }
  return deleteProjectMessageWithOutcome({
    messageId: input.snapshot.messageId,
    deletedReason: input.deletedReason,
  });
};
