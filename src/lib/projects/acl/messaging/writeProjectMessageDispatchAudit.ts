import type { ParsedProjectDispatch } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

type ParsedDispatchOk = Extract<ParsedProjectDispatch, { readonly ok: true }>;

/** Audit row for one dispatched project message (who, what kind, to whom). */
export const writeProjectMessageDispatchAudit = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly messageId: string;
  readonly recipientCount: number;
  readonly parsed: ParsedDispatchOk;
}): Promise<void> => {
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: "msg.dispatch",
    detail: {
      messageId: input.messageId,
      kind: input.parsed.kind,
      recipientCount: input.recipientCount,
      toMembershipId: input.parsed.toMembershipId,
      toProjectDisplayName: input.parsed.toProjectDisplayName,
      toTeamLabel: null,
    },
  });
};
