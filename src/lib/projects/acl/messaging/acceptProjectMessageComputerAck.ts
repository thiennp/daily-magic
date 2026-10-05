import { applyProjectComputerHistoryEvent } from "@/lib/projects/acl/messaging/applyProjectComputerHistoryEvent";
import { deleteHeldProjectMessageAfterComputerAck } from "@/lib/projects/acl/messaging/deleteHeldProjectMessageAfterComputerAck";
import { listProjectComputerHistoryBacklog } from "@/lib/projects/acl/messaging/listProjectComputerHistoryBacklog";
import type { ProjectComputerHistoryState } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";
import { readProjectComputerHistoryState } from "@/lib/projects/acl/messaging/readProjectComputerHistoryState";
import { recordProjectMessageComputerAck } from "@/lib/projects/acl/messaging/recordProjectMessageComputerAck";

export type AcceptProjectMessageComputerAckResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly alreadyAcked: boolean;
      readonly deleted: boolean;
      readonly state: ProjectComputerHistoryState;
    }
  | { readonly ok: false; readonly code: "not_found" };

/**
 * computerAck(projectId, messageId), idempotent. Records the ack, deletes the
 * row if the recipient already acked it, and moves degraded → on_ready once
 * no message is left without a computerAck.
 */
export const acceptProjectMessageComputerAck = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly deviceId: string;
}): Promise<AcceptProjectMessageComputerAckResult> => {
  const recorded = await recordProjectMessageComputerAck(input);
  if (!recorded.ok) {
    return recorded;
  }
  const featureState = await readProjectComputerHistoryState(input.projectId);
  const deleted = await deleteHeldProjectMessageAfterComputerAck({
    projectId: input.projectId,
    messageId: input.messageId,
  });
  const backlogEmpty =
    featureState === "degraded" &&
    (
      await listProjectComputerHistoryBacklog({
        projectId: input.projectId,
        limit: 1,
      })
    ).length === 0;
  const state = backlogEmpty
    ? await applyProjectComputerHistoryEvent({
        projectId: input.projectId,
        event: "computer_backlog_acked",
      }).then((result) => result.state)
    : featureState;
  return {
    ok: true,
    messageId: input.messageId,
    alreadyAcked: recorded.alreadyAcked,
    deleted,
    state,
  };
};
