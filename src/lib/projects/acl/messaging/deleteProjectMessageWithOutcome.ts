import { isComputerAckSatisfiedForCloudDelete } from "@/lib/projects/acl/messaging/isComputerAckSatisfiedForCloudDelete";
import { loadProjectMessageDeleteSnapshot } from "@/lib/projects/acl/messaging/loadProjectMessageDeleteSnapshot";
import {
  writeProjectMessageOutcome,
  type ProjectMessageDeletedReason,
} from "@/lib/projects/acl/messaging/writeProjectMessageOutcome";
import { getSql } from "@/lib/db";

export type DeleteProjectMessageWithOutcomeResult =
  | { readonly ok: true; readonly messageId: string }
  | { readonly ok: false; readonly code: "not_found" | "computer_ack_required" };

/**
 * Write a thin outcome, then hard-delete the message (CASCADE deliveries and
 * wake attempts). Caller enforces recipient rules; this enforces computerAck
 * composition when History mode is on.
 */
export const deleteProjectMessageWithOutcome = async (input: {
  readonly messageId: string;
  readonly deletedReason: ProjectMessageDeletedReason;
  /** Override final state when ack forces terminal without reading deliveries. */
  readonly finalB2bState?: string | null;
}): Promise<DeleteProjectMessageWithOutcomeResult> => {
  const snapshot = await loadProjectMessageDeleteSnapshot({
    messageId: input.messageId,
  });
  if (snapshot === null) {
    return { ok: false, code: "not_found" };
  }
  const computerOk = await isComputerAckSatisfiedForCloudDelete({
    projectId: snapshot.projectId,
    messageId: snapshot.messageId,
  });
  if (!computerOk) {
    return { ok: false, code: "computer_ack_required" };
  }
  const finalB2bState =
    input.finalB2bState !== undefined
      ? input.finalB2bState
      : (snapshot.deliveryStates.find((s) => s !== null) ?? null);
  await writeProjectMessageOutcome({
    messageId: snapshot.messageId,
    projectId: snapshot.projectId,
    recipientUserId: snapshot.recipientUserId,
    recipientMembershipId: snapshot.recipientMembershipId,
    finalB2bState,
    grokWakeResult: snapshot.grokWakeResult,
    deletedReason: input.deletedReason,
    messageCreatedAt: snapshot.messageCreatedAt,
    readAt: snapshot.readAt,
  });
  const sql = getSql();
  await sql`
    DELETE FROM project_messages
    WHERE id = ${input.messageId}
  `;
  return { ok: true, messageId: input.messageId };
};
