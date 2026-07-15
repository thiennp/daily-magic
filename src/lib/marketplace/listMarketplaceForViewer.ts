import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";
import { listHarnessMarketplaceForViewer } from "@/lib/harness/listHarnessMarketplaceForViewer";
import listPresetMarketplaceListings from "@/lib/marketplace/listPresetMarketplaceListings";

export async function listMarketplaceForViewer(
  viewerUserId: string,
  onlineOwnerIds: ReadonlySet<string>,
): Promise<readonly HarnessMarketplaceListing[]> {
  const presets = listPresetMarketplaceListings();
  const teammateListings = await listHarnessMarketplaceForViewer(
    viewerUserId,
    onlineOwnerIds,
  );

  return [...presets, ...teammateListings];
}
