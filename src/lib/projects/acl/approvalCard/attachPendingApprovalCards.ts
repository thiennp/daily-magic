import { buildPendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/buildPendingApprovalCardMeta";
import { loadAssistantConnectOrigins } from "@/lib/projects/acl/approvalCard/loadAssistantConnectOrigins";
import { loadProjectInvitePlatforms } from "@/lib/projects/acl/approvalCard/loadProjectInvitePlatforms";
import type { PendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/PendingApprovalCardMeta.type";
import type { PendingRequestView } from "@/lib/projects/acl/buildProjectAccessViews";
import { loadUserProfilesByIds } from "@/lib/projects/acl/isAgentUser";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";

export type PendingRequestCardView = PendingRequestView & {
  /** Assistant requesters only; null for people. */
  readonly approvalCard: PendingApprovalCardMeta | null;
};

/** Owner-only: add who / kind / owner person / mode / expired to each request. */
export const attachPendingApprovalCards = async (input: {
  readonly views: readonly PendingRequestView[];
  readonly records: readonly ProjectAccessRequestRecord[];
  readonly nowMs?: number;
}): Promise<readonly PendingRequestCardView[]> => {
  const agentIds = input.views
    .filter((view) => view.requesterIsAgent)
    .map((view) => view.requesterUserId);
  const inviteIds = input.records
    .map((record) => record.inviteId)
    .filter((id): id is string => id !== null);
  const [origins, platforms] = await Promise.all([
    loadAssistantConnectOrigins(agentIds),
    loadProjectInvitePlatforms(inviteIds),
  ]);
  const ownerIds = [...origins.values()]
    .map((origin) => origin.ownerUserId)
    .filter((id): id is string => id !== null);
  const owners = await loadUserProfilesByIds([...new Set(ownerIds)]);
  const nowMs = input.nowMs ?? Date.now();
  return input.views.map((view) => {
    if (!view.requesterIsAgent) return { ...view, approvalCard: null };
    const record = input.records.find((r) => r.id === view.id);
    const origin = origins.get(view.requesterUserId);
    const inviteId = record?.inviteId ?? null;
    const ownerId = origin?.ownerUserId ?? null;
    return {
      ...view,
      approvalCard: buildPendingApprovalCardMeta({
        origin,
        ownerPersonName:
          ownerId === null ? null : (owners.get(ownerId)?.name ?? null),
        joinPlatform: record?.joinPlatform ?? null,
        invitePlatform:
          inviteId === null ? null : (platforms.get(inviteId) ?? null),
        expiresAt: view.expiresAt,
        nowMs,
      }),
    };
  });
};
