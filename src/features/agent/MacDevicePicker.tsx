"use client";

import Label from "@/components/form/Label";
import MacDeviceRow from "@/features/agent-witch/macDevices/MacDeviceRow";
import { canWakeMacDeviceFromBrowser } from "@/features/agent-witch/macDevices/utils/canWakeMacDeviceFromBrowser";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

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
        No paired Macs yet. Connect one from Home → Your Devices.
      </p>
    );
  }

  return (
    <div>
      <Label>Which Mac should run this?</Label>
      <div className="mt-3 space-y-2">
        {devices.map((device) => (
          <MacDeviceRow
            key={device.id}
            deviceId={device.id}
            displayName={displayNameById.get(device.id) ?? "Your Mac"}
            isOnline={device.isOnline}
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
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Macs send a heartbeat every 30 seconds while Agent Witch is running.
        Offline Macs stay listed but cannot receive tasks.
      </p>
    </div>
  );
}
