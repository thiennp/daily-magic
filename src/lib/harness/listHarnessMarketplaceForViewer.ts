import { getUserById } from "@/lib/auth/userRepository";
import { canViewPublishedCapability } from "@/lib/capabilities/canViewPublishedCapability";
import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import { queryPublishedCapabilitiesWithHarnessForMarketplace } from "@/lib/harness/queryPublishedCapabilitiesWithHarnessForMarketplace";
import { enrichHarnessMarketplaceListingFromCatalog } from "@/lib/harness/enrichHarnessMarketplaceListingFromCatalog";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

export async function listHarnessMarketplaceForViewer(
  viewerUserId: string,
  onlineOwnerIds: ReadonlySet<string>,
): Promise<readonly HarnessMarketplaceListing[]> {
  const rows =
    await queryPublishedCapabilitiesWithHarnessForMarketplace(viewerUserId);

  const listings: HarnessMarketplaceListing[] = [];

  for (const row of rows) {
    const capability = mapPublishedCapabilityRow(row);
    const canView = await canViewPublishedCapability(
      viewerUserId,
      capability.ownerUserId,
      capability.visibility,
      capability.groupId,
    );

    if (!canView || capability.harnessSetSlug === null) {
      continue;
    }

    const owner = await getUserById(capability.ownerUserId);
    const catalogSummary = await enrichHarnessMarketplaceListingFromCatalog(
      viewerUserId,
      capability.ownerUserId,
      capability.harnessSetSlug,
    );

    listings.push({
      capabilityId: capability.id,
      ownerUserId: capability.ownerUserId,
      ownerEmail: owner?.email ?? capability.ownerUserId,
      ownerName: owner?.name ?? null,
      type: capability.type,
      name: capability.name,
      description: capability.description,
      exampleRequest: capability.exampleRequest,
      visibility: capability.visibility,
      workflowFields: capability.workflowFields,
      harnessSetSlug: capability.harnessSetSlug,
      harnessSetName: catalogSummary.harnessSetName,
      harnessItemCount: catalogSummary.harnessItemCount,
      isOnline: onlineOwnerIds.has(capability.ownerUserId),
      hostname: catalogSummary.hostname,
    });
  }

  return listings;
}
