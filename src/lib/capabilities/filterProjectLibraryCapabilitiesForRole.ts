import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

/** Owner: drafts + published. Member/viewer: published only. */
export const filterProjectLibraryCapabilitiesForRole = (
  capabilities: readonly PublishedCapabilityRecord[],
  role: ProjectPageActorRole,
): readonly PublishedCapabilityRecord[] => {
  if (role === "owner") {
    return capabilities;
  }
  return capabilities.filter(
    (capability) => capability.status === CapabilityStatus.PUBLISHED,
  );
};
