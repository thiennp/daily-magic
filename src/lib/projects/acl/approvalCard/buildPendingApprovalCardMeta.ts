import type { AssistantConnectOrigin } from "@/lib/projects/acl/approvalCard/loadAssistantConnectOrigins";
import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";
import { resolveInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/resolveInitialProjectMembershipDeliveryMode";

/** Pure: card meta for one request (no wake link exists before Approve). */
export const buildPendingApprovalCardMeta = (input: {
  readonly origin: AssistantConnectOrigin | undefined;
  readonly ownerPersonName: string | null;
  readonly invitePlatform: string | null;
  readonly expiresAt: string | null;
  readonly nowMs: number;
}): PendingApprovalCardMeta => {
  const expiresMs =
    input.expiresAt === null ? Number.NaN : Date.parse(input.expiresAt);
  const ownerClaimed = (input.origin?.ownerUserId ?? null) !== null;
  return {
    assistantKind: input.origin?.assistantKind ?? null,
    ownerClaimed,
    ownerPersonName: ownerClaimed ? input.ownerPersonName : null,
    connectVia: input.origin?.connectVia ?? null,
    expectedDeliveryMode: resolveInitialProjectMembershipDeliveryMode({
      platform: input.invitePlatform,
      hasWakeLink: false,
    }),
    modeKnown: input.invitePlatform !== null,
    isExpired: Number.isFinite(expiresMs) && expiresMs <= input.nowMs,
  };
};
