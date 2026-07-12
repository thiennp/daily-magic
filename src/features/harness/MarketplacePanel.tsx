"use client";

import BorrowHarnessImportActions from "@/features/harness/BorrowHarnessImportActions";
import HarnessMarketplaceList from "@/features/harness/HarnessMarketplaceList";
import HarnessMarketplaceListingPreview from "@/features/harness/HarnessMarketplaceListingPreview";
import SaveCapabilityToLibraryActions from "@/features/harness/SaveCapabilityToLibraryActions";
import { useAgentWitchHarnessSocket } from "@/features/harness/hooks/useAgentWitchHarnessSocket";
import { useHarnessMarketplaceState } from "@/features/harness/hooks/useHarnessMarketplaceState";

type MarketplacePanelVariant = "embedded" | "page";

interface MarketplacePanelProps {
  readonly variant?: MarketplacePanelVariant;
}

export default function MarketplacePanel({
  variant = "embedded",
}: MarketplacePanelProps) {
  const harnessSocket = useAgentWitchHarnessSocket();
  const { listings, borrowed, isLoading, borrowListing } =
    useHarnessMarketplaceState();

  const list = (
    <HarnessMarketplaceList
      listings={listings}
      isLoading={isLoading}
      onBorrow={(capabilityId) => {
        void borrowListing(capabilityId);
      }}
    />
  );

  const preview =
    borrowed !== null ? (
      <>
        <HarnessMarketplaceListingPreview
          type={borrowed.type}
          name={borrowed.name}
          description={borrowed.description}
          exampleRequest={borrowed.exampleRequest}
          workflowFields={borrowed.workflowFields}
          ownerEmail={borrowed.ownerEmail}
          ownerName={borrowed.ownerName}
          hostname={borrowed.hostname}
          harnessSetSlug={borrowed.harnessSetSlug}
          harnessSetName={borrowed.harnessSetName}
          harnessItemPaths={borrowed.harnessItemPaths}
        />
        <SaveCapabilityToLibraryActions
          capabilityId={borrowed.capabilityId}
          sourceOwnerLabel={borrowed.ownerName ?? borrowed.ownerEmail}
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
    ) : null;

  if (variant === "page") {
    return (
      <div
        className={
          borrowed !== null
            ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start"
            : undefined
        }
      >
        <div>{list}</div>
        {preview}
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Marketplace
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Browse agents and workflows shared by teammates. Save a copy to your
        library or install the linked rules bundle on your Mac.
      </p>
      {list}
      {preview}
    </section>
  );
}
