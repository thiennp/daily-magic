import { canViewHarnessSet } from "@/lib/harness/harnessSetSharingQueries";
import { getHarnessCatalogSnapshot } from "@/lib/harness/harnessCatalogMutations";
import summarizeHarnessManifestSet from "@/lib/harness/summarizeHarnessManifestSet";

export const enrichHarnessMarketplaceListingFromCatalog = async (
  viewerUserId: string,
  ownerUserId: string,
  harnessSetSlug: string,
): Promise<{
  readonly harnessSetName: string | null;
  readonly harnessItemCount: number | null;
  readonly hostname: string | null;
}> => {
  const snapshot = await getHarnessCatalogSnapshot(ownerUserId);

  if (snapshot === null) {
    return {
      harnessSetName: null,
      harnessItemCount: null,
      hostname: null,
    };
  }

  const canViewSet = await canViewHarnessSet(
    viewerUserId,
    ownerUserId,
    harnessSetSlug,
  );

  if (!canViewSet) {
    return {
      harnessSetName: null,
      harnessItemCount: null,
      hostname: null,
    };
  }

  const summary = summarizeHarnessManifestSet(
    snapshot.manifestJson,
    harnessSetSlug,
  );

  return {
    harnessSetName: summary.setName,
    harnessItemCount: summary.itemCount,
    hostname: snapshot.hostname,
  };
};
