"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import type { BorrowedMarketplaceListingState } from "@/features/marketplace/hooks/borrowedMarketplaceListingState.type";
import fetchBorrowedMarketplaceListing from "@/features/marketplace/hooks/fetchBorrowedMarketplaceListing";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

export function useMarketplaceState() {
  const { status } = useSession();
  const [remoteListings, setRemoteListings] = useState<
    readonly HarnessMarketplaceListing[]
  >([]);
  const [borrowed, setBorrowed] =
    useState<BorrowedMarketplaceListingState | null>(null);
  const [isLoadingRemote, setIsLoadingRemote] = useState(true);

  const listings = remoteListings;
  const isLoading = status === "loading" || isLoadingRemote;

  useEffect(() => {
    if (status === "loading") {
      setIsLoadingRemote(true);
      return;
    }

    if (status !== "authenticated") {
      setRemoteListings([]);
      setIsLoadingRemote(false);
      return;
    }

    let cancelled = false;
    void (async () => {
      setIsLoadingRemote(true);
      try {
        const response = await fetch("/api/harness/marketplace");
        if (!response.ok || cancelled) {
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
        if (!cancelled) {
          setIsLoadingRemote(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status]);

  const borrowListing = async (capabilityId: string): Promise<void> => {
    const borrow = await fetchBorrowedMarketplaceListing(capabilityId);
    if (borrow !== null) {
      setBorrowed(borrow);
    }
  };

  return { listings, borrowed, isLoading, borrowListing };
}
