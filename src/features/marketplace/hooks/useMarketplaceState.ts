"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import type { BorrowedMarketplaceListingState } from "@/features/marketplace/hooks/borrowedMarketplaceListingState.type";
import fetchBorrowedMarketplaceListing from "@/features/marketplace/hooks/fetchBorrowedMarketplaceListing";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

const AUTHED_KEY = "authed";

const NO_LISTINGS: readonly HarnessMarketplaceListing[] = [];

export function useMarketplaceState() {
  const { status } = useSession();
  const [remoteListings, setRemoteListings] =
    useState<readonly HarnessMarketplaceListing[]>(NO_LISTINGS);
  const [borrowed, setBorrowed] =
    useState<BorrowedMarketplaceListingState | null>(null);
  /** Set only after the authenticated fetch settles (never synchronously in the effect). */
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const authKey = status === "authenticated" ? AUTHED_KEY : status;
  const listings = status === "authenticated" ? remoteListings : NO_LISTINGS;
  const isLoading =
    status === "loading" ||
    (status === "authenticated" && loadedKey !== authKey);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const cancelledRef = { current: false };
    void (async () => {
      try {
        const response = await fetch("/api/harness/marketplace");
        if (cancelledRef.current) {
          return;
        }
        if (!response.ok) {
          setLoadFailed(true);
          return;
        }

        const data: unknown = await response.json();
        if (cancelledRef.current) {
          return;
        }

        if (
          typeof data === "object" &&
          data !== null &&
          "listings" in data &&
          Array.isArray((data as { listings: unknown }).listings)
        ) {
          setRemoteListings(
            (data as { listings: HarnessMarketplaceListing[] }).listings,
          );
          setLoadFailed(false);
        } else {
          setLoadFailed(true);
        }
      } catch {
        if (!cancelledRef.current) {
          setLoadFailed(true);
        }
      } finally {
        if (!cancelledRef.current) {
          setLoadedKey(AUTHED_KEY);
        }
      }
    })();

    return () => {
      cancelledRef.current = true;
    };
  }, [status, attempt]);

  const retry = (): void => {
    setLoadedKey(null);
    setLoadFailed(false);
    setAttempt((value) => value + 1);
  };

  const borrowListing = async (capabilityId: string): Promise<void> => {
    const borrow = await fetchBorrowedMarketplaceListing(capabilityId);
    if (borrow !== null) {
      setBorrowed(borrow);
    }
  };

  return { listings, borrowed, isLoading, loadFailed, retry, borrowListing };
}
