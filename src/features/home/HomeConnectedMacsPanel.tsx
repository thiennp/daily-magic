"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacButton from "@/features/home/ConnectAnotherMacButton";
import ConnectCursorCloudCard from "@/features/home/ConnectCursorCloudCard";
import HomeConnectedMacsDeviceList from "@/features/home/HomeConnectedMacsDeviceList";
import HomeConnectedMacsEmptyState from "@/features/home/HomeConnectedMacsEmptyState";
import useHomeConnectedMacDeviceActions from "@/features/home/hooks/useHomeConnectedMacDeviceActions";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import useShouldShowConnectThisMac from "@/features/home/hooks/useShouldShowConnectThisMac";
import {
  buildMacDevicesStatusLine,
  countMacPresenceTiers,
} from "@/features/agent-witch/online-wake";

interface HomeConnectedMacsPanelProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

export default function HomeConnectedMacsPanel({
  installCommand,
  isWebSocketSupported,
  host,
}: HomeConnectedMacsPanelProps) {
  const { onDelegateTask, onOpenShell, onDelete } =
    useHomeConnectedMacDeviceActions();
  const {
    devices,
    displayNameById,
    isLoading,
    serverInstallBundleVersion,
    renameDevice,
  } = useHomeConnectedMacs();
  const { localHostname, localTokenHash } = useLocalMacBrowserContext();
  const shouldShowConnectThisMac = useShouldShowConnectThisMac();
  const presenceCounts = countMacPresenceTiers(devices);
  const statusLine = buildMacDevicesStatusLine(presenceCounts);
  const hasExistingDevices = devices.length > 0;

  return (
    <AppPanel padding="compact">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white/90">
        Your Devices
      </h2>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        {statusLine}
        {serverInstallBundleVersion !== null
          ? ` · Cloud bundle ${serverInstallBundleVersion}`
          : ""}
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Checking connected Macs…
        </p>
      ) : devices.length === 0 ? (
        <HomeConnectedMacsEmptyState
          installCommand={installCommand}
          isWebSocketSupported={isWebSocketSupported}
          host={host}
        />
      ) : (
        <HomeConnectedMacsDeviceList
          installCommand={installCommand}
          isWebSocketSupported={isWebSocketSupported}
          host={host}
          devices={devices}
          displayNameById={displayNameById}
          serverInstallBundleVersion={serverInstallBundleVersion}
          localHostname={localHostname}
          localTokenHash={localTokenHash}
          shouldShowConnectThisMac={shouldShowConnectThisMac}
          onRenamed={renameDevice}
          onDelegateTask={onDelegateTask}
          onOpenShell={onOpenShell}
          onDelete={onDelete}
        />
      )}

      {!isLoading && hasExistingDevices ? (
        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          <ConnectAnotherMacButton
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
            hasExistingDevices={hasExistingDevices}
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
          />
        </div>
      ) : null}

      <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
        <ConnectCursorCloudCard />
      </div>
    </AppPanel>
  );
}
