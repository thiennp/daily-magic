import { getUserById } from "@/lib/auth/userRepository";
import { canViewPublishedCapability } from "@/lib/capabilities/canViewPublishedCapability";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";
import mapPublishedCapabilityRow from "@/lib/capabilities/mapPublishedCapabilityRow";
import { canViewHarnessSet } from "@/lib/harness/harnessSetSharingQueries";
import { getHarnessCatalogSnapshot } from "@/lib/harness/harnessCatalogMutations";
import summarizeHarnessManifestSet from "@/lib/harness/summarizeHarnessManifestSet";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";
import { asRowArray, getSql } from "@/lib/db";

const enrichListingFromCatalog = async (
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

export async function listHarnessMarketplaceForViewer(
  viewerUserId: string,
  onlineOwnerIds: ReadonlySet<string>,
): Promise<readonly HarnessMarketplaceListing[]> {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM published_capabilities
      WHERE status = ${CapabilityStatus.PUBLISHED}
        AND visibility <> ${CapabilityVisibility.PRIVATE}
        AND harness_set_slug IS NOT NULL
        AND owner_user_id <> ${viewerUserId}
      ORDER BY name ASC
    `,
  );

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
    const catalogSummary = await enrichListingFromCatalog(
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
