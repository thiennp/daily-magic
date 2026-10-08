import {
  attachPendingApprovalCards,
  type PendingRequestCardView,
} from "@/lib/projects/acl/approvalCard/attachPendingApprovalCards";
import { listRecentlyExpiredProjectAccessRequests } from "@/lib/projects/acl/approvalCard/listRecentlyExpiredProjectAccessRequests";
import { buildPendingRequestViews } from "@/lib/projects/acl/buildProjectAccessViews";
import { listPendingWakeLinkRequestIds } from "@/lib/projects/acl/webhooks/listPendingWakeLinkRequestIds";
import { listPendingProjectAccessRequests } from "@/lib/projects/acl/listPendingProjectAccessRequests";

/** Owner Access snapshot: live pending cards + recently expired cards. */
export const buildOwnerPendingAccessViews = async (
  projectId: string,
): Promise<{
  readonly pendingRequests: readonly PendingRequestCardView[];
  readonly expiredRequests: readonly PendingRequestCardView[];
}> => {
  const [pending, expired] = await Promise.all([
    listPendingProjectAccessRequests(projectId),
    listRecentlyExpiredProjectAccessRequests(projectId),
  ]);
  const [pendingViews, expiredViews] = await Promise.all([
    buildPendingRequestViews(pending),
    buildPendingRequestViews(expired),
  ]);
  const [cards, expiredRequests, wakeReady] = await Promise.all([
    attachPendingApprovalCards({ views: pendingViews, records: pending }),
    attachPendingApprovalCards({ views: expiredViews, records: expired }),
    listPendingWakeLinkRequestIds(projectId).catch(() => new Set<string>()),
  ]);
  const pendingRequests = cards.map((card) => ({
    ...card,
    wakeLinkSet: wakeReady.has(card.id),
  }));
  return { pendingRequests, expiredRequests };
};
