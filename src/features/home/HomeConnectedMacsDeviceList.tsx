"use client";

import { APP_SURFACE_CTA_PRIMARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import ConnectThisMacButton from "@/features/home/ConnectThisMacButton";
import ConnectThisMacRow from "@/features/home/ConnectThisMacRow";
import HomeConnectedMacDeviceRow from "@/features/home/HomeConnectedMacDeviceRow";
import HomeMacDeviceTooOldNote from "@/features/home/HomeMacDeviceTooOldNote";
import { resolveHomeMacDeviceRowConnectFooter } from "@/features/home/utils/resolveHomeMacDeviceRowConnectFooter";
import { resolveHomeThisMacDeviceIdentity } from "@/features/home/utils/resolveHomeThisMacDeviceIdentity";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

interface HomeConnectedMacsDeviceListProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly serverInstallBundleVersion: string | null;
  readonly localHostname: string | null;
  readonly localTokenHash: string | null;
  readonly shouldShowConnectThisMac: boolean;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onDelegateTask: (deviceId: string) => void;
  readonly onOpenShell: (deviceId: string) => void;
  readonly onDelete: (deviceId: string) => Promise<void>;
}

export default function HomeConnectedMacsDeviceList({
  installCommand,
  isWebSocketSupported,
  host,
  devices,
  displayNameById,
  serverInstallBundleVersion,
  localHostname,
  localTokenHash,
  shouldShowConnectThisMac,
  onRenamed,
  onDelegateTask,
  onOpenShell,
  onDelete,
}: HomeConnectedMacsDeviceListProps) {
  const thisMacIdentity = resolveHomeThisMacDeviceIdentity({
    localTokenHash,
    devices,
  });
  const renderFooter = (device: MyMacDevice) => {
    const footer = resolveHomeMacDeviceRowConnectFooter({
      isThisMac: device.id === thisMacIdentity.thisMacDeviceId,
      isThisMacReachable: thisMacIdentity.isReachable,
      connectVersionStatus: device.connectVersionStatus,
    });
    if (footer === "connect_this_mac") {
      return (
        <div className="mt-2 px-3">
          {device.connectVersionStatus === "too_old" ? (
            <HomeMacDeviceTooOldNote />
          ) : null}
          <div className="mt-2">
            <ConnectThisMacButton
              installCommand={installCommand}
              isWebSocketSupported={isWebSocketSupported}
              host={host}
              fullWidth
              className={`${APP_SURFACE_CTA_PRIMARY_SM_CLASS} w-full`}
            />
          </div>
        </div>
      );
    }

    return footer === "too_old_note" ? <HomeMacDeviceTooOldNote /> : undefined;
  };

  return (
    <ul className="mt-4 list-none space-y-4 p-0">
      {devices.map((device) => (
        <HomeConnectedMacDeviceRow
          key={device.id}
          device={device}
          displayName={displayNameById.get(device.id) ?? "Your computer"}
          serverInstallBundleVersion={serverInstallBundleVersion}
          localHostname={localHostname}
          isThisMac={device.id === thisMacIdentity.thisMacDeviceId}
          isWakeServerReachable={localHostname !== null}
          footer={renderFooter(device)}
          onRenamed={onRenamed}
          onDelegateTask={onDelegateTask}
          onOpenShell={onOpenShell}
          onDelete={onDelete}
        />
      ))}
      {/* Dedupe: when a device row is already This computer, it owns the Connect CTA. */}
      {shouldShowConnectThisMac && thisMacIdentity.thisMacDeviceId === null ? (
        <ConnectThisMacRow
          installCommand={installCommand}
          isWebSocketSupported={isWebSocketSupported}
          host={host}
        />
      ) : null}
    </ul>
  );
}
