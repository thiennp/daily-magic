"use client";

import { ComputerEntitlementLimitNote } from "@/features/billing/public-api/presentation";
import ComputersDownloadLink from "@/features/home/ComputersDownloadLink";
import ConnectAnotherMacButton from "@/features/home/ConnectAnotherMacButton";
import ConnectCursorCloudCard from "@/features/home/ConnectCursorCloudCard";
import HomeConnectedMacsDeviceList from "@/features/home/HomeConnectedMacsDeviceList";
import HomeConnectedMacsEmptyState from "@/features/home/HomeConnectedMacsEmptyState";
import {
  useHomeConnectedMacDeviceActions,
  useHomeConnectedMacs,
  useLocalMacBrowserContext,
  useShouldShowConnectThisMac,
} from "@/features/home/hooks/public-api/presentation";
import { AppShellComputersHeading } from "@/features/shell/v5/public-api/presentation";
import { AppShellDevicesSurface } from "@/features/shell/v5/public-api/presentation";
import {
  APP_SHELL_V5_META_CLASS,
  APP_SHELL_V5_SECTION_CLASS,
  APP_SHELL_V5_PILL_BUTTON_CLASS,
} from "@/features/shell/v5/public-api/types";
import {
  buildMacDevicesStatusLine,
  countMacPresenceTiers,
} from "@/features/agent-witch/online-wake/public-api/presentation";

interface HomeConnectedMacsPanelProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly embedded?: boolean;
}

/** Shell Computers + Cursor Cloud (V5-2). Live actions unchanged. */
export default function HomeConnectedMacsPanel({
  installCommand,
  isWebSocketSupported,
  host,
  embedded = false,
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
  const presence = countMacPresenceTiers(devices);
  const statusLine = buildMacDevicesStatusLine(presence);
  const hasExistingDevices = devices.length > 0;
  const connectProps = { installCommand, isWebSocketSupported, host };

  return (
    <AppShellDevicesSurface embedded={embedded}>
      <AppShellComputersHeading
        statusLine={statusLine}
        serverInstallBundleVersion={serverInstallBundleVersion}
      />
      {isLoading ? (
        <p className={`mt-4 ${APP_SHELL_V5_META_CLASS}`}>
          Checking connected computers…
        </p>
      ) : devices.length === 0 ? (
        <HomeConnectedMacsEmptyState {...connectProps} />
      ) : (
        <HomeConnectedMacsDeviceList
          {...connectProps}
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
      {!isLoading ? (
        <div
          className={`mt-4 flex flex-wrap items-center gap-3 ${APP_SHELL_V5_SECTION_CLASS}`}
        >
          {hasExistingDevices ? (
            <ConnectAnotherMacButton
              {...connectProps}
              hasExistingDevices={hasExistingDevices}
              className={APP_SHELL_V5_PILL_BUTTON_CLASS}
            />
          ) : null}
          <ComputersDownloadLink className={APP_SHELL_V5_PILL_BUTTON_CLASS} />
        </div>
      ) : null}
      {!isLoading ? (
        <ComputerEntitlementLimitNote
          devices={devices}
          connectedCount={presence.live + presence.liveOtherInstance}
        />
      ) : null}
      <div className={`mt-4 ${APP_SHELL_V5_SECTION_CLASS}`}>
        <ConnectCursorCloudCard />
      </div>
    </AppShellDevicesSurface>
  );
}
