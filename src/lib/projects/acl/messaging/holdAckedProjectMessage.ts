import { holdProjectMessageForComputerAck } from "@/lib/projects/acl/messaging/holdProjectMessageForComputerAck";
import {
  ackedProjectMessageOk,
  type AckProjectMessageResult,
} from "@/lib/projects/acl/messaging/ackProjectMessageResult";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

/**
 * Ack while the history gate still needs computerAck: keep the row (acked_at
 * set once). Only the first ack writes the msg.ack audit; a repeat ack
 * (wasAcked) emits no second audit / activity event (Arch FIX 3).
 */
export const holdAckedProjectMessage = async (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly actorUserId: string;
  readonly wasAcked: boolean;
}): Promise<AckProjectMessageResult> => {
  await holdProjectMessageForComputerAck({ messageId: input.messageId });
  if (!input.wasAcked) {
    await writeProjectAccessAudit({
      projectId: input.projectId,
      actorUserId: input.actorUserId,
      action: "msg.ack",
      detail: { messageId: input.messageId, deleted: false },
    });
  }
  return ackedProjectMessageOk(input.messageId, input.wasAcked);
};
