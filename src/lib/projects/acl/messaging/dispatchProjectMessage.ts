import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { resolveDispatchRecipients } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

export type DispatchProjectMessageResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly recipientCount: number;
    }
  | { readonly ok: false; readonly code: string };

export const dispatchProjectMessage = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly args: unknown;
}): Promise<DispatchProjectMessageResult> => {
  const sender = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (sender === null) {
    return { ok: false, code: "forbidden" };
  }
  if (!sender.projectDisplayName) {
    return { ok: false, code: "naming_required" };
  }
  if (!sender.scopes.includes("msg:dispatch")) {
    return { ok: false, code: "missing_scope" };
  }
  const parsed = parseProjectDispatchPayload(input.args);
  if (!parsed.ok) {
    return { ok: false, code: parsed.code };
  }

  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();

  const rate = await assertProjectMessageDispatchRateLimits({
    senderMembershipId: sender.id,
  });
  if (!rate.ok) {
    return { ok: false, code: rate.code };
  }

  const resolved = await resolveDispatchRecipients({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    toProjectDisplayName: parsed.toProjectDisplayName,
    toTeamLabel: parsed.toTeamLabel,
  });
  if (!resolved.ok) {
    return { ok: false, code: resolved.code };
  }

  const primary = resolved.recipients[0];
  const messageId = await insertProjectMessageWithDeliveries({
    projectId: input.projectId,
    senderMembershipId: sender.id,
    senderUserId: input.actorUserId,
    toMembershipId: parsed.toProjectDisplayName ? primary.id : null,
    toUserId: parsed.toProjectDisplayName ? primary.user_id : null,
    toTeamLabel: parsed.toTeamLabel,
    toProjectDisplayName: parsed.toProjectDisplayName,
    kind: parsed.kind,
    summary: parsed.summary,
    refsJson: JSON.stringify(parsed.refs),
    recipients: resolved.recipients,
  });
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: "msg.dispatch",
    detail: {
      messageId,
      kind: parsed.kind,
      recipientCount: resolved.recipients.length,
      toProjectDisplayName: parsed.toProjectDisplayName,
      toTeamLabel: parsed.toTeamLabel,
    },
  });
  return {
    ok: true,
    messageId,
    recipientCount: resolved.recipients.length,
  };
};
