"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import MarketplaceInstallMacPicker from "@/features/marketplace/MarketplaceInstallMacPicker";
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
  const demoPreview = useDemoPreview();
  const macSelection = useMacDeviceSelection();
  const { localHostname, isWakeServerReachable } = useLocalMacBrowserContext();
  const [status, setStatus] = useState<
    "idle" | "installing" | "done" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (listing === null) {
      return;
    }

    void macSelection.refreshDevices();
  }, [listing?.capabilityId, macSelection.refreshDevices]);

  const selectedDevice = macSelection.devices.find(
    (device) => device.id === macSelection.selectedDeviceId,
  );
  const { canInstall, needsLiveConnection } =
    resolveMarketplaceInstallEligibility({
      capabilityId: listing?.capabilityId ?? null,
      selectedDevice,
      isWakeServerReachable,
      isDemoPreview: demoPreview !== null,
      status,
    });

  const handleInstall = async (): Promise<void> => {
    if (listing === null || !canInstall) {
      return;
    }

    setStatus("installing");
    setMessage(null);

    const outcome = await runMarketplaceInstall({
      capabilityId: listing.capabilityId,
      deviceId: macSelection.selectedDeviceId,
    });
    setStatus(outcome.status);
    setMessage(outcome.message);
  };

  return (
    <Modal isOpen={listing !== null} onClose={onClose} className="max-w-lg p-6">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        Install {listing?.name ?? "listing"}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Saves to your library and installs rules on the Mac you choose.
      </p>

      <MarketplaceInstallMacPicker
        macSelection={macSelection}
        localHostname={localHostname}
        isWakeServerReachable={isWakeServerReachable}
        isDemoPreview={demoPreview !== null}
      />

      {needsLiveConnection ? (
        <p className="mt-4 text-sm text-amber-700 dark:text-amber-300">
          This Mac checked in recently but does not have a live Agent Witch
          connection. Open Agent Witch on that Mac, then try Install again.
        </p>
      ) : null}

      {message ? (
        <p
          className={`mt-4 text-sm ${
            status === "error"
              ? "text-amber-700 dark:text-amber-300"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          {status === "done" ? "Close" : "Cancel"}
        </Button>
        <Button
          disabled={!canInstall}
          onClick={() => {
            void handleInstall();
          }}
        >
          {status === "installing"
            ? "Installing…"
            : status === "done"
              ? "Installed"
              : "Install"}
        </Button>
      </div>
    </Modal>
  );
}
