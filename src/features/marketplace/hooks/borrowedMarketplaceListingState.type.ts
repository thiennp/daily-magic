import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

export interface BorrowedMarketplaceListingState {
  readonly capabilityId: string;
  readonly type: HarnessMarketplaceListing["type"];
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly workflowFields: HarnessMarketplaceListing["workflowFields"];
  readonly ownerUserId: string;
  readonly ownerEmail: string;
  readonly ownerName: string | null;
  readonly hostname: string;
  readonly isOnline: boolean;
  readonly harnessSetSlug: string;
  readonly harnessSetName: string | null;
  readonly harnessItemPaths: readonly string[];
  readonly activeSetSlugs: readonly string[];
  readonly manifest: Readonly<Record<string, unknown>>;
  readonly isOfficialPreset?: boolean;
  readonly templateId?: string;
}
