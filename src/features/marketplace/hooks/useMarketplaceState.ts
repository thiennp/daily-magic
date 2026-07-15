"use client";

import { useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { demoHarnessMarketplaceListings } from "@/features/demo/mock/demoHarnessMarketplace";
import type { BorrowedMarketplaceListingState } from "@/features/marketplace/hooks/borrowedMarketplaceListingState.type";
import buildDemoBorrowedMarketplaceState from "@/features/marketplace/hooks/buildDemoBorrowedMarketplaceState";
import fetchBorrowedMarketplaceListing from "@/features/marketplace/hooks/fetchBorrowedMarketplaceListing";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";
import listPresetMarketplaceListings from "@/lib/marketplace/listPresetMarketplaceListings";

export function useMarketplaceState() {
  const demoPreview = useDemoPreview();
  const [remoteListings, setRemoteListings] = useState<
    readonly HarnessMarketplaceListing[]
  >([]);
  const [borrowed, setBorrowed] =
    useState<BorrowedMarketplaceListingState | null>(null);
  const [isLoadingRemote, setIsLoadingRemote] = useState(!demoPreview);

  const listings = demoPreview
    ? [...listPresetMarketplaceListings(), ...demoHarnessMarketplaceListings]
    : remoteListings;
  const isLoading = demoPreview ? false : isLoadingRemote;

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    void (async () => {
      try {
        const response = await fetch("/api/harness/marketplace");
        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();
        if (
          typeof data === "object" &&
          data !== null &&
          "listings" in data &&
          Array.isArray((data as { listings: unknown }).listings)
        ) {
          setRemoteListings(
            (data as { listings: HarnessMarketplaceListing[] }).listings,
          );
        }
      } finally {
        setIsLoadingRemote(false);
      }
    })();
  }, [demoPreview]);

  const borrowListing = async (capabilityId: string): Promise<void> => {
    if (demoPreview) {
      setBorrowed(buildDemoBorrowedMarketplaceState(capabilityId));
      return;
    }

    const borrow = await fetchBorrowedMarketplaceListing(capabilityId);
    if (borrow !== null) {
      setBorrowed(borrow);
    }
  };

  return { listings, borrowed, isLoading, borrowListing };
}
