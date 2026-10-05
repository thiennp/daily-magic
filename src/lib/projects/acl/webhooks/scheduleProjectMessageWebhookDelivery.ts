import {
  deliverProjectMessageWebhooks,
  type ProjectMessageWebhookPayload,
} from "@/lib/projects/acl/webhooks/deliverProjectMessageWebhooks";

export const scheduleProjectMessageWebhookDelivery = (input: {
  readonly payload: ProjectMessageWebhookPayload;
  readonly recipientMembershipIds: readonly string[];
}): void => {
  void deliverProjectMessageWebhooks(input).catch((error: unknown) => {
    console.error("project message webhook delivery failed", {
      messageId: input.payload.messageId,
      error: error instanceof Error ? error.message : String(error),
    });
  });
};
