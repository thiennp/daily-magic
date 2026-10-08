import type { ComputerNotAssignableCause } from "@/lib/projects/acl/messaging/assertComputerDispatchAssignable";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import { checkProjectMessageSilence } from "@/lib/projects/acl/messaging/checkProjectMessageSilence";
import { decideProjectMessagePostAccess } from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";
import { dispatchResolvedBotProjectMessage } from "@/lib/projects/acl/messaging/dispatchResolvedBotProjectMessage";
import { parseProjectDispatchPayload } from "@/lib/projects/acl/messaging/parseProjectDispatchPayload";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { resolveDispatchRecipients } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { routeComputerDispatchWithAudit } from "@/lib/projects/acl/messaging/routeComputerDispatchWithAudit";
import { writeProjectMessageDispatchAudit } from "@/lib/projects/acl/messaging/writeProjectMessageDispatchAudit";

export type DispatchProjectMessageResult =
  | {
      readonly ok: true;
      readonly messageId: string;
      readonly recipientCount: number;
      readonly agentRunId?: string;
    }
  | {
      readonly ok: false;
      readonly code: string;
      readonly cause?: ComputerNotAssignableCause;
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
  const access = decideProjectMessagePostAccess(sender);
  if (!access.ok) {
    return { ok: false, code: access.code };
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
    return rate;
  }

  const resolved = await resolveDispatchRecipients({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    toMembershipId: parsed.toMembershipId,
    toProjectDisplayName: parsed.toProjectDisplayName,
  });
  if (!resolved.ok) {
    return { ok: false, code: resolved.code };
  }

  const computer = await routeComputerDispatchWithAudit({
    route: {
      projectId: input.projectId,
      actorUserId: input.actorUserId,
      senderMembershipId: sender.id,
      senderProjectDisplayName: access.projectDisplayName,
      primary: resolved.recipients[0],
      parsed,
    },
    audit: ({ messageId }) =>
      writeProjectMessageDispatchAudit({
        projectId: input.projectId,
        actorUserId: input.actorUserId,
        messageId,
        recipientCount: 1,
        parsed,
      }),
  });
  if (computer !== null) {
    return computer;
  }

  return dispatchResolvedBotProjectMessage({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    senderMembershipId: sender.id,
    senderProjectDisplayName: access.projectDisplayName,
    parsed,
    recipients: resolved.recipients,
  });
};
