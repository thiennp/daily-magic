import { useCallback, useState } from "react";

import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";
import useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import { useAutoSelectFirstProject } from "@/features/marketplace/hooks/useAutoSelectFirstProject";
import { useMarketplaceInstallListingReset } from "@/features/marketplace/hooks/useMarketplaceInstallListingReset";
import { executeMarketplaceInstall } from "@/features/marketplace/utils/executeMarketplaceInstall";
import { resolveMarketplaceInstallEligibility } from "@/features/marketplace/utils/resolveMarketplaceInstallEligibility";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface UseMarketplaceInstallModalContentParams {
  readonly listing: HarnessMarketplaceListing;
  readonly onClose: () => void;
}

export function useMarketplaceInstallModalContent({
  listing,
  onClose,
}: UseMarketplaceInstallModalContentParams) {
  const { openSendTaskModal } = useSendTaskModal();
  const macSelection = useMacDeviceSelection();
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const { projects, isLoading: isProjectsLoading } = useUserProjects(
    macSelection.selectedDeviceId,
  );
  const { localHostname, localTokenHash, isWakeServerReachable } =
    useLocalMacBrowserContext();
  const [status, setStatus] = useState<
    "idle" | "installing" | "done" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [libraryCapabilityId, setLibraryCapabilityId] = useState<string | null>(
    null,
  );

  const resetInstallState = useCallback(() => {
    setSelectedProjectId("");
    setStatus("idle");
    setMessage(null);
    setLibraryCapabilityId(null);
  }, []);

  useMarketplaceInstallListingReset(
    listing.capabilityId,
    macSelection.refreshDevices,
    resetInstallState,
  );

  useAutoSelectFirstProject(projects, selectedProjectId, setSelectedProjectId);

  const selectedDevice = macSelection.devices.find(
    (device) => device.id === macSelection.selectedDeviceId,
  );
  const { canInstall, needsLiveConnection } =
    resolveMarketplaceInstallEligibility({
      capabilityId: listing.capabilityId,
      selectedProjectId,
      selectedDevice,
      isWakeServerReachable,
      status,
    });

  const handleInstall = async (): Promise<void> => {
    if (!canInstall) {
      return;
    }

    setStatus("installing");
    const outcome = await executeMarketplaceInstall({
      capabilityId: listing.capabilityId,
      deviceId: macSelection.selectedDeviceId,
      projectId: selectedProjectId,
    });
    setStatus(outcome.status);
    setMessage(outcome.message);
    setLibraryCapabilityId(outcome.libraryCapabilityId);
  };

  const handleStartTask = (): void => {
    if (libraryCapabilityId === null) {
      return;
    }

    onClose();
    openSendTaskModal({
      libraryCapabilityId,
      prompt: listing.exampleRequest,
    });
  };

  return {
    listingName: listing.name,
    projects,
    isProjectsLoading,
    selectedProjectId,
    setSelectedProjectId,
    macSelection,
    localHostname,
    localTokenHash,
    isWakeServerReachable,
    needsLiveConnection,
    status,
    message,
    canInstall,
    libraryCapabilityId,
    handleInstall,
    handleStartTask,
  };
}
