import { CapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";
import type { CapabilityVisibilityValue } from "@/lib/capabilities/CapabilityVisibility.constant";
import { usersShareGroup } from "@/lib/dispatch/usersShareGroup";

export const canViewPublishedCapability = async (
  viewerUserId: string,
  ownerUserId: string,
  visibility: CapabilityVisibilityValue,
  groupId?: string | null,
): Promise<boolean> => {
  if (viewerUserId === ownerUserId) {
    return true;
  }

  if (visibility === CapabilityVisibility.PRIVATE) {
    return false;
  }

  if (visibility === CapabilityVisibility.PUBLIC) {
    return true;
  }

  const membership = await usersShareGroup(
    viewerUserId,
    ownerUserId,
    groupId ?? null,
  );
  return membership.shared;
};
