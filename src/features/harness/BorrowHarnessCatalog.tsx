"use client";

import { useEffect, useState } from "react";

import BorrowedHarnessPreview from "@/features/harness/BorrowedHarnessPreview";
import HarnessCatalogList, {
  type HarnessCatalogItem,
} from "@/features/harness/HarnessCatalogList";

interface BorrowedHarness {
  readonly ownerEmail: string;
  readonly hostname: string;
  readonly manifest: Readonly<Record<string, unknown>>;
}

export default function BorrowHarnessCatalog() {
  const [entries, setEntries] = useState<readonly HarnessCatalogItem[]>([]);
  const [borrowed, setBorrowed] = useState<BorrowedHarness | null>(null);
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
      typeof data === "object" &&
      data !== null &&
      "borrow" in data &&
      typeof (data as { borrow: BorrowedHarness }).borrow === "object"
    ) {
      const borrow = (
        data as {
          borrow: BorrowedHarness & { manifest: Record<string, unknown> };
        }
      ).borrow;
      setBorrowed({
        ownerEmail: borrow.ownerEmail,
        hostname: borrow.hostname,
        manifest: borrow.manifest,
      });
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Borrow harness
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Browse harness catalogs shared by online teammates or recent snapshots
        from your groups.
      </p>

      <HarnessCatalogList
        entries={entries}
        isLoading={isLoading}
        onBorrow={(ownerUserId) => {
          void borrowHarness(ownerUserId);
        }}
      />

      {borrowed !== null ? (
        <BorrowedHarnessPreview
          ownerEmail={borrowed.ownerEmail}
          hostname={borrowed.hostname}
          manifest={borrowed.manifest}
        />
      ) : null}
    </section>
  );
}
