import { getSql } from "@/lib/db";
import { gateProjectMessageDelete } from "@/lib/projects/acl/messaging/gateProjectMessageDelete";
import { loadProjectMessageDeleteSnapshot } from "@/lib/projects/acl/messaging/loadProjectMessageDeleteSnapshot";
import {
  writeProjectMessageOutcome,
  type ProjectMessageDeletedReason,
} from "@/lib/projects/acl/messaging/writeProjectMessageOutcome";

export type DeleteProjectMessageWithOutcomeResult =
  | { readonly ok: true; readonly messageId: string }
  | {
      readonly ok: false;
      readonly code: "not_found" | "computer_ack_required";
    };

/**
 * Write a thin outcome, then hard-delete through the History gate.
 * When History is gated, allow only if a computerAck exists — never because
 * the message is old (no gap marker, no timeout delete). Caller enforces
 * recipient / DOR rules via existingRuleAllows semantics (this path always
 * passes true once the caller has decided to delete).
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
  const createdAt = snapshot.messageCreatedAt ?? new Date(0).toISOString();
  const gate = await gateProjectMessageDelete({
    projectId: snapshot.projectId,
    messageId: snapshot.messageId,
    createdAt,
    existingRuleAllows: true,
  });
  if (gate === "deny") {
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
  // Archived rows stay readable under Archived; ack never removes them.
  await sql`
    DELETE FROM project_messages
    WHERE id = ${input.messageId}
      AND archived_at IS NULL
  `;
  return { ok: true, messageId: input.messageId };
};
