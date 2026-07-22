"use client";

import MacDeviceRow from "@/features/agent-witch/macDevices/MacDeviceRow";
import { buildMacDeviceDetailText } from "@/features/agent-witch/macDevices/utils/buildMacDeviceDetailText";
import {
  canWakeMacDeviceFromBrowser,
  deviceMatchesLocalTokenHash,
} from "@/features/agent-witch/online-wake";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

interface MacDevicePickerRowsProps {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly selectedDeviceId: string;
  readonly serverInstallBundleVersion: string | null;
  readonly localHostname: string | null;
  readonly localTokenHash: string | null;
  readonly isWakeServerReachable: boolean;
  readonly onChange: (deviceId: string) => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onUpdateLocal?: () => void;
  readonly onDeleteLocalScript?: () => void;
  readonly onDelete?: (deviceId: string) => void | Promise<void>;
}

export default function MacDevicePickerRows({
  devices,
  displayNameById,
  selectedDeviceId,
  serverInstallBundleVersion,
  localHostname,
  localTokenHash,
  isWakeServerReachable,
  onChange,
  onRenamed,
  onUpdateLocal,
  onDeleteLocalScript,
  onDelete,
}: MacDevicePickerRowsProps) {
  return (
    <>
      {devices.map((device) => {
        const detail = buildMacDeviceDetailText({
          device,
          serverInstallBundleVersion,
        });
        const isThisMac =
          localTokenHash !== null &&
          deviceMatchesLocalTokenHash(device.tokenHash, localTokenHash);

        return (
          <MacDeviceRow
            key={device.id}
            deviceId={device.id}
            displayName={displayNameById.get(device.id) ?? "Your Mac"}
            isOnline={device.isOnline}
            isConnected={device.isConnected}
            detailText={detail?.text}
            detailWarning={detail?.isMismatch === true}
            isThisMac={isThisMac}
            isSelected={device.id === selectedDeviceId}
            isWakeServerReachable={canWakeMacDeviceFromBrowser({
              deviceLabel: device.deviceLabel,
              localHostname,
              isWakeServerReachable,
            })}
            onSelect={() => {
              onChange(device.id);
            }}
            onRenamed={onRenamed}
            onUpdateLocal={isThisMac ? onUpdateLocal : undefined}
            onDeleteLocalScript={isThisMac ? onDeleteLocalScript : undefined}
            onDelete={onDelete}
          />
        );
      })}
    </>
  );
}
