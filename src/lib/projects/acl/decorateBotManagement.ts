import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";
import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";

/**
 * Mark each assistant seat the viewer may manage (owner, or the member who
 * invited it). The inviter id itself never leaves the server.
 */
export const decorateBotManagement = (
  members: readonly MembershipView[],
  viewer: { readonly userId: string; readonly isOwner: boolean },
): readonly MembershipView[] =>
  members.map(({ invitedByUserId, ...m }) =>
    m.memberKind === "bot"
      ? {
          ...m,
          canManageBot: viewer.isOwner || invitedByUserId === viewer.userId,
          guidanceOutdated:
            (m.guidanceSeenVersion ?? 0) <
            PRODUCT_CONNECT_UPDATES_CATALOG_VERSION,
        }
      : m,
  );
