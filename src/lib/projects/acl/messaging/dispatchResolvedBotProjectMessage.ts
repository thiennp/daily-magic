import { orchestrateProjectBotToBotMessage } from "@/lib/projects/acl/messaging/orchestrateProjectBotToBotMessage";
import type { ParsedProjectDispatch } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import type { DispatchRecipient } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { writeProjectMessageDispatchAudit } from "@/lib/projects/acl/messaging/writeProjectMessageDispatchAudit";

type ParsedDispatchOk = Extract<ParsedProjectDispatch, { readonly ok: true }>;

/** Member → bot/human peers: store + wake + audit for already-resolved recipients. */
export const dispatchResolvedBotProjectMessage = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly senderMembershipId: string;
  readonly senderProjectDisplayName: string;
  readonly parsed: ParsedDispatchOk;
  readonly recipients: readonly DispatchRecipient[];
}): Promise<{
  readonly ok: true;
  readonly messageId: string;
  readonly recipientCount: number;
}> => {
  const { parsed, recipients } = input;
  const primary = recipients[0];
  const addressedByMembershipOrName =
    parsed.toMembershipId !== null || parsed.toProjectDisplayName !== null;
  const inserted = await orchestrateProjectBotToBotMessage({
    message: {
      projectId: input.projectId,
      senderMembershipId: input.senderMembershipId,
      senderProjectDisplayName: input.senderProjectDisplayName,
      senderUserId: input.actorUserId,
      toMembershipId: addressedByMembershipOrName ? primary.id : null,
      toUserId: addressedByMembershipOrName ? primary.user_id : null,
      toTeamLabel: parsed.toTeamLabel,
      toProjectDisplayName: parsed.toProjectDisplayName,
      kind: parsed.kind,
      summary: parsed.summary,
      refsJson: JSON.stringify(parsed.refs),
      recipients: recipients.filter(
        (recipient): recipient is { id: string; user_id: string } =>
          recipient.id !== null,
      ),
    },
    dispatchRecipients: recipients,
    now: new Date(),
  });
  await writeProjectMessageDispatchAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    messageId: inserted.messageId,
    recipientCount: recipients.length,
    parsed,
  });
  return {
    ok: true,
    messageId: inserted.messageId,
    recipientCount: recipients.length,
  };
};
