import { isProjectMessageAlreadyAckedByActor } from "@/lib/projects/acl/messaging/isProjectMessageAlreadyAckedByActor";

export type AckProjectMessageResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      /** Set when a previous ack (or delete-on-read) already handled it. */
      readonly alreadyAcked?: true;
    }
  | {
      readonly ok: false;
      readonly code: "forbidden" | "not_found" | "computer_ack_required";
    };

/** ok, flagged alreadyAcked when the row was already acked (held for computerAck). */
export const ackedProjectMessageOk = (
  messageId: string,
  wasAcked: boolean,
): AckProjectMessageResult =>
  wasAcked
    ? { ok: true, messageId, alreadyAcked: true }
    : { ok: true, messageId };

/**
 * Row gone: idempotent ok when the caller's own message was already removed
 * by ack / delete-on-read (DF-020/021); otherwise not_found.
 */
export const alreadyAckedProjectMessageOrNotFound = async (input: {
  readonly messageId: string;
  readonly actorUserId: string;
}): Promise<AckProjectMessageResult> =>
  (await isProjectMessageAlreadyAckedByActor(input))
    ? { ok: true, messageId: input.messageId, alreadyAcked: true }
    : { ok: false, code: "not_found" };
