"use client";

import { MacDeviceOfflineWakeHint } from "@/features/agent-witch/online-wake";
import MacDeviceIcon from "@/features/agent-witch/macDevices/MacDeviceIcon";
import { resolveMacDeviceIconClassName } from "@/features/agent-witch/macDevices/utils/resolveMacDeviceIconClassName";

interface SendTaskComposerMacPickerRowProps {
  readonly displayName: string;
  readonly isOnline: boolean;
  readonly isWakeServerReachable: boolean;
  readonly onSelect: () => void;
}

export default function SendTaskComposerMacPickerRow({
  displayName,
  isOnline,
  isWakeServerReachable,
  onSelect,
}: SendTaskComposerMacPickerRowProps) {
  const row = (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left transition hover:border-brand-200 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-brand-900/40 dark:hover:bg-brand-950/20"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-theme-xs dark:border-gray-700 dark:bg-gray-800">
        <MacDeviceIcon
          className={resolveMacDeviceIconClassName(
            isOnline,
            "h-5 w-5 shrink-0",
          )}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-gray-800 dark:text-white/90">
          {displayName}
        </span>
        <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
          {isOnline ? "Online" : "Offline"}
        </span>
      </span>
    </button>
  );

  if (isOnline) {
    return row;
  }

  return (
    <MacDeviceOfflineWakeHint
      displayName={displayName}
      isWakeServerReachable={isWakeServerReachable}
    >
      {row}
    </MacDeviceOfflineWakeHint>
  );
}
