"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { findMarketplaceListingByCapabilityId } from "@/features/marketplace/utils/findMarketplaceListingByCapabilityId";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

export const useMarketplaceInstallFromCapabilityIdQuery = (
  listings: readonly HarnessMarketplaceListing[],
  isLoading: boolean,
  onInstall: (listing: HarnessMarketplaceListing) => void,
): void => {
  const searchParams = useSearchParams();
  const capabilityId = searchParams.get("capabilityId")?.trim() ?? "";
  const openedCapabilityIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (isLoading || capabilityId.length === 0) {
      return;
    }

    if (openedCapabilityIdRef.current === capabilityId) {
      return;
    }

    const listing = findMarketplaceListingByCapabilityId(
      listings,
      capabilityId,
    );

    if (!listing) {
      return;
    }

    openedCapabilityIdRef.current = capabilityId;
    onInstall(listing);
  }, [capabilityId, isLoading, listings, onInstall]);
};
