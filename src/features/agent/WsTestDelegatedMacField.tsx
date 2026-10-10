"use client";

import MacDevicePicker from "@/features/agent/MacDevicePicker";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import { requestEndSendTaskSession } from "@/features/agent/utils/sendTaskSessionEvents";
import { useLocalMacBrowserContext } from "@/features/home/hooks/public-api/presentation";

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
        <p className="pointer-events-auto mt-2 flex flex-wrap items-center gap-2 text-xs text-awc-fg-muted dark:text-gray-400">
          A task is running on this computer. End the session to pick another
          computer; the task keeps running.
          <button
            type="button"
            onClick={requestEndSendTaskSession}
            className="rounded-lg border border-awc-border px-2 py-0.5 font-medium text-awc-fg hover:bg-awc-bg dark:border-gray-700 dark:text-white/90"
          >
            End session
          </button>
        </p>
      ) : null}
    </div>
  );
}
