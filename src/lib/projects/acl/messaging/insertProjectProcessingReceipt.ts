import { isProjectMessageReadOnlyRole } from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";
import { hasProjectProcessingReceipt } from "@/lib/projects/acl/messaging/hasProjectProcessingReceipt";
import { insertOwnerProjectProcessingReceipt } from "@/lib/projects/acl/messaging/insertOwnerProjectProcessingReceipt";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { loadProjectProcessingReceiptMemberships } from "@/lib/projects/acl/messaging/loadProjectProcessingReceiptMemberships";
import {
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import { serializeByKey } from "@/lib/projects/acl/messaging/serializeByKey";

const processingReceiptSummary = (originalMessageId: string): string =>
  `processing ${originalMessageId}`.slice(0, PROJECT_MESSAGE_SUMMARY_MAX_CHARS);

/**
 * Thin task.processing receipt peer → sender for one accepted wake (Grok
 * http_200 or HMAC 2xx). At most one per peer + original message: calls for
 * the same pair run one after another and skip when the receipt is stored.
 * Direct insert, so a receipt cannot spawn another via orchestrate.
 * `peer` is a membership id; `sender` is a membership id or null (Owner).
 */
export const insertProjectProcessingReceipt = async (input: {
  readonly projectId: string;
  readonly peer: string;
  readonly sender: string | null;
  readonly originalMessageId: string;
}): Promise<void> => {
  if (input.sender !== null && input.peer === input.sender) {
    return;
  }
  const summary = processingReceiptSummary(input.originalMessageId);
  const key = `${input.projectId}:${input.peer}:${input.originalMessageId}`;
  await serializeByKey(key, async () => {
    if (input.sender === null) {
      await insertOwnerProjectProcessingReceipt({
        projectId: input.projectId,
        peer: input.peer,
        summary,
      });
      return;
    }

    if (await hasProjectProcessingReceipt({ ...input, summary })) {
      return;
    }
    const byId = await loadProjectProcessingReceiptMemberships({
      projectId: input.projectId,
      ids: [input.peer, input.sender],
    });
    const peer = byId.get(input.peer);
    const sender = byId.get(input.sender);
    // Viewers are read-only on messages: never post a receipt as them.
    if (peer === undefined || sender === undefined || isProjectMessageReadOnlyRole(peer.role)) {
      return;
    }
    await insertProjectMessageWithDeliveries({
      projectId: input.projectId,
      senderMembershipId: peer.id,
      senderUserId: peer.userId,
      senderProjectDisplayName: peer.projectDisplayName,
      toMembershipId: sender.id,
      toUserId: sender.userId,
      toTeamLabel: null,
      toProjectDisplayName: sender.projectDisplayName,
      kind: PROJECT_MESSAGE_KIND_TASK_PROCESSING,
      summary,
      refsJson: "{}",
      recipients: [{ id: sender.id, user_id: sender.userId }],
    });
  });
};
