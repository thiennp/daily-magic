import { insertProjectProcessingReceipts } from "@/lib/projects/acl/messaging/insertProjectProcessingReceipts";
import type { DispatchRecipient } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import type { ProjectGrokRoutineWakeResult } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

/**
 * Owner → bot Grok wake: peer→Owner task.processing on each http_200.
 * Parity with bot→bot orchestrate + HMAC Owner receipt path.
 */
export const insertOwnerGrokWakeProcessingReceipts = async (input: {
  readonly projectId: string;
  readonly recipients: readonly DispatchRecipient[];
  readonly originalMessageId: string;
  readonly wakeResults: readonly ProjectGrokRoutineWakeResult[];
}): Promise<void> => {
  await insertProjectProcessingReceipts({
    projectId: input.projectId,
    senderMembershipId: null,
    recipients: input.recipients,
    originalMessageId: input.originalMessageId,
    wakeResults: input.wakeResults,
  });
};
