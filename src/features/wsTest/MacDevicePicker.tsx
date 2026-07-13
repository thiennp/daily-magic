"use client";

import Label from "@/components/form/Label";
import type { MyMacDevice } from "@/features/wsTest/hooks/useMyMacDevices";

interface MacDevicePickerProps {
  readonly devices: readonly MyMacDevice[];
  readonly selectedDeviceId: string;
  readonly isLoading: boolean;
  readonly onChange: (deviceId: string) => void;
}

const inputClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900";

const formatDeviceOptionLabel = (device: MyMacDevice): string => {
  const label = device.deviceLabel ?? "Mac";
  return device.isOnline ? `${label} · online` : `${label} · offline`;
};

export default function MacDevicePicker({
  devices,
  selectedDeviceId,
  isLoading,
  onChange,
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
        No paired Macs yet. Connect one from Home → Your setup.
      </p>
    );
  }

  return (
    <div>
      <Label htmlFor="mac-device-picker">Which Mac should run this?</Label>
      <select
        id="mac-device-picker"
        value={selectedDeviceId}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className={inputClass}
      >
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {formatDeviceOptionLabel(device)}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Macs send a heartbeat every 30 seconds while Agent Witch is running.
        Offline Macs stay listed but cannot receive tasks.
      </p>
    </div>
  );
}
