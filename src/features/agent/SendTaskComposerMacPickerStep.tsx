"use client";

import SendTaskComposerConnectMacButton from "@/features/agent/SendTaskComposerConnectMacButton";
import SendTaskComposerCursorCloudPickerRow from "@/features/agent/SendTaskComposerCursorCloudPickerRow";
import SendTaskComposerMacPickerRow from "@/features/agent/SendTaskComposerMacPickerRow";
import { CURSOR_CLOUD_EXECUTOR_DEVICE_ID } from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import { canWakeMacDeviceFromBrowser } from "@/features/agent-witch/online-wake";

interface SendTaskComposerMacPickerStepProps {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly isLoading: boolean;
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
  readonly hasCursorCloudConnection: boolean;
  readonly onSelect: (deviceId: string) => void;
}

export default function SendTaskComposerMacPickerStep({
  devices,
  displayNameById,
  isLoading,
  localHostname,
  isWakeServerReachable,
  hasCursorCloudConnection,
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
          Where should this run?
        </h2>
        {hasCursorCloudConnection ? (
          <ul className="mt-3 space-y-2">
            <li>
              <SendTaskComposerCursorCloudPickerRow
                onSelect={() => {
                  onSelect(CURSOR_CLOUD_EXECUTOR_DEVICE_ID);
                }}
              />
            </li>
          </ul>
        ) : (
          <>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              No Macs connected yet.
            </p>
            <div className="mt-3">
              <SendTaskComposerConnectMacButton hasExistingDevices={false} />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
        Where should this run?
      </h2>
      <ul className="mt-3 space-y-2">
        {hasCursorCloudConnection ? (
          <li>
            <SendTaskComposerCursorCloudPickerRow
              onSelect={() => {
                onSelect(CURSOR_CLOUD_EXECUTOR_DEVICE_ID);
              }}
            />
          </li>
        ) : null}
        {devices.map((device) => (
          <li key={device.id}>
            <SendTaskComposerMacPickerRow
              deviceId={device.id}
              displayName={displayNameById.get(device.id) ?? "Your Mac"}
              isOnline={device.isOnline}
              isConnected={device.isConnected}
              canRequestRestart={canWakeMacDeviceFromBrowser({
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
