"use client";

import MarketplaceListingPreview from "@/features/marketplace/MarketplaceListingPreview";
import SaveCapabilityToLibraryActions from "@/features/marketplace/SaveCapabilityToLibraryActions";
import type { BorrowedMarketplaceListingState } from "@/features/marketplace/hooks/borrowedMarketplaceListingState.type";

interface MarketplaceBorrowPreviewProps {
  readonly borrowed: BorrowedMarketplaceListingState;
}

export default function MarketplaceBorrowPreview({
  borrowed,
}: MarketplaceBorrowPreviewProps) {
  return (
    <>
      <MarketplaceListingPreview
        type={borrowed.type}
        name={borrowed.name}
        description={borrowed.description}
        exampleRequest={borrowed.exampleRequest}
        workflowFields={borrowed.workflowFields}
        usageGuide={borrowed.usageGuide}
        ownerEmail={borrowed.ownerEmail}
        ownerName={borrowed.ownerName}
        hostname={borrowed.hostname}
      />
      <SaveCapabilityToLibraryActions
        capabilityId={borrowed.capabilityId}
        sourceOwnerLabel={borrowed.ownerName ?? borrowed.ownerEmail}
        isOfficialPreset={borrowed.isOfficialPreset}
      />
    </>
  );
}
