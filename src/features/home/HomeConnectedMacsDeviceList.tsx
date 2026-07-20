"use client";

import ConnectThisMacRow from "@/features/home/ConnectThisMacRow";
import HomeConnectedMacDeviceRow from "@/features/home/HomeConnectedMacDeviceRow";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

interface HomeConnectedMacsDeviceListProps {
  readonly appOrigin: string;
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly serverInstallBundleVersion: string | null;
  readonly localHostname: string | null;
  readonly shouldShowConnectThisMac: boolean;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onLinked: () => void;
  readonly onDelegateTask: (deviceId: string) => void;
  readonly onOpenShell: (deviceId: string) => void;
  readonly onDelete: (deviceId: string) => Promise<void>;
}

export default function HomeConnectedMacsDeviceList({
  appOrigin,
  installCommand,
  isWebSocketSupported,
  host,
  devices,
  displayNameById,
  serverInstallBundleVersion,
  localHostname,
  shouldShowConnectThisMac,
  onRenamed,
  onLinked,
  onDelegateTask,
  onOpenShell,
  onDelete,
}: HomeConnectedMacsDeviceListProps) {
  return (
    <ul className="mt-4 list-none space-y-4 p-0">
      {devices.map((device) => (
        <HomeConnectedMacDeviceRow
          key={device.id}
          device={device}
          displayName={displayNameById.get(device.id) ?? "Your Mac"}
          serverInstallBundleVersion={serverInstallBundleVersion}
          localHostname={localHostname}
          isWakeServerReachable={localHostname !== null}
          onRenamed={onRenamed}
          onDelegateTask={onDelegateTask}
          onOpenShell={onOpenShell}
          onDelete={onDelete}
        />
      ))}
      {shouldShowConnectThisMac ? (
        <ConnectThisMacRow
          appOrigin={appOrigin}
          installCommand={installCommand}
          isWebSocketSupported={isWebSocketSupported}
          host={host}
          onLinked={onLinked}
        />
      ) : null}
    </ul>
  );
}
