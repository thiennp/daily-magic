import type { HarnessSharingVisibilityValue } from "@/lib/harness/HarnessSharingVisibility.constant";

export default interface HarnessCatalogEntry {
  readonly ownerUserId: string;
  readonly visibility: HarnessSharingVisibilityValue;
  readonly hostname: string;
  readonly manifestJson: Readonly<Record<string, unknown>>;
  readonly reportedAt: string;
  readonly updatedAt: string;
}
