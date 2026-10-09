import { PRODUCT_CONNECT_UPDATES_CATALOG_VERSION } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";
import { dispatchProjectMessageFromHumanMember } from "@/lib/projects/acl/messaging/dispatchProjectMessageFromHumanMember";
import { dispatchProjectMessageFromOwner } from "@/lib/projects/acl/messaging/dispatchProjectMessageFromOwner";
import { resolveBotManager } from "@/lib/projects/acl/resolveBotManager";

export const GUIDANCE_UPDATE_KIND = "guidance.update";

/** One thin message asking the assistant to fetch and apply the new guidance. */
export const buildGuidanceUpdateSummary = (seen: number | null): string =>
  `New AgentWitch guidance (catalog ${PRODUCT_CONNECT_UPDATES_CATALOG_VERSION}). Call check_product_updates { "sinceCatalogVersion": ${seen ?? 0} }, adapt from entries[].adapt, then ack.`;

/** Owner or inviter sends new guidance to an assistant that has not fetched it yet. */
export const sendBotGuidanceUpdate = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly actorUserId: string;
}) => {
  const manager = await resolveBotManager(input);
  if (!manager.ok) return manager;
  const args = {
    toMembershipId: input.membershipId,
    kind: GUIDANCE_UPDATE_KIND,
    summary: buildGuidanceUpdateSummary(
      manager.bot.guidanceSeenVersion ?? null,
    ),
  };
  return manager.isOwner
    ? dispatchProjectMessageFromOwner({
        projectId: input.projectId,
        ownerUserId: input.actorUserId,
        args,
      })
    : dispatchProjectMessageFromHumanMember({
        projectId: input.projectId,
        actorUserId: input.actorUserId,
        args,
      });
};
