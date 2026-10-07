import { insertProjectProcessingReceipt } from "@/lib/projects/acl/messaging/insertProjectProcessingReceipt";
import { isProjectMessageWakeSkippedByPolicy } from "@/lib/projects/acl/messaging/isProjectMessageWakeSkippedByPolicy";

/**
 * HMAC path: after a POST 2xx, insert the shared task.processing receipt (the
 * Grok path calls the same function on http_200, deduped per peer + original).
 * Best-effort: delivery status is already recorded.
 * Owner→bot (fromMembershipId null) inserts peer→Owner the same as bot→bot.
 */
export const maybeInsertProjectHmacProcessingReceipt = async (input: {
  readonly payload: {
    readonly projectId: string;
    readonly messageId: string;
    readonly kind: string;
    readonly fromMembershipId: string | null;
  };
  readonly peerMembershipId: string;
  readonly deliveryOk: boolean;
}): Promise<void> => {
  if (!input.deliveryOk) {
    return;
  }
  // Status kinds (incl. task.processing) never get a receipt (DF-022).
  if (isProjectMessageWakeSkippedByPolicy(input.payload.kind)) {
    return;
  }
  try {
    await insertProjectProcessingReceipt({
      projectId: input.payload.projectId,
      peer: input.peerMembershipId,
      sender: input.payload.fromMembershipId,
      originalMessageId: input.payload.messageId,
    });
  } catch (error: unknown) {
    console.error("project hmac processing receipt failed", {
      messageId: input.payload.messageId,
      membershipId: input.peerMembershipId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
