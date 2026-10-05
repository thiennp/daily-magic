import { insertProjectHmacProcessingReceipt } from "@/lib/projects/acl/messaging/insertProjectHmacProcessingReceipt";
import { PROJECT_MESSAGE_KIND_TASK_PROCESSING } from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * After an HMAC POST 2xx, insert the same thin task.processing receipt the Grok
 * path sends on http_200. Best-effort: delivery status is already recorded.
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
  if (senderMembershipId === input.peerMembershipId) {
    return;
  }
  if (input.payload.kind === PROJECT_MESSAGE_KIND_TASK_PROCESSING) {
    return;
  }
  try {
    await insertProjectHmacProcessingReceipt({
      projectId: input.payload.projectId,
      originalMessageId: input.payload.messageId,
      senderMembershipId,
      peerMembershipId: input.peerMembershipId,
    });
  } catch (error: unknown) {
    console.error("project hmac processing receipt failed", {
      messageId: input.payload.messageId,
      membershipId: input.peerMembershipId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
