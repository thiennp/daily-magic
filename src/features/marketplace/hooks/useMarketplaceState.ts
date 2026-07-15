"use client";

import { useEffect, useState } from "react";

import type { BorrowedMarketplaceListingState } from "@/features/marketplace/hooks/borrowedMarketplaceListingState.type";
import fetchBorrowedMarketplaceListing from "@/features/marketplace/hooks/fetchBorrowedMarketplaceListing";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

export function useMarketplaceState() {
  const [remoteListings, setRemoteListings] = useState<
    readonly HarnessMarketplaceListing[]
  >([]);
  const [borrowed, setBorrowed] =
    useState<BorrowedMarketplaceListingState | null>(null);
  const [isLoadingRemote, setIsLoadingRemote] = useState(true);

  const listings = remoteListings;
  const isLoading = isLoadingRemote;

  useEffect(() => {
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
  }, []);

  const borrowListing = async (capabilityId: string): Promise<void> => {
    const borrow = await fetchBorrowedMarketplaceListing(capabilityId);
    if (borrow !== null) {
      setBorrowed(borrow);
    }
  };

  return { listings, borrowed, isLoading, borrowListing };
}
