import { HarnessSharingVisibility } from "@/lib/harness/HarnessSharingVisibility.constant";
import type { HarnessSharingVisibilityValue } from "@/lib/harness/HarnessSharingVisibility.constant";
import { usersShareGroup } from "@/lib/dispatch/usersShareGroup";

export const canViewHarnessCatalog = async (
  viewerUserId: string,
  ownerUserId: string,
  visibility: HarnessSharingVisibilityValue,
): Promise<boolean> => {
  if (viewerUserId === ownerUserId) {
    return true;
  }

  if (visibility === HarnessSharingVisibility.PRIVATE) {
    return false;
  }

  if (visibility === HarnessSharingVisibility.PUBLIC) {
    return true;
  }

  const membership = await usersShareGroup(viewerUserId, ownerUserId);
  return membership.shared;
};
