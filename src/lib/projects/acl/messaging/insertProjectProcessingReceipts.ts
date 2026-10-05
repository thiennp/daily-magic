import { insertProjectProcessingReceipt } from "@/lib/projects/acl/messaging/insertProjectProcessingReceipt";
import type { DispatchRecipient } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import type { ProjectGrokRoutineWakeResult } from "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks";

const acceptedWakePeerIds = (input: {
  readonly recipients: readonly DispatchRecipient[];
  readonly wakeResults: readonly ProjectGrokRoutineWakeResult[];
}): readonly string[] => {
  const recipientIds = new Set(
    input.recipients.flatMap((recipient) =>
      recipient.id === null ? [] : [recipient.id],
    ),
  );
  return input.wakeResults.flatMap((wake) =>
    wake.result === "http_200" && recipientIds.has(wake.membershipId)
      ? [wake.membershipId]
      : [],
  );
};

/** Grok path: one receipt per accepted (http_200) peer wake. Owner sends use null. */
export const insertProjectProcessingReceipts = async (input: {
  readonly projectId: string;
  readonly senderMembershipId: string | null;
  readonly recipients: readonly DispatchRecipient[];
  readonly originalMessageId: string;
  readonly wakeResults: readonly ProjectGrokRoutineWakeResult[];
}): Promise<void> => {
  for (const peer of acceptedWakePeerIds(input)) {
    await insertProjectProcessingReceipt({
      projectId: input.projectId,
      peer,
      sender: input.senderMembershipId,
      originalMessageId: input.originalMessageId,
    });
  }
};
