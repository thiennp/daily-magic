"use client";

import { useEffect, useState } from "react";

import type { HarnessCatalogItem } from "@/features/harness/HarnessCatalogList";

export interface BorrowedHarnessState {
  readonly ownerUserId: string;
  readonly ownerEmail: string;
  readonly hostname: string;
  readonly isOnline: boolean;
  readonly activeSetSlugs: readonly string[];
  readonly manifest: Readonly<Record<string, unknown>>;
}

export function useBorrowHarnessCatalogState() {
  const [entries, setEntries] = useState<readonly HarnessCatalogItem[]>([]);
  const [borrowed, setBorrowed] = useState<BorrowedHarnessState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/harness/catalog");
        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();
        if (
          typeof data === "object" &&
          data !== null &&
          "entries" in data &&
          Array.isArray((data as { entries: unknown }).entries)
        ) {
          setEntries((data as { entries: HarnessCatalogItem[] }).entries);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const borrowHarness = async (ownerUserId: string): Promise<void> => {
    const response = await fetch(`/api/harness/catalog/${ownerUserId}`);
    if (!response.ok) {
      return;
    }

    const data: unknown = await response.json();
    if (
      typeof data !== "object" ||
      data === null ||
      !("borrow" in data) ||
      typeof (data as { borrow: BorrowedHarnessState }).borrow !== "object"
    ) {
      return;
    }

    const borrow = (data as { borrow: BorrowedHarnessState }).borrow;
    const activeSetSlugs = Array.isArray(borrow.manifest.activeSetSlugs)
      ? borrow.manifest.activeSetSlugs.filter(
          (slug): slug is string => typeof slug === "string",
        )
      : [];

    setBorrowed({
      ownerUserId: borrow.ownerUserId,
      ownerEmail: borrow.ownerEmail,
      hostname: borrow.hostname,
      isOnline: borrow.isOnline,
      activeSetSlugs,
      manifest: borrow.manifest,
    });
  };

  return { entries, borrowed, isLoading, borrowHarness };
}
