import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import { checkProjectMessageSilence } from "@/lib/projects/acl/messaging/checkProjectMessageSilence";
import { orchestrateProjectBotToBotMessage } from "@/lib/projects/acl/messaging/orchestrateProjectBotToBotMessage";
import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { resolveDispatchRecipients } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { writeProjectMessageDispatchAudit } from "@/lib/projects/acl/messaging/writeProjectMessageDispatchAudit";

export type DispatchProjectMessageResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly recipientCount: number;
    }
  | {
      readonly ok: false;
      readonly code: string;
      readonly reason?: "hourly" | "unread_cap";
      readonly detail?: "rate_limited_hourly" | "unread_cap";
      readonly retryAfterSeconds?: number | null;
      readonly retryAfterAt?: string | null;
      readonly message?: string;
    };

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
  await checkProjectMessageSilence({ now: new Date() });

  const rate = await assertProjectMessageDispatchRateLimits({
    projectId: input.projectId,
    senderMembershipId: sender.id,
    senderUserId: input.actorUserId,
  });
  if (!rate.ok) {
    // Same six fields (code, reason, detail, retryAfter*, message) as the result.
    return rate;
  }

  const resolved = await resolveDispatchRecipients({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    toMembershipId: parsed.toMembershipId,
    toProjectDisplayName: parsed.toProjectDisplayName,
    toTeamLabel: parsed.toTeamLabel,
  });
  if (!resolved.ok) {
    return { ok: false, code: resolved.code };
  }

  const primary = resolved.recipients[0];
  const addressedByMembershipOrName =
    parsed.toMembershipId !== null || parsed.toProjectDisplayName !== null;
  const inserted = await orchestrateProjectBotToBotMessage({
    message: {
      projectId: input.projectId,
      senderMembershipId: sender.id,
      senderProjectDisplayName: sender.projectDisplayName,
      senderUserId: input.actorUserId,
      toMembershipId: addressedByMembershipOrName ? primary.id : null,
      toUserId: addressedByMembershipOrName ? primary.user_id : null,
      toTeamLabel: parsed.toTeamLabel,
      toProjectDisplayName: parsed.toProjectDisplayName,
      kind: parsed.kind,
      summary: parsed.summary,
      refsJson: JSON.stringify(parsed.refs),
      recipients: resolved.recipients.filter(
        (recipient): recipient is { id: string; user_id: string } =>
          recipient.id !== null,
      ),
    },
    dispatchRecipients: resolved.recipients,
    now: new Date(),
  });
  await writeProjectMessageDispatchAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    messageId: inserted.messageId,
    recipientCount: resolved.recipients.length,
    parsed,
  });
  return {
    ok: true,
    messageId: inserted.messageId,
    recipientCount: resolved.recipients.length,
  };
};
