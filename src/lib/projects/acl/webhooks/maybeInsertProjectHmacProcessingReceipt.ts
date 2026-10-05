import { insertProjectProcessingReceipt } from "@/lib/projects/acl/messaging/insertProjectProcessingReceipt";
import { PROJECT_MESSAGE_KIND_TASK_PROCESSING } from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * HMAC path: after a POST 2xx, insert the shared task.processing receipt (the
 * Grok path calls the same function on http_200, deduped per peer + original).
 * Best-effort: delivery status is already recorded.
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
  const senderMembershipId = input.payload.fromMembershipId;
  if (senderMembershipId === null) {
    return;
  }
  if (input.payload.kind === PROJECT_MESSAGE_KIND_TASK_PROCESSING) {
    return;
  }
  try {
    await insertProjectProcessingReceipt({
      projectId: input.payload.projectId,
      peer: input.peerMembershipId,
      sender: senderMembershipId,
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
