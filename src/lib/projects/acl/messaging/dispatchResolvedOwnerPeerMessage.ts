import { completeOwnerProjectMessageInsert } from "@/lib/projects/acl/messaging/completeOwnerProjectMessageInsert";
import type { ParsedProjectDispatch } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import type { DispatchRecipient } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

type ParsedDispatchOk = Extract<ParsedProjectDispatch, { readonly ok: true }>;

/** Owner → bot/human peer: store + receipts + audit for one resolved recipient. */
export const dispatchResolvedOwnerPeerMessage = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly parsed: ParsedDispatchOk;
  readonly recipient: { readonly id: string; readonly user_id: string };
  readonly dispatchRecipients: readonly DispatchRecipient[];
}): Promise<{ readonly ok: true; readonly messageId: string; readonly recipientCount: 1 }> => {
  const { parsed } = input;
  const recipient = { id: input.recipient.id, user_id: input.recipient.user_id };
  const { messageId } = await completeOwnerProjectMessageInsert({
    message: {
      projectId: input.projectId,
      senderMembershipId: null,
      senderUserId: input.ownerUserId,
      toMembershipId: recipient.id,
      toUserId: recipient.user_id,
      toTeamLabel: null,
      toProjectDisplayName: parsed.toProjectDisplayName,
      kind: parsed.kind,
      summary: parsed.summary,
      refsJson: JSON.stringify(parsed.refs),
      recipients: [recipient],
    },
    dispatchRecipients: input.dispatchRecipients,
  });
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "msg.dispatch",
    targetUserId: recipient.user_id,
    detail: { messageId, kind: parsed.kind, recipientCount: 1, fromOwner: true },
  });
  return { ok: true, messageId, recipientCount: 1 };
};
