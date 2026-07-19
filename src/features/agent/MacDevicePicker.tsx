"use client";

import Label from "@/components/form/Label";
import MacDeviceRow from "@/features/agent-witch/macDevices/MacDeviceRow";
import { buildMacDeviceDetailText } from "@/features/agent-witch/macDevices/utils/buildMacDeviceDetailText";
import { canWakeMacDeviceFromBrowser } from "@/features/agent-witch/online-wake";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";

interface MacDevicePickerProps {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly selectedDeviceId: string;
  readonly isLoading: boolean;
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
  readonly onChange: (deviceId: string) => void;
  readonly onRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onDelete?: (deviceId: string) => void | Promise<void>;
}

export default function MacDevicePicker({
  devices,
  displayNameById,
  selectedDeviceId,
  isLoading,
  localHostname,
  isWakeServerReachable,
  onChange,
  onRenamed,
  onDelete,
}: MacDevicePickerProps) {
  const { serverInstallBundleVersion } = useMyMacDevices();

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Checking which Macs are online…
      </p>
    );
  }

  if (devices.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No Macs connected yet. Connect one from Home → Your Devices.
      </p>
    );
  }

  return (
    <div>
      <Label>Which Mac should run this?</Label>
      <div className="mt-3 space-y-2">
        {devices.map((device) => {
          const detail = buildMacDeviceDetailText({
            device,
            serverInstallBundleVersion,
          });

          return (
            <MacDeviceRow
              key={device.id}
              deviceId={device.id}
              displayName={displayNameById.get(device.id) ?? "Your Mac"}
              isOnline={device.isOnline}
              isConnected={device.isConnected}
              detailText={detail?.text}
              detailWarning={detail?.isMismatch === true}
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
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
