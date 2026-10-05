import {
  insertProjectMessageWithDeliveries,
  type InsertProjectMessageWithDeliveriesResult,
} from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { insertProjectProcessingReceipts } from "@/lib/projects/acl/messaging/insertProjectProcessingReceipts";
import { projectPeerActivityEventForKind } from "@/lib/projects/acl/messaging/projectPeerActivityEventForKind";
import { recordProjectOwnerThreadActivity } from "@/lib/projects/acl/messaging/messenger/recordProjectOwnerThreadActivity";
import { readProjectMessageWakeStep } from "@/lib/projects/acl/messaging/readProjectMessageWakeStep";
import { recordProjectPeerActivity } from "@/lib/projects/acl/messaging/recordProjectPeerActivity";
import type { DispatchRecipient } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { startProjectMessageSilenceWatch } from "@/lib/projects/acl/messaging/startProjectMessageSilenceWatch";

type InsertInput = Parameters<typeof insertProjectMessageWithDeliveries>[0];

/**
 * Bot A → bot B send, server side, in order:
 * 1. store the message and pending deliveries (dispatched)
 * 2. wake step: wake runs once inside insert after the rows exist
 * 3. task.processing receipt B → A for each accepted wake
 * 4. this message as activity on A's open requests to the sender (a reply);
 *    to "Owner": activity on the owner's watched sends to A (messenger)
 * 5. start the 5/10 minute silence watch (awaiting_first_activity), unless
 *    this message is a reply
 * B's later received / processing / status / done / blocked come back
 * through step 4 and reset the silence clock;
 * ack deletes the row; checkProjectMessageSilence applies the timeouts.
 */
export const orchestrateProjectBotToBotMessage = async (input: {
  readonly message: InsertInput & {
    readonly senderMembershipId: string;
    readonly senderProjectDisplayName: string;
  };
  readonly dispatchRecipients: readonly DispatchRecipient[];
  readonly now: Date;
}): Promise<InsertProjectMessageWithDeliveriesResult> => {
  const { message, now } = input;
  const stored = await insertProjectMessageWithDeliveries(message);
  const wakeResults = readProjectMessageWakeStep(stored);
  await insertProjectProcessingReceipts({
    projectId: message.projectId,
    senderMembershipId: message.senderMembershipId,
    recipients: input.dispatchRecipients,
    originalMessageId: stored.messageId,
    wakeResults,
  });
  const activity = await recordProjectPeerActivity({
    fromMembershipId: message.senderMembershipId,
    toMembershipIds: message.recipients.map((recipient) => recipient.id),
    kind: message.kind,
    now,
  });
  const ownerActivity = await recordProjectOwnerThreadActivity({
    projectId: message.projectId,
    fromMembershipId: message.senderMembershipId,
    ownerUserIds: input.dispatchRecipients.flatMap((recipient) =>
      recipient.id === null && recipient.user_id === message.toUserId
        ? [recipient.user_id]
        : [],
    ),
    kind: message.kind,
    now,
  });
  const isReply =
    activity.matched > 0 ||
    ownerActivity.matched > 0 ||
    projectPeerActivityEventForKind(message.kind) !== null;
  if (!isReply) {
    await startProjectMessageSilenceWatch({
      messageId: stored.messageId,
      senderMembershipId: message.senderMembershipId,
      wakeResults,
      now,
    });
  }
  return stored;
};
