import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";
import { canEditAssistant } from "@/lib/projects/acl/authorizeMembershipEdit";
import { canViewerMessageBot } from "@/lib/projects/acl/messaging/canViewerMessageBot";
import type { MembershipView } from "@/lib/projects/acl/buildProjectAccessViews";

/**
 * Mark each assistant seat the viewer may edit (the person who invited it;
 * the owner only for their own or seats with no recorded inviter). The inviter id itself never leaves the server.
 */
export const decorateBotManagement = (
  members: readonly MembershipView[],
  viewer: { readonly userId: string; readonly isOwner: boolean },
): readonly MembershipView[] =>
  members.map(({ invitedByUserId, ...m }) =>
    m.memberKind === "bot"
      ? {
          ...m,
          canManageBot: canEditAssistant({
            actorUserId: viewer.userId,
            isOwner: viewer.isOwner,
            invitedBy: invitedByUserId ?? null,
            ownerMayOverride: false,
          }),
          canMessage: canViewerMessageBot(
            {
              closed: m.closedToOthers === true,
              invitedByUserId: invitedByUserId ?? null,
            },
            viewer.userId,
          ),
          guidanceOutdated:
            (m.guidanceSeenVersion ?? 0) <
            PRODUCT_CONNECT_UPDATES_CATALOG_VERSION,
        }
      : m,
  );
