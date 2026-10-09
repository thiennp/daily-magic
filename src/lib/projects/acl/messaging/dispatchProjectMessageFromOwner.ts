import type { ComputerNotAssignableCause } from "@/lib/projects/acl/messaging/assertComputerDispatchAssignable";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { assertProjectMessageDispatchRateLimits } from "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits";
import { dispatchResolvedOwnerPeerMessage } from "@/lib/projects/acl/messaging/dispatchResolvedOwnerPeerMessage";
import { parseOwnerPeerDispatchPayload } from "@/lib/projects/acl/messaging/parseOwnerPeerDispatchPayload";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";
import { resolveDispatchRecipients } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";
import { routeComputerDispatchWithAudit } from "@/lib/projects/acl/messaging/routeComputerDispatchWithAudit";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

export type DispatchProjectMessageFromOwnerResult =
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

export const dispatchProjectMessageFromOwner = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly args: unknown;
}): Promise<DispatchProjectMessageFromOwnerResult> => {
  const parsed = parseOwnerPeerDispatchPayload(input.args);
  if (!parsed.ok) {
    return { ok: false, code: parsed.code };
  }

  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  const rate = await assertProjectMessageDispatchRateLimits({
    projectId: input.projectId,
    senderMembershipId: null,
    senderUserId: input.ownerUserId,
  });
  if (!rate.ok) {
    return {
      ok: false,
      code: rate.code,
      reason: rate.reason,
      detail: rate.detail,
      retryAfterSeconds: rate.retryAfterSeconds,
      retryAfterAt: rate.retryAfterAt,
      message: rate.message,
    };
  }

  const resolved = await resolveDispatchRecipients({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    senderMembershipId: null,
    toMembershipId: parsed.toMembershipId,
    toProjectDisplayName: parsed.toProjectDisplayName,
  });
  if (!resolved.ok) return { ok: false, code: resolved.code };
  const resolvedRecipient = resolved.recipients[0];
  if (!resolvedRecipient || resolvedRecipient.id === null) {
    return { ok: false, code: "recipient_not_found" };
  }

  const computer = await routeComputerDispatchWithAudit({
    route: {
      projectId: input.projectId,
      actorUserId: input.ownerUserId,
      senderMembershipId: null,
      primary: resolvedRecipient,
      parsed,
    },
    audit: async ({ messageId, agentRunId }) => {
      await writeProjectAccessAudit({
        projectId: input.projectId,
        actorUserId: input.ownerUserId,
        action: "msg.dispatch",
        targetUserId: resolvedRecipient.user_id,
        detail: {
          messageId,
          kind: parsed.kind,
          recipientCount: 1,
          fromOwner: true,
          agentRunId,
          memberKind: "computer",
        },
      });
    },
  });
  if (computer !== null) {
    return computer;
  }

  return dispatchResolvedOwnerPeerMessage({
    projectId: input.projectId,
    ownerUserId: input.ownerUserId,
    parsed,
    recipient: { id: resolvedRecipient.id, user_id: resolvedRecipient.user_id },
    dispatchRecipients: resolved.recipients,
  });
};
