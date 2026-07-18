"use client";

import SendTaskComposerConnectMacButton from "@/features/agent/SendTaskComposerConnectMacButton";
import SendTaskComposerMacPickerRow from "@/features/agent/SendTaskComposerMacPickerRow";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import { canWakeMacDeviceFromBrowser } from "@/features/agent-witch/online-wake";

interface SendTaskComposerMacPickerStepProps {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly isLoading: boolean;
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
  readonly onSelect: (deviceId: string) => void;
}

export default function SendTaskComposerMacPickerStep({
  devices,
  displayNameById,
  isLoading,
  localHostname,
  isWakeServerReachable,
  onSelect,
}: SendTaskComposerMacPickerStepProps) {
  if (isLoading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Checking which Macs are online…
      </p>
    );
  }

  if (devices.length === 0) {
    return (
      <div>
        <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Which Mac should run this?
        </h2>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          No Macs connected yet.
        </p>
        <div className="mt-3">
          <SendTaskComposerConnectMacButton hasExistingDevices={false} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
        Which Mac should run this?
      </h2>
      <ul className="mt-3 space-y-2">
        {devices.map((device) => (
          <li key={device.id}>
            <SendTaskComposerMacPickerRow
              displayName={displayNameById.get(device.id) ?? "Your Mac"}
              isOnline={device.isOnline}
              isWakeServerReachable={canWakeMacDeviceFromBrowser({
                deviceLabel: device.deviceLabel,
                localHostname,
                isWakeServerReachable,
              })}
              onSelect={() => {
                onSelect(device.id);
              }}
            />
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <SendTaskComposerConnectMacButton hasExistingDevices />
      </div>
    </div>
  );
}
