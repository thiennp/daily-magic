import { insertOwnerGrokWakeProcessingReceipts } from "@/lib/projects/acl/messaging/insertOwnerGrokWakeProcessingReceipts";
import {
  insertProjectMessageWithDeliveries,
  type InsertProjectMessageWithDeliveriesResult,
} from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import type { DispatchRecipient } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";

type InsertInput = Parameters<typeof insertProjectMessageWithDeliveries>[0];

/** Store Owner→bot message, then peer→Owner processing receipts for http_200 wakes. */
export const completeOwnerProjectMessageInsert = async (input: {
  readonly message: InsertInput;
  readonly dispatchRecipients: readonly DispatchRecipient[];
}): Promise<InsertProjectMessageWithDeliveriesResult> => {
  const stored = await insertProjectMessageWithDeliveries(input.message);
  await insertOwnerGrokWakeProcessingReceipts({
    projectId: input.message.projectId,
    recipients: input.dispatchRecipients,
    originalMessageId: stored.messageId,
    wakeResults: stored.wakeResults,
  });
  return stored;
};
