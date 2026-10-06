import { isProjectMembershipPollDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";
import { isProjectMessageReadOnlyRole } from "@/lib/projects/acl/messaging/decideProjectMessagePostAccess";
import {
  PROJECT_BRIEFING_HOW_TO_DISPATCH,
  PROJECT_BRIEFING_VIEWER_READ_ONLY,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL } from "@/lib/projects/acl/projectBriefingPollDelivery.constant";

/**
 * Viewer → read-only copy. Owner / member → dispatch steps: the wake
 * (webhook) briefing by default, the on-demand briefing for delivery_mode=poll.
 */
export const selectProjectBriefingHowToDispatch = (
  role: string | null | undefined,
  deliveryMode?: string | null,
): string => {
  if (isProjectMessageReadOnlyRole(role)) {
    return PROJECT_BRIEFING_VIEWER_READ_ONLY;
  }
  return isProjectMembershipPollDeliveryMode(deliveryMode)
    ? PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL
    : PROJECT_BRIEFING_HOW_TO_DISPATCH;
};
