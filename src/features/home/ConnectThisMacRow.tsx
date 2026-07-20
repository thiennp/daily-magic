"use client";

import { useSyncExternalStore } from "react";

import MacDeviceIcon from "@/features/agent-witch/macDevices/MacDeviceIcon";
import { resolveMacDeviceIconClassName } from "@/features/agent-witch/macDevices/utils/resolveMacDeviceIconClassName";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectInstallPasteModal from "@/features/home/ConnectInstallPasteModal";
import ConnectThisMacModal from "@/features/home/ConnectThisMacModal";
import useConnectThisMacRowFlow from "@/features/home/hooks/useConnectThisMacRowFlow";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

interface ConnectThisMacRowProps {
  readonly appOrigin: string;
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly onLinked: () => void;
}

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

export default function ConnectThisMacRow({
  appOrigin,
  installCommand,
  isWebSocketSupported,
  host,
  onLinked,
}: ConnectThisMacRowProps) {
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const {
    handleCloseModal,
    handleClosePasteModal,
    handleInstallEngaged,
    handleOpenModal,
    isLinking,
    isModalOpen,
    isPasteModalOpen,
    linkError,
  } = useConnectThisMacRowFlow({ appOrigin, onLinked, operatingSystem });

  return (
    <li>
      <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/80 px-3 py-3 dark:border-gray-700 dark:bg-white/[0.02]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <MacDeviceIcon
              className={resolveMacDeviceIconClassName(
                false,
                "mt-0.5 h-4 w-4 shrink-0",
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white/90">
                This computer
              </p>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Link the Mac you are using now to your account.
              </p>
              {linkError !== null ? (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                  {linkError}
                </p>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            className={`w-full shrink-0 sm:w-auto ${APP_SURFACE_CTA_SECONDARY_SM_CLASS}`}
            disabled={isLinking}
            onClick={handleOpenModal}
          >
            {isLinking ? "Connecting…" : "Connect this Mac"}
          </button>
        </div>
      </div>

      <ConnectThisMacModal
        isOpen={isModalOpen}
        operatingSystem={operatingSystem}
        installCommand={installCommand}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
        onClose={handleCloseModal}
        onInstallEngaged={handleInstallEngaged}
      />
      <ConnectInstallPasteModal
        isOpen={isPasteModalOpen}
        onClose={handleClosePasteModal}
      />
    </li>
  );
}
