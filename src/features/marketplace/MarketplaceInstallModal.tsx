"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";
import useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import MarketplaceInstallFormPanel from "@/features/marketplace/MarketplaceInstallFormPanel";
import MarketplaceInstallSuccessPanel from "@/features/marketplace/MarketplaceInstallSuccessPanel";
import { resolveMarketplaceInstallEligibility } from "@/features/marketplace/utils/resolveMarketplaceInstallEligibility";
import { runMarketplaceInstall } from "@/features/marketplace/utils/runMarketplaceInstall";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceInstallModalProps {
  readonly listing: HarnessMarketplaceListing | null;
  readonly onClose: () => void;
}

export default function MarketplaceInstallModal({
  listing,
  onClose,
}: MarketplaceInstallModalProps) {
  const { openSendTaskModal } = useSendTaskModal();
  const macSelection = useMacDeviceSelection();
  const { localHostname, localTokenHash, isWakeServerReachable } =
    useLocalMacBrowserContext();
  const [status, setStatus] = useState<
    "idle" | "installing" | "done" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [libraryCapabilityId, setLibraryCapabilityId] = useState<string | null>(
    null,
  );

  const { refreshDevices } = macSelection;

  useEffect(() => {
    if (listing === null) {
      return;
    }

    void refreshDevices();
  }, [listing, refreshDevices]);

  const selectedDevice = macSelection.devices.find(
    (device) => device.id === macSelection.selectedDeviceId,
  );
  const { canInstall, needsLiveConnection } =
    resolveMarketplaceInstallEligibility({
      capabilityId: listing?.capabilityId ?? null,
      selectedDevice,
      isWakeServerReachable,
      status,
    });

  const handleInstall = async (): Promise<void> => {
    if (listing === null || !canInstall) {
      return;
    }

    setStatus("installing");
    setMessage(null);
    setLibraryCapabilityId(null);

    const outcome = await runMarketplaceInstall({
      capabilityId: listing.capabilityId,
      deviceId: macSelection.selectedDeviceId,
    });
    setStatus(outcome.status);
    setMessage(outcome.message);
    setLibraryCapabilityId(outcome.libraryCapabilityId);
  };

  const handleStartTask = (): void => {
    if (listing === null || libraryCapabilityId === null) {
      return;
    }

    onClose();
    openSendTaskModal({
      libraryCapabilityId,
      prompt: listing.exampleRequest,
    });
  };

  return (
    <Modal isOpen={listing !== null} onClose={onClose} className="max-w-lg p-6">
      {status === "done" && listing !== null ? (
        <MarketplaceInstallSuccessPanel
          listingName={listing.name}
          message={message ?? "Saved to your library."}
          canStartTask={libraryCapabilityId !== null}
          onStartTask={handleStartTask}
          onClose={onClose}
        />
      ) : (
        <MarketplaceInstallFormPanel
          listingName={listing?.name ?? "listing"}
          macSelection={macSelection}
          localHostname={localHostname}
          localTokenHash={localTokenHash}
          isWakeServerReachable={isWakeServerReachable}
          needsLiveConnection={needsLiveConnection}
          status={status === "done" ? "idle" : status}
          message={message}
          canInstall={canInstall}
          onClose={onClose}
          onInstall={() => {
            void handleInstall();
          }}
        />
      )}
    </Modal>
  );
}
