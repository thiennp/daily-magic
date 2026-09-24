"use client";

import { useMarketplaceInstallModalContent } from "@/features/marketplace/hooks/useMarketplaceInstallModalContent";
import MarketplaceInstallFormPanel from "@/features/marketplace/MarketplaceInstallFormPanel";
import MarketplaceInstallSuccessPanel from "@/features/marketplace/MarketplaceInstallSuccessPanel";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceInstallModalContentProps {
  readonly listing: HarnessMarketplaceListing;
  readonly onClose: () => void;
}

export default function MarketplaceInstallModalContent({
  listing,
  onClose,
}: MarketplaceInstallModalContentProps) {
  const state = useMarketplaceInstallModalContent({ listing, onClose });

  if (state.status === "done") {
    return (
      <MarketplaceInstallSuccessPanel
        listingName={state.listingName}
        message={state.message ?? "Saved to your library."}
        canStartTask={state.libraryCapabilityId !== null}
        onStartTask={state.handleStartTask}
        onClose={onClose}
      />
    );
  }

  return (
    <MarketplaceInstallFormPanel
      listingName={state.listingName}
      projects={state.projects}
      isProjectsLoading={state.isProjectsLoading}
      selectedProjectId={state.selectedProjectId}
      onSelectProjectId={state.setSelectedProjectId}
      macSelection={state.macSelection}
      localHostname={state.localHostname}
      localTokenHash={state.localTokenHash}
      isWakeServerReachable={state.isWakeServerReachable}
      needsLiveConnection={state.needsLiveConnection}
      status={state.status}
      message={state.message}
      canInstall={state.canInstall}
      onClose={onClose}
      onInstall={() => {
        void state.handleInstall();
      }}
    />
  );
}
