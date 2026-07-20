"use client";

import { useSyncExternalStore } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectAnotherMacButton from "@/features/home/ConnectAnotherMacButton";
import HomeConnectedMacsDeviceList from "@/features/home/HomeConnectedMacsDeviceList";
import HomeConnectedMacsEmptyState from "@/features/home/HomeConnectedMacsEmptyState";
import useHomeConnectedMacDeviceActions from "@/features/home/hooks/useHomeConnectedMacDeviceActions";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";
import { resolveShouldShowConnectThisMac } from "@/features/home/utils/resolveShouldShowConnectThisMac";
import {
  buildMacDevicesStatusLine,
  countMacPresenceTiers,
} from "@/features/agent-witch/online-wake";

interface HomeConnectedMacsPanelProps {
  readonly appOrigin: string;
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

export default function HomeConnectedMacsPanel({
  appOrigin,
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
    refreshDevices,
  } = useHomeConnectedMacs();
  const { localHostname, isCheckingLocalHostname } =
    useLocalMacBrowserContext();
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const presenceCounts = countMacPresenceTiers(devices);
  const statusLine = buildMacDevicesStatusLine(presenceCounts);
  const hasExistingDevices = devices.length > 0;
  const shouldShowConnectThisMac = resolveShouldShowConnectThisMac({
    operatingSystem,
    localHostname,
    isCheckingLocalHostname,
    devices,
  });

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
          appOrigin={appOrigin}
          devices={devices}
          displayNameById={displayNameById}
          serverInstallBundleVersion={serverInstallBundleVersion}
          localHostname={localHostname}
          shouldShowConnectThisMac={shouldShowConnectThisMac}
          onRenamed={renameDevice}
          onLinked={() => {
            void refreshDevices();
          }}
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
    </AppPanel>
  );
}
