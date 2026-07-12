import { getUserById } from "@/lib/auth/userRepository";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { filterBorrowableManifestToSetSlugs } from "@/lib/harness/filterBorrowableManifest";
import type HarnessCatalogEntry from "@/lib/harness/types/HarnessCatalogEntry.type";
import summarizeHarnessManifestSet from "@/lib/harness/summarizeHarnessManifestSet";

export interface HarnessMarketplaceBorrowPayload {
  readonly capabilityId: string;
  readonly type: PublishedCapabilityRecord["type"];
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly workflowFields: PublishedCapabilityRecord["workflowFields"];
  readonly ownerUserId: string;
  readonly ownerEmail: string;
  readonly ownerName: string | null;
  readonly hostname: string;
  readonly visibility: string;
  readonly reportedAt: string;
  readonly isOnline: boolean;
  readonly harnessSetSlug: string;
  readonly harnessSetName: string | null;
  readonly harnessItemPaths: readonly string[];
  readonly activeSetSlugs: readonly string[];
  readonly manifest: Readonly<Record<string, unknown>>;
}

export async function buildHarnessMarketplaceBorrowPayload(
  capability: PublishedCapabilityRecord,
  snapshot: HarnessCatalogEntry,
  viewerUserId: string,
  isOnline: boolean,
): Promise<HarnessMarketplaceBorrowPayload> {
  const owner = await getUserById(capability.ownerUserId);
  const harnessSetSlug = capability.harnessSetSlug ?? "";
  const manifest = await filterBorrowableManifestToSetSlugs(
    snapshot.manifestJson,
    viewerUserId,
    capability.ownerUserId,
    snapshot.visibility,
    [harnessSetSlug],
  );
  const setSummary = summarizeHarnessManifestSet(manifest, harnessSetSlug);

  return {
    capabilityId: capability.id,
    type: capability.type,
    name: capability.name,
    description: capability.description,
    exampleRequest: capability.exampleRequest,
    workflowFields: capability.workflowFields,
    ownerUserId: capability.ownerUserId,
    ownerEmail: owner?.email ?? capability.ownerUserId,
    ownerName: owner?.name ?? null,
    hostname: snapshot.hostname,
    visibility: snapshot.visibility,
    reportedAt: snapshot.reportedAt,
    isOnline,
    harnessSetSlug,
    harnessSetName: setSummary.setName,
    harnessItemPaths: setSummary.itemPaths,
    activeSetSlugs: [harnessSetSlug],
    manifest,
  };
}
