"use client";

import BorrowHarnessImportActions from "@/features/marketplace/BorrowHarnessImportActions";
import MarketplaceListingPreview from "@/features/marketplace/MarketplaceListingPreview";
import SaveCapabilityToLibraryActions from "@/features/marketplace/SaveCapabilityToLibraryActions";
import type { BorrowedMarketplaceListingState } from "@/features/marketplace/hooks/borrowedMarketplaceListingState.type";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/types/UseAgentWitchHarnessSocketResult.type";
import { parsePresetMarketplaceTemplateId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

interface MarketplaceBorrowPreviewProps {
  readonly borrowed: BorrowedMarketplaceListingState;
  readonly harnessSocket: UseAgentWitchHarnessSocketResult;
  readonly macConnected: boolean;
}

export default function MarketplaceBorrowPreview({
  borrowed,
  harnessSocket,
  macConnected,
}: MarketplaceBorrowPreviewProps) {
  return (
    <>
      <MarketplaceListingPreview
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
        isOfficialPreset={borrowed.isOfficialPreset}
      />
      <BorrowHarnessImportActions
        isOnline={borrowed.isOnline}
        isOfficialPreset={borrowed.isOfficialPreset}
        macConnected={macConnected}
        activeSetSlugs={borrowed.activeSetSlugs}
        importStatus={harnessSocket.borrowImportStatus}
        importMessage={harnessSocket.borrowImportMessage}
        onImport={() => {
          if (borrowed.isOfficialPreset) {
            const templateId =
              borrowed.templateId ??
              parsePresetMarketplaceTemplateId(borrowed.capabilityId);

            if (templateId === null) {
              return;
            }

            void harnessSocket.installOfficialPresetHarness(templateId);
            return;
          }

          harnessSocket.requestBorrowedHarnessExport(
            borrowed.ownerUserId,
            borrowed.activeSetSlugs,
          );
        }}
      />
    </>
  );
}
