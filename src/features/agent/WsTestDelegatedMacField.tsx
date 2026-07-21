"use client";

import MacDevicePicker from "@/features/agent/MacDevicePicker";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";

interface WsTestDelegatedMacFieldProps {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly selectedDeviceId: string;
  readonly isLoading: boolean;
  readonly disabled?: boolean;
  readonly onDeviceChange: (deviceId: string) => void;
  readonly onDeviceRenamed: (deviceId: string, deviceLabel: string) => void;
  readonly onDeviceDeleted?: (deviceId: string) => void | Promise<void>;
}

export default function WsTestDelegatedMacField({
  devices,
  displayNameById,
  selectedDeviceId,
  isLoading,
  disabled = false,
  onDeviceChange,
  onDeviceRenamed,
  onDeviceDeleted,
}: WsTestDelegatedMacFieldProps) {
  const { localHostname, localTokenHash, isWakeServerReachable } =
    useLocalMacBrowserContext();

  return (
    <div className={disabled ? "pointer-events-none opacity-70" : undefined}>
      <MacDevicePicker
        devices={devices}
        displayNameById={displayNameById}
        selectedDeviceId={selectedDeviceId}
        isLoading={isLoading}
        localHostname={localHostname}
        localTokenHash={localTokenHash}
        isWakeServerReachable={isWakeServerReachable}
        onChange={onDeviceChange}
        onRenamed={onDeviceRenamed}
        onDelete={onDeviceDeleted}
      />
      {disabled ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Finish the current Mac session to switch devices.
        </p>
      ) : null}
    </div>
  );
}
