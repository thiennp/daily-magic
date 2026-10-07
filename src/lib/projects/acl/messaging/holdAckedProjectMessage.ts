import { holdProjectMessageForComputerAck } from "@/lib/projects/acl/messaging/holdProjectMessageForComputerAck";
import {
  ackedProjectMessageOk,
  type AckProjectMessageResult,
} from "@/lib/projects/acl/messaging/ackProjectMessageResult";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

/**
 * Ack while the history gate still needs computerAck: keep the row (acked_at
 * set once). Only the call that sets acked_at (atomic UPDATE ... RETURNING)
 * writes the msg.ack audit. A repeat or concurrent ack emits no second audit
 * or activity event and returns alreadyAcked (Arch FIX 3 / 3b).
 */
export const holdAckedProjectMessage = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly actorUserId: string;
}): Promise<AckProjectMessageResult> => {
  const firstAck = await holdProjectMessageForComputerAck({
    messageId: input.messageId,
  });
  if (firstAck) {
    await writeProjectAccessAudit({
      projectId: input.projectId,
      actorUserId: input.actorUserId,
      action: "msg.ack",
      detail: { messageId: input.messageId, deleted: false },
    });
  }
  return ackedProjectMessageOk(input.messageId, !firstAck);
};
