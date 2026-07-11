"use client";

import BorrowedHarnessPreview from "@/features/harness/BorrowedHarnessPreview";
import BorrowHarnessImportActions from "@/features/harness/BorrowHarnessImportActions";
import HarnessCatalogList from "@/features/harness/HarnessCatalogList";
import { useAgentWitchHarnessSocket } from "@/features/harness/hooks/useAgentWitchHarnessSocket";
import { useBorrowHarnessCatalogState } from "@/features/harness/hooks/useBorrowHarnessCatalogState";

export default function BorrowHarnessCatalog() {
  const harnessSocket = useAgentWitchHarnessSocket();
  const { entries, borrowed, isLoading, borrowHarness } =
    useBorrowHarnessCatalogState();

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
        <>
          <BorrowedHarnessPreview
            ownerEmail={borrowed.ownerEmail}
            hostname={borrowed.hostname}
            manifest={borrowed.manifest}
          />
          <BorrowHarnessImportActions
            ownerUserId={borrowed.ownerUserId}
            isOnline={borrowed.isOnline}
            activeSetSlugs={borrowed.activeSetSlugs}
            importStatus={harnessSocket.borrowImportStatus}
            importMessage={harnessSocket.borrowImportMessage}
            onImport={() => {
              harnessSocket.requestBorrowedHarnessExport(
                borrowed.ownerUserId,
                borrowed.activeSetSlugs,
              );
            }}
          />
        </>
      ) : null}
    </section>
  );
}
