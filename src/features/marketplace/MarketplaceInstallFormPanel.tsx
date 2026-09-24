"use client";

import Button from "@/components/ui/button/Button";
import useMacDeviceSelection from "@/features/agent/hooks/useMacDeviceSelection";
import MarketplaceInstallMacPicker from "@/features/marketplace/MarketplaceInstallMacPicker";
import MarketplaceInstallProjectPicker from "@/features/marketplace/MarketplaceInstallProjectPicker";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface MarketplaceInstallFormPanelProps {
  readonly listingName: string;
  readonly projects: readonly UserProjectRecord[];
  readonly isProjectsLoading: boolean;
  readonly selectedProjectId: string;
  readonly onSelectProjectId: (projectId: string) => void;
  readonly macSelection: ReturnType<typeof useMacDeviceSelection>;
  readonly localHostname: string | null;
  readonly localTokenHash: string | null;
  readonly isWakeServerReachable: boolean;
  readonly needsLiveConnection: boolean;
  readonly status: "idle" | "installing" | "error";
  readonly message: string | null;
  readonly canInstall: boolean;
  readonly onClose: () => void;
  readonly onInstall: () => void;
}

export default function MarketplaceInstallFormPanel({
  listingName,
  projects,
  isProjectsLoading,
  selectedProjectId,
  onSelectProjectId,
  macSelection,
  localHostname,
  localTokenHash,
  isWakeServerReachable,
  needsLiveConnection,
  status,
  message,
  canInstall,
  onClose,
  onInstall,
}: MarketplaceInstallFormPanelProps) {
  return (
    <>
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        Install {listingName}
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Saves to your library and links this listing to the project you choose.
        Pull playbook files into the repo from Agent Witch on your Mac.
      </p>

      <MarketplaceInstallMacPicker
        macSelection={macSelection}
        localHostname={localHostname}
        localTokenHash={localTokenHash}
        isWakeServerReachable={isWakeServerReachable}
      />

      <MarketplaceInstallProjectPicker
        projects={projects}
        isProjectsLoading={isProjectsLoading}
        selectedProjectId={selectedProjectId}
        onSelectProjectId={onSelectProjectId}
        selectedDeviceId={macSelection.selectedDeviceId}
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
          Cancel
        </Button>
        <Button
          disabled={!canInstall}
          onClick={() => {
            onInstall();
          }}
        >
          {status === "installing" ? "Installing…" : "Install"}
        </Button>
      </div>
    </>
  );
}
