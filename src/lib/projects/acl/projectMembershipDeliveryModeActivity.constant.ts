import type { ProjectMembershipDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";

/** Product EN (S5) Activity lines for a delivery_mode switch. `{name}` = nickname. */
export const PROJECT_DELIVERY_MODE_ACTIVITY_COPY = {
  ownerToPoll: "You switched {name} to checks on demand",
  ownerToWebhook: "You switched {name} to wakes up on its own",
  memberToPoll: "{name} switched to checks on demand",
  memberToWebhook: "{name} now wakes up on its own",
  nameFallback: "this assistant",
} as const;

export const formatProjectDeliveryModeActivity = (input: {
  readonly by: "owner" | "member";
  readonly deliveryMode: ProjectMembershipDeliveryMode;
  readonly name: string | null;
}): string => {
  const copy = PROJECT_DELIVERY_MODE_ACTIVITY_COPY;
  const poll = input.deliveryMode === "poll";
  const template =
    input.by === "owner"
      ? poll
        ? copy.ownerToPoll
        : copy.ownerToWebhook
      : poll
        ? copy.memberToPoll
        : copy.memberToWebhook;
  const trimmed = input.name?.trim() ?? "";
  const filled = template.replaceAll(
    "{name}",
    trimmed.length > 0 ? trimmed : copy.nameFallback,
  );
  return filled.charAt(0).toUpperCase() + filled.slice(1);
};
