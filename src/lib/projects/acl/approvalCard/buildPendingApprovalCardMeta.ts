import type { AssistantConnectOrigin } from "@/lib/projects/acl/approvalCard/loadAssistantConnectOrigins";
import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";
import { resolveInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/resolveInitialProjectMembershipDeliveryMode";

/**
 * Pure: card meta for one request. Mode = the join writer's rule: the
 * request's own join_platform (093) first, then the invite platform, via the
 * S5 resolver. No membership exists before Approve, so no wake link yet.
 */
export const buildPendingApprovalCardMeta = (input: {
  readonly origin: AssistantConnectOrigin | undefined;
  readonly ownerPersonName: string | null;
  readonly joinPlatform: string | null;
  readonly invitePlatform: string | null;
  readonly expiresAt: string | null;
  readonly nowMs: number;
}): PendingApprovalCardMeta => {
  const expiresMs =
    input.expiresAt === null ? Number.NaN : Date.parse(input.expiresAt);
  const ownerClaimed = (input.origin?.ownerUserId ?? null) !== null;
  const platform = input.joinPlatform ?? input.invitePlatform;
  return {
    assistantKind: input.origin?.assistantKind ?? null,
    ownerClaimed,
    ownerPersonName: ownerClaimed ? input.ownerPersonName : null,
    connectVia: input.origin?.connectVia ?? null,
    expectedDeliveryMode: resolveInitialProjectMembershipDeliveryMode({
      platform,
      hasWakeLink: false,
    }),
    modeKnown: platform !== null,
    isExpired: Number.isFinite(expiresMs) && expiresMs <= input.nowMs,
  };
};
