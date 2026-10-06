import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

export const formatMarketplaceListCardMeta = (
  listing: HarnessMarketplaceListing,
): string => {
  const minutes = listing.usageGuide.estimatedMinutes;
  const timeSuffix = minutes !== undefined ? `~${minutes} min · ` : "";

  if (listing.isOfficialPreset) {
    return `${timeSuffix}${MAC_WORKER_BENEFIT_COPY.runsOnMacMeta}`;
  }

  const owner = listing.ownerName ?? listing.ownerEmail;
  const onlineSuffix = listing.isOnline ? " · online" : "";
  return `${timeSuffix}${owner}${onlineSuffix}`;
};
