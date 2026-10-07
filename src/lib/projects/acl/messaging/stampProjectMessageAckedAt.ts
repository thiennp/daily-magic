import { holdProjectMessageForComputerAck } from "@/lib/projects/acl/messaging/holdProjectMessageForComputerAck";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

/**
 * Recipient ack under keep-300: stamp acked_at only. Never hard-deletes.
 * Inbox drops the row via acked_at; Neon prune owns retention.
 */
export const stampProjectMessageAckedAt = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly actorUserId: string;
}): Promise<{ readonly ok: true; readonly messageId: string }> => {
  await holdProjectMessageForComputerAck({ messageId: input.messageId });
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: "msg.ack",
    detail: { messageId: input.messageId, deleted: false },
  });
  return { ok: true, messageId: input.messageId };
};
