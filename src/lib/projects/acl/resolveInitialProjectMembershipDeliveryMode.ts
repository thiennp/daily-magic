import {
  PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL,
  PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK,
  type ProjectMembershipDeliveryMode,
} from "@/lib/projects/acl/membershipDeliveryMode.constant";
import { PROJECT_MEMBERSHIP_WAKE_DEFAULT_PLATFORMS } from "@/lib/projects/acl/projectMembershipDeliveryModeGuidance.constant";

/**
 * Connect-time mode, called on join (approveProjectAccessRequest → redeem,
 * owner approve, auto-approve). A wake link always wins (webhook). An explicit
 * no-wake choice → poll. Grok (owner adds the wake link after join) → webhook so
 * "Waiting for wake link" shows. Any other named platform → poll. No platform
 * (legacy invite / access request) → webhook: Grok is the default invite, and
 * the display rule still never claims wake without a link.
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
  if (platform === "") {
    return PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK;
  }
  return PROJECT_MEMBERSHIP_WAKE_DEFAULT_PLATFORMS.includes(platform)
    ? PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK
    : PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL;
};
