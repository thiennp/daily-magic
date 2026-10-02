import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { resolveDispatchRecipients } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

export type DispatchProjectMessageFromOwnerResult =
  | { readonly ok: true; readonly messageId: string }
  | { readonly ok: false; readonly code: string };

export const dispatchProjectMessageFromOwner = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly args: unknown;
}): Promise<DispatchProjectMessageFromOwnerResult> => {
  if (input.args === null || typeof input.args !== "object") {
    return { ok: false, code: "invalid_arguments" };
  }
  const body = input.args as Record<string, unknown>;
  const parsed = parseProjectDispatchPayload({
    ...body,
    kind:
      typeof body.kind === "string" && body.kind.trim().length > 0
        ? body.kind
        : "task.assign",
  });
  if (!parsed.ok || parsed.toProjectDisplayName === null || parsed.toTeamLabel !== null) {
    return { ok: false, code: parsed.ok ? "peer_required" : parsed.code };
  }

  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  const rate = await assertProjectMessageDispatchRateLimits({
    senderMembershipId: null,
    senderUserId: input.ownerUserId,
  });
  if (!rate.ok) return { ok: false, code: rate.code };

  const resolved = await resolveDispatchRecipients({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    toProjectDisplayName: parsed.toProjectDisplayName,
    toTeamLabel: null,
  });
  if (!resolved.ok) return { ok: false, code: resolved.code };
  const resolvedRecipient = resolved.recipients[0];
  if (!resolvedRecipient || resolvedRecipient.id === null) {
    return { ok: false, code: "recipient_not_found" };
  }
  const recipient = { id: resolvedRecipient.id, user_id: resolvedRecipient.user_id };

  const messageId = await insertProjectMessageWithDeliveries({
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
  });
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "msg.dispatch",
    targetUserId: recipient.user_id,
    detail: { messageId, kind: parsed.kind, recipientCount: 1, fromOwner: true },
  });
  return { ok: true, messageId };
};
