import {
  PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL,
  PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK,
  type ProjectMembershipDeliveryMode,
} from "@/lib/projects/acl/membershipDeliveryMode.constant";
import { PROJECT_MEMBERSHIP_POLL_DEFAULT_PLATFORMS } from "@/lib/projects/acl/projectMembershipDeliveryModeGuidance.constant";

/**
 * Connect-time mode for Invite / device-connect writers. A wake link always
 * wins (webhook). An explicit no-wake choice or a platform with unknown wake
 * (Copilot Studio) starts in poll. Everything else keeps the webhook default.
 */
export const resolveInitialProjectMembershipDeliveryMode = (input: {
  readonly platform?: string | null;
  readonly hasWakeLink?: boolean;
  readonly noWakeChosen?: boolean;
}): ProjectMembershipDeliveryMode => {
  if (input.hasWakeLink === true) {
    return PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK;
  }
  if (input.noWakeChosen === true) {
    return PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL;
  }
  const platform = input.platform?.trim().toLowerCase() ?? "";
  return PROJECT_MEMBERSHIP_POLL_DEFAULT_PLATFORMS.includes(platform)
    ? PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL
    : PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK;
};
